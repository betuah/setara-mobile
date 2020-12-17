import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import config from './baseUrl';

const header  = {
    headers: {'Content-Type': 'application/json'},
    timeout: 5000
}

const AxiosAPI = Axios.create();

AxiosAPI.interceptors.request.use(
    async config => {
        const resData = await AsyncStorage.getItem('userData')
        const data = JSON.parse(resData)

        config.headers = { 
            'Authorization': `Bearer ${data.token}`,
            'Accept': 'application/json',
        }
        config.timeout = 5000
        return config;
    },
    error => {
        Promise.reject(error)
    }
);

AxiosAPI.interceptors.response.use((response) => {
    return response
}, async (error) => {
    const originalRequest = error.config;
    
    if (error.response.data.code === "ERR_TOKEN_EXPIRED" && !originalRequest._retry) {
        originalRequest._retry = true;

        const accToken = await refreshToken()

        Axios.defaults.headers.common['Authorization'] = 'Bearer ' + accToken;
        return AxiosAPI(originalRequest);
    }
    return Promise.reject(error);
});

const refreshToken = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const userReq = await AsyncStorage.getItem('userData')
            const userData = JSON.parse(userReq)

            const tokenData = await Axios.post(`${config.base_url}/api/v1/token`, { refreshToken: userData.refToken}, header)

            const localStorage = await AsyncStorage.getItem('userData')
            const tmpData = JSON.parse(localStorage)

            const data = {
                ...tmpData,
                token: tokenData.data.accessToken, 
                refToken: tokenData.data.refreshToken
            }

            await updateData(data)

            resolve(tokenData.data.accessToken)
        } catch (err) {
            reject(err)
        }
    })
}

const updateData = async (objValue) => {
    try {
        await AsyncStorage.mergeItem('userData', JSON.stringify(objValue))
    } catch (error) {
        console.log(error)
        throw (error)
    }
}

export default AxiosAPI