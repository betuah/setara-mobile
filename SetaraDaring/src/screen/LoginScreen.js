import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Input, Btn, Texts } from '../components/common/UtilsComponent';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { validate } from 'validate.js';
import { signinConstrains } from '../constants/constrains'
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    ScrollView
} from 'react-native';

// Actions
import * as authActions from '../store/actions/authAction';

const LoginScreen = ({ navigation }) => {
    const date = new Date()

    const authData = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const loading = authData.isLoading

    const [loginData, setLoginForm] = useState({
        uname: '',
        password: '',
        error: {
            uname: '',
            password: ''
        }
    })

    const [error, setError] = useState(null)

    useEffect(() => {
        setLoginForm({
            uname: '',
            password: '',
            error: {}
        })

        if (authData.token) alert('loged in')

        if (authData.error) {
            Toast.show({
                type: 'error',
                text1: 'Gagal Masuk!',
                text2: authData.error
            });

            dispatch(authActions.error(false))
        }

        console.log(authData, 'login screen')
    }, [authData, error]);

    const onInputChange = (value, input) => {
        setLoginForm({
            ...loginData,
            [input]: value,
            error: {}
        })
    }

    const submitHandler = async () => {
        const valRes = validate(loginData, signinConstrains)

        if (!valRes) {
            setLoginForm({
                ...loginData,
                error: {...valRes}
            })

            dispatch(authActions.signIn(loginData))
        } else {
            setLoginForm({
                ...loginData,
                error: {...valRes}
            })
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <SafeAreaView style={styles.screen}>
                <View style={styles.body}>
                    <ScrollView style={{height: '50%', maxHeight: '100%'}}>
                        <View style={styles.LogoBrand}>
                            <LogoBrand />
                        </View>

                        <View style={{alignItems: 'center'}}>
                            <LottieView 
                                source={require('../assets/lottie/33172-01-finishig-studies.json')} 
                                autoPlay 
                                // loop 
                                style={{width: '50%'}}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={{ width: '80%' }}>
                                <Input
                                    label="Username"
                                    placeholder="Username"
                                    value={loginData.uname}
                                    IconName='account-circle'                                    
                                    onChangeText={e => onInputChange(e, 'uname')}
                                    errorVisible={loginData.error.uname ? true : false}
                                    errorMassage={loginData.error.uname}
                                />
                            </View>
                            <View style={{ width: '80%' }}>
                                <Input
                                    label="Password"
                                    name={'password'}
                                    placeholder="Password"
                                    value={loginData.password}
                                    secureTextEntry={true}
                                    IconName='lock'
                                    errorVisible={loginData.error.password ? true : false}
                                    errorMassage={loginData.error.password}
                                    onChangeText={e => onInputChange(e, 'password')}
                                />
                            </View>
                        </View>

                        <View style={styles.button}>
                            <Btn 
                                Icon={{name:"send", size: 15, color: colors.primary}}
                                title="Masuk" 
                                onPress={submitHandler}
                                style={{ width: '80%' }}
                                disabled={loading}
                                loading={{
                                    size: '15',
                                    color: colors.primary
                                }}
                                isLoading={loading}
                            />
                        </View>
                        <View style={styles.signup}>
                            <View>
                                <Texts 
                                    text="Belum punya akun ? "
                                />                                
                            </View>
                            <View>
                                <Texts 
                                    onPress={() => navigation.navigate('SignUp')}
                                    text=" Daftar"
                                    style={{fontWeight: 'bold', color: colors.white, fontSize: 18}}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.footer}>
                    <Texts text={`Setara Daring All Right Reserved @ ${date.getFullYear()} `}></Texts>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary
    },
    LogoBrand: {
        paddingTop: Dimensions.get('window').height > 600 ? 40 : 20,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        alignItems: "center"
    },
    signup: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    form: {
        alignItems: 'center',
    },
    body: {
        flex: 13
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        position: 'relative'
    }
});

export default LoginScreen;