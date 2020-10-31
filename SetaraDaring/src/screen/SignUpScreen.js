import React, { useState } from 'react';
import { TabView, SceneMap, TabBar  } from 'react-native-tab-view';
import { Texts } from '../components/common/UtilsComponent';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';
import { validate } from 'validate.js';
import { signupWbConstrains } from '../constants/constrains';
import { signupTutorConstrains } from '../constants/constrains';
import { 
    View, 
    StyleSheet, 
    SafeAreaView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    ScrollView,
} from 'react-native';

import WargaBelajarForm from '../components/auth/WargaBelajarForm';
import TutorForm from '../components/auth/TutorForm';

const date = new Date();
const initialLayout = { width: Dimensions.get('window').width };

const SignUpScreen = ({ navigation }) => {
    const [wbData, setWbData] = useState({
        kode_kelas: '',
        name: '',
        uname: '',
        password: '',
        confirmPass: ''
    })

    const [tutorData, setTutorData] = useState({
        email: '',
        name: '',
        uname: '',
        password: '',
        confirmPass: ''
    })

    const [errWb, setErrWb] = useState({})
    const [errTutor, setErrTutor] = useState({})

    const wbInputChange = (value, input) => {
        setErrWb({})
        setWbData({
            ...wbData,
            [input]: value
        })
    }

    const tutorInputChange = (value, input) => {
        setErrTutor({})
        setTutorData({
            ...tutorData,
            [input]: value
        })
    }

    const signUpWb = () => {
        const err = validate(wbData, signupWbConstrains)
        setErrWb({...err})

        // console.log(err, '---------' + JSON.stringify(errWb))

        if (!err && (wbData.password === wbData.confirmPass )) {
            setWbData({
                kode_kelas: '',
                name: '',
                uname: '',
                password: '',
                confirmPass: ''
            })
            alert('wb')
        } else {
            if (wbData.password || wbData.confirmPass)
                setErrWb({
                    ...errWb,
                    confirmPass: ['Konfirmasi password tidak sesuai.']
                })
        }
    }

    const signUpTutor = () => {
        const err = validate(tutorData, signupTutorConstrains)
        setErrTutor({...err})
        if (!err && (tutorData.password === tutorData.confirmPass )) {
            setTutorData({
                email: '',
                name: '',
                uname: '',
                password: '',
                confirmPass: ''
            })
            alert('tutor')
        } else {
            setErrWb({
                confirmPass: ['Konfirmasi password tidak sesuai.']
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
                    err={errWb}
                />;
            case '2':
                return <TutorForm 
                    data={tutorData}
                    onInputChange={tutorInputChange}
                    signUp={signUpTutor}
                    err={errTutor}
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
            <SafeAreaView style={styles.screen}>
                <View style={styles.body}>
                    <ScrollView style={{height: '50%', maxHeight: '100%'}}>
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
                                <Texts 
                                    text="Sudah punya akun ? "
                                />                                
                            </View>
                            <View>
                                <Texts 
                                    onPress={() => navigation.goBack()}
                                    text=" Masuk"
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
    signup: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingVertical: Dimensions.get('window').height > 600 ? 10 : 10
    },
    body: {
        flex: 13
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue
    }
});

export default SignUpScreen;