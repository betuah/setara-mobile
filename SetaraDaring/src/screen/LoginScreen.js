import React, { useEffect, useState } from 'react';
import { Input, Btn, Texts } from '../components/common/UtilsComponent';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    ScrollView,
    StatusBar,
} from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { BottomNavigation } from 'react-native-paper';

const LoginScreen = ({ navigation }) => {
    const date = new Date();
    const [loginData, setLoginForm] = useState({
        uname: '',
        password: ''
    })

    useEffect(() => console.log('Hellow! its Me'), []);

    const onInputChange = (value, input) => {
        console.log(value, input)
        setLoginForm({
            ...loginData,
            [input]: value
        })
    }

    const signIn = () => {
        const uname = loginData.uname.trim()
        const password = loginData.password.trim()

        if ( !uname || !password ) return alert('Username atau password kosong!')

        setLoginForm({
            uname: '',
            password: ''
        })

        alert(`${loginData.uname} dan ${loginData.password}`)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <SafeAreaView style={styles.screen}>
                {/* <StatusBar barStyle='light-content' backgroundColor={colors.darkBlue} animated /> */}
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
                            <Input
                                label="Username"
                                placeholder="Username"
                                value={loginData.uname}
                                IconName='account-circle'
                                style={{ width: '80%' }}
                                onChangeText={e => onInputChange(e, 'uname')}
                            />
                            <Input
                                label="Password"
                                name={'password'}
                                placeholder="Password"
                                value={loginData.password}
                                secureTextEntry={true}
                                IconName='lock'
                                style={{
                                    width: '80%'
                                }}
                                onChangeText={e => onInputChange(e, 'password')}
                            />
                        </View>
                        
                        <View style={styles.button}>
                            <Btn 
                                Icon={{name:"send", size: 15, color: "#2A9FC4"}}
                                title="Masuk" 
                                onPress={signIn}
                                style={{ width: '80%' }}
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
        paddingVertical: 10
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