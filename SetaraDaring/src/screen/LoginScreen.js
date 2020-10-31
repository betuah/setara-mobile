import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Btn, Texts } from '../components/common/UtilsComponent';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import { validate } from 'validate.js';
import { signinConstrains } from '../constants/constrains'

import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    ScrollView
} from 'react-native';

const LoginScreen = ({ navigation }) => {
    const date = new Date()

    const login = useSelector(state => state.signIn)

    const [loading, setLoading] = useState(false)

    const [loginData, setLoginForm] = useState({
        uname: '',
        password: ''
    })

    const [errData, setErr] = useState({
        uname: '',
        password: ''
    })

    useEffect(() => {
        setLoginForm({
            uname: '',
            password: ''
        })
        setErr({})

        console.log(login.isSignIn)
    }, []);

    const onInputChange = (value, input) => {
        setLoginForm({
            ...loginData,
            [input]: value
        })

        setErr({})
    }

    const signIn = () => {
        setLoading(true)

        setTimeout(() => {
            const valRes = validate(loginData, signinConstrains)

            setErr({...valRes})

            if (!valRes)
                alert(`${loginData.uname} dan ${loginData.password}`)
                setLoading(false)
        }, 3000);
        
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
                                    errorVisible={errData.uname ? true : false}
                                    errorMassage={errData.uname}
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
                                    errorVisible={errData.password ? true : false}
                                    errorMassage={errData.password}
                                    onChangeText={e => onInputChange(e, 'password')}
                                />
                            </View>
                        </View>

                        <View style={styles.button}>
                            <Btn 
                                Icon={{name:"send", size: 15, color: colors.primary}}
                                title="Masuk" 
                                onPress={signIn}
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