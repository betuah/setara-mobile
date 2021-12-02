import React, { useCallback, useEffect, useState, useRef, Fragment } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView, RefreshControl, Linking, StatusBar, Dimensions, FlatList, Platform, BackHandler, TouchableOpacity } from 'react-native';
import { TouchableRipple, useTheme, ProgressBar, FAB, RadioButton, Dialog, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { Text, Btn } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import env from '../../../config/baseUrl';
import moment from 'moment/min/moment-with-locales';
import Orientation from 'react-native-orientation-locker';
moment.locale('id')

import LoadingModal from '../../../components/modal_component/Loading_Modal';
import LoadingComponent from '../../../components/common/LoadingComponent';

import * as authAct from '../../../store/actions/authAction';
import * as quizAct from '../../../store/actions/evaluationAction';
import colors from '../../../constants/colors';

const deviceWidth = Dimensions.get('window');

const colorStyle = {
    bg0: '#FFFFFF',
    bg1: '#FEDFAF',
    bg2: '#FFCCD4',
    bg3: '#42B5A4',
    text1: '#D6AA88',
    text2: '#9A6B49',
    text3: '#C78391',
    text4: '#5A021A',
    text5: '#FFFFFF',
    text6: '#7E57C2'
}

const QuizResultScreen = ({route, navigation}) => {
    const { fonts, colors } = useTheme()
    const dispatch = useDispatch()
    const soalData = useSelector(state => state.evaluation)

    const [ backClickCount, setBackClick ] = useState(0)
    const [ refresh, setRefresh ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const onRefresh = () => {
        loadDetailData()
    }

    const loadDetailData = async () => {
        try {
            setLoading(true)
            await dispatch(quizAct.getDetailQuiz(route.params.id))
            setLoading(false)
            setError(false)
        } catch (error) {
            if (error === 'ERR_GENERATE_TOKEN') {
                dispatch(authAct.signOut(true))
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Sesi kamu telah Habis!',
                    text2: 'Silahkan masuk kembali.'
                });
            }
            Toast.show({
                type: 'error',
                text1: 'Maaf, Terjadi Kesalah!',
                text2: `${error}`
            });
            setLoading(false)
            setError(false)
        }
    }

    const finish = () => {
        navigation.push('Evaluation', { id: soalData.detailQuiz._id, title: soalData.detailQuiz.nama, date_create: soalData.detailQuiz.date_create })
    }

    const handleBackButton = () => {
        if (backClickCount == 1) {
            saveJawaban()
            BackHandler.exitApp()
        }

        Toast.show({
            type: 'info',
            text1: 'Tekan back sekali lagi untuk keluar aplikasi'
        });

        return true;
    }

    useEffect(() => {
        Orientation.unlockAllOrientations()
        StatusBar.setBarStyle('dark-content')
        Platform.OS === 'android' && StatusBar.setBackgroundColor('#FFFFFF')
        BackHandler.addEventListener('hardwareBackPress', handleBackButton)
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', handleBackButton)
        }
    })

    useFocusEffect(
        useCallback(() => {
            Orientation.unlockAllOrientations()
            StatusBar.setBarStyle('dark-content')
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#FFFFFF')

            let isActive = true
            if (isActive) loadDetailData()
            return () => {
                isActive = false
            }
        }, [dispatch])
    )

    if (isLoading || (soalData.detailQuiz === null) || (soalData.nilai === null)) return (
        <LoadingComponent />
    )

    if (error === true) 
        return (
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 13,
                    paddingHorizontal: 8,
                }}
                refreshControl={
                    <RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refresh} onRefresh={onRefresh} />
                }
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.loadingBackground
                }}>
                    <Text 
                        fontWeight={{...fonts.medium}} 
                        color={colors.textSecondary} 
                        style={{textAlign: 'center'}} 
                        size={14}
                    >
                        Maaf Terjadi Kesalahan, Scroll Ke bawah ya untuk menyegarakan Tampilan.
                    </Text>
                </View>
            </ScrollView>
        )

    return (
        <>
        <StatusBar barStyle='light-content' backgroundColor='#189F8A' />
        <View style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#189F8A'
        }}>
            <View style={{
                flexDirection: 'column',
                marginVertical: 15,
                marginHorizontal: 25,
                paddingVertical: 15,
                backgroundColor: colorStyle.bg3,
                borderRadius: 30,
            }}>
                {
                
                soalData.nilai !== null ?
                <Fragment>
                    <View style={{
                        flexDirection: 'row',
                        padding: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            paddingTop: 10,
                            paddingBottom: 7,
                            paddingHorizontal: 20,
                            backgroundColor: '#18A08B',
                            borderRadius: 30,
                            width: deviceWidth.width * 0.4,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text
                                size={16}
                                fontWeight={fonts.bold}
                                color={'#FFF'}
                                style={{ textTransform: 'uppercase'}}
                            >
                                SCORE
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            size={14}
                            fontWeight={fonts.regular}
                            color={colorStyle.text5}
                        >
                            Selamat, kamu mendapatkan nilai :
                        </Text>
                    </View>
                    <View style={{
                        paddingVertical: 15,
                        marginVertical: 10,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            backgroundColor: '#179D88',
                            width: deviceWidth.width * 0.35,
                            height: deviceWidth.width * 0.35,
                            borderRadius: (deviceWidth.width * 0.35) / 2,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderWidth: 5,
                            borderColor: '#FFD968'
                        }}>
                            <View style={{
                                backgroundColor: '#FFFFFF',
                                width: deviceWidth.width * 0.25,
                                height: deviceWidth.width * 0.25,
                                borderRadius: (deviceWidth.width * 0.25) / 2,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 5,
                                borderColor: '#5EC0B2'
                            }}>
                                <Text
                                    size={40}
                                    fontWeight={fonts.bold}
                                    color={'#18A08B'}
                                    style={{ textTransform: 'capitalize', alignSelf: 'center'}}
                                >
                                    {soalData.nilai}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width: deviceWidth.width * 0.3
                        }}>
                            <Btn
                                onPress={() => navigation.push('Home')}
                                mode='contained'
                                color='#FFFFFF' 
                                fontColor={'#18A08B'}
                                fontSize={14}
                                title='Tutup'
                            />
                        </View>
                    </View>
                </Fragment>
                :
                <Fragment>
                    <View style={{
                        padding: 25,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text
                            size={14}
                            fontWeight={fonts.regular}
                            color={colorStyle.text5}
                            style={{ textAlign: 'center' }}
                        >
                            Sepertinya terjadi masalah. Pastikan internet kamu stabil dan terhubung ya. Kembali ke Evaluasi untuk mengirim ulang jawaban.
                        </Text>
                    </View>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <View style={{
                            width: deviceWidth.width * 0.3
                        }}>
                            <Btn
                                onPress={() => navigation.push('Home')}
                                mode='contained'
                                color='#FFFFFF' 
                                fontColor={'#18A08B'}
                                fontSize={14}
                                title='Tutup'
                            />
                        </View>
                    </View>
                </Fragment>
                }
            </View>
        </View>
        </>
    )
}

export default QuizResultScreen