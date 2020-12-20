import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, Input, Btn } from '../components/common/UtilsComponent';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';
import { validate } from 'validate.js';
import { signinConstrains } from '../constants/constrains'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { 
    View, 
    StatusBar,
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    ScrollView,
    KeyboardAvoidingView
} from 'react-native';

// Actions
import * as authActions from '../store/actions/authAction';

const LoginScreen = ({ navigation }) => {
    const date = new Date()
    const authData = useSelector(state => state.auth)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets();

    const [loginData, setLoginForm] = useState({
        uname: '',
        password: '',
        error: {
            uname: '',
            password: ''
        }
    })

    useEffect(() => {
        setLoginForm({
            uname: '',
            password: '',
            error: {}
        })
    }, []);

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

            try {
                setLoading(true)

                await dispatch(authActions.signIn(loginData))
            } catch (error) {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Gagal Masuk!',
                    text2: error
                });
            }
        } else {
            setLoginForm({
                ...loginData,
                error: {...valRes}
            })
        }
    }

    return (
        <>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <View style={{flex: 1,}}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{
                    backgroundColor: colors.primary,
                    flex: 1,
                }}
            >
                <SafeAreaView style={{...styles.screen, backgroundColor: colors.primary}}>
                    <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
                    
                    <ScrollView 
                        contentContainerStyle={{
                            flexGrow: 1,
                        }}
                    >
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
                                    IconType='material'
                                    errorVisible={loginData.error.password ? true : false}
                                    errorMassage={loginData.error.password}
                                    onChangeText={e => onInputChange(e, 'password')}
                                />
                            </View>
                        </View>

                        <View style={styles.button}>
                            <Btn 
                                Icon={{name:"send", size: 12, color: colors.primary}}
                                IconType='ionic'
                                title="Masuk" 
                                fontSize={12}
                                onPress={submitHandler}
                                style={{ width: '80%' }}
                                disabled={loading}
                                loading={{
                                    size: '12',
                                    color: colors.primary
                                }}
                                isLoading={loading}
                            />
                        </View>
                        <View style={styles.signup}>
                            <View>
                                <Text color={colors.white} size={12}>Belum punya akun ? </Text>                                
                            </View>
                            <View>
                                <Text 
                                    onPress={() => navigation.navigate('SignUp')}
                                    size={14}
                                    weight='bold'
                                    color={colors.white}
                                >Daftar</Text>
                            </View>
                        </View>
                    </ScrollView>                    
                </SafeAreaView>                
            </KeyboardAvoidingView>
            <View style={{...styles.footer, paddingBottom: insets.bottom}}>
                <Text color={colors.white} size={10}>{`Setara Daring All Right Reserved @ ${date.getFullYear()} `}</Text>
            </View>
            </View>
        </TouchableWithoutFeedback>
        </>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
    },
    LogoBrand: {
        paddingTop: Dimensions.get('window').height > 600 ? 40 : 40,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    button: {
        flexDirection: 'column',
        paddingVertical: 20,
        alignItems: "center"
    },
    signup: {
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
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue
    }
});

export default LoginScreen;