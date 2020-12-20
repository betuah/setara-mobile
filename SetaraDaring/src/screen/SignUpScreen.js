import React, { useEffect, useState } from 'react';
import { TabView, TabBar  } from 'react-native-tab-view';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../components/common/UtilsComponent';
import { validate } from 'validate.js';
import { signupWbConstrains } from '../constants/constrains';
import { signupTutorConstrains } from '../constants/constrains';
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

// Auth Actions
import * as authActions from '../store/actions/authAction';

import Toast from 'react-native-toast-message';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';

import WargaBelajarForm from '../components/auth/WargaBelajarForm';
import TutorForm from '../components/auth/TutorForm';

const date = new Date();
const initialLayout = { width: Dimensions.get('window').width };

const SignUpScreen = ({ navigation }) => {
    const authData = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState(false)

    const [wbData, setWbData] = useState({
        kode_kelas: '',
        name: '',
        uname: '',
        password: '',
        confirmPass: '',
        status: 'siswa',
        error: {}
    })

    const [tutorData, setTutorData] = useState({
        email: '',
        name: '',
        uname: '',
        password: '',
        confirmPass: '',
        status: 'guru',
        error: {}
    })

    const wbInputChange = (value, input) => {
        setWbData({
            ...wbData,
            [input]: value,
        })
    }

    const tutorInputChange = (value, input) => {
        setTutorData({
            ...tutorData,
            [input]: value,
        })
    }

    useEffect(() => {
        setWbData({
            kode_kelas: '',
            name: '',
            uname: '',
            password: '',
            confirmPass: '',
            status: 'siswa',
            error: {}
        })

        setTutorData({
            email: '',
            name: '',
            uname: '',
            password: '',
            confirmPass: '',
            status: 'guru',
            error: {}
        })

        if (authData.token) alert('Berhasil daftar')

    }, [])

    const signUpWb = async () => {
        const err = validate(wbData, signupWbConstrains)

        setWbData({...wbData, error: {...err}})

        if (!err && (wbData.password === wbData.confirmPass )) {
            try {
                setLoading(true)
                await dispatch(authActions.signUp(wbData))
            } catch (error) {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Gagal Mendaftar!',
                    text2: error
                });
            }
        } else {
            if (wbData.password || wbData.confirmPass)
                setWbData({
                    ...wbData,
                    error: {
                        ...wbData.error,
                        confirmPass: ['Konfirmasi password tidak sesuai.']
                    },
                })
        }
    }

    const signUpTutor = async () => {
        const err = validate(tutorData, signupTutorConstrains)
        setTutorData({...tutorData, error: {...err}})

        if (!err && (tutorData.password === tutorData.confirmPass )) {
            try {
                setLoading(true)
                await dispatch(authActions.signUp(tutorData))
            } catch (error) {
                setLoading(false)
                Toast.show({
                    type: 'error',
                    text1: 'Gagal Mendaftar!',
                    text2: error
                });
            }
        } else {
            if (wbData.password || wbData.confirmPass)
                setTutorData({
                    ...tutorData,
                    error: {
                        ...tutorData.error,
                        confirmPass: ['Konfirmasi password tidak sesuai.']
                    }
                })
        }
    }

    // Tab View Setup
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: '1', title: 'Warga Belajar' },
        { key: '2', title: 'Tutor' },
    ]);

    const renderScene = ({ route }) => {
        switch (route.key) {
            case '1':
                return <WargaBelajarForm 
                    data={wbData}
                    onInputChange={wbInputChange}
                    signUp={signUpWb}
                    err={wbData.error}
                    btnDisable={loading}
                    btnLoading={loading}
                />;
            case '2':
                return <TutorForm 
                    data={tutorData}
                    onInputChange={tutorInputChange}
                    signUp={signUpTutor}
                    err={tutorData.error}
                    btnDisable={loading}
                    btnLoading={loading}
                />;
            default:
                return null;
        }
    };

    const renderTabBar = props => (
        <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: colors.white }}
            style={{ backgroundColor: colors.primary }}
        />
    );

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={{flex: 1,}}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={{
                    backgroundColor: colors.primary,
                    flex: 1,
                }}
            >
            <SafeAreaView style={styles.screen}>
                <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
                <ScrollView 
                    contentContainerStyle={styles.body}
                >
                    <View style={styles.LogoBrand}>
                        <LogoBrand />
                    </View>

                    <View style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <TabView
                            navigationState={{ index, routes }}
                            renderTabBar={renderTabBar}
                            renderScene={renderScene}
                            onIndexChange={setIndex}
                            initialLayout={initialLayout}
                            style={{width: '80%'}}
                        />
                    </View>
                    
                    <View style={styles.signup}>
                        <View>
                            <Text color={colors.white} size={12}>Sudah punya akun ? </Text>                                
                        </View>
                        <View>
                            <Text
                                onPress={() => navigation.navigate('Login')}
                                weight='bold'
                                color={colors.white}
                                size={14}
                            >Masuk</Text>
                        </View>
                    </View>
                </ScrollView>                
            </SafeAreaView>
            </KeyboardAvoidingView>
            <View style={{...styles.footer, paddingBottom: Platform.OS === 'ios' ? insets.bottom : insets.bottom + 10}}>
                <Text color={colors.white} size={10}>{`Setara Daring All Right Reserved @ ${date.getFullYear()} `}</Text>
            </View>
            </View>
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
        paddingTop: Dimensions.get('window').height > 600 ? 60 : 40,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    signup: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: 10
    },
    body: {
        flexGrow: 1
    },
    footer: {
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue
    }
});

export default SignUpScreen;