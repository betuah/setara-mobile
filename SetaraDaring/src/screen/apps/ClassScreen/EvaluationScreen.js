import React, { Fragment, useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, RefreshControl, ImageBackground, StatusBar, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { Dialog, Portal, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Btn } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment/min/moment-with-locales';
import Orientation from 'react-native-orientation-locker';
import AsyncStorage from '@react-native-async-storage/async-storage';
moment.locale('id')

import LoadingModal from '../../../components/modal_component/Loading_Modal';

import * as authAct from '../../../store/actions/authAction';
import * as quizAct from '../../../store/actions/evaluationAction';
import { SafeAreaView } from 'react-native-safe-area-context';

const deviceWidth = Dimensions.get('window');
const colorStyle = {
    bg0: '#FFFFFF',
    bg1: '#FEDFAF',
    bg2: '#FFCCD4',
    bg3: '#E4D7FF',
    text1: '#FBE7CF',
    text2: '#FBE7CF',
    text3: '#C78391',
    text4: '#5A021A',
    text5: '#7257AE',
    text6: '#7E57C2'
}

const LocalLoading = ({ visible, setLocalLoading}) => {
    return (
        <Portal>
        <Dialog 
            visible={visible} 
            dismissable={false}
            style={{
                borderRadius: 20,
            }}
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <LottieView 
                    source={require('../../../assets/lottie/28893-book-loading.json')} 
                    autoPlay
                    style={{
                        width: '40%',
                        alignItems: 'center',
                    }}
                />
                <Text
                    color='white'
                    weight='bold'
                >
                    Memproses jawaban...
                </Text>
            </View>
        </Dialog>
        </Portal>
    )
}

const ScoreComponent = ({ nilai, fonts }) => (
    <Fragment>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: 25,
            paddingHorizontal: 20,
        }}>
            <View style={{
                flexGrow: 1,
            }}>
            <Text
                size={13}
                fontWeight={fonts.bold}
                color='#73411C'
            >
                <Icon name='analytics-outline' color={'#FECA42'} size={15} />
                { '  Penilaian' }
            </Text>
            </View>
        </View>
        <View style={{
            flexDirection: 'column',
            marginVertical: 15,
            marginHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#42B5A4',
            borderRadius: 20,
        }}>
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
                    color={'#FFFFFF'}
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
                            {nilai}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    </Fragment>
)

const ScoreQuiz = ({item, colors, colorStyle, fonts, refresh, onRefresh, navigation, isAnsExist, sendExistAnswer}) => (
    <>
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                backgroundColor: '#FAF5EE',
            }}
            refreshControl={
                <RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refresh} onRefresh={onRefresh} />
            }
        >
            <View style={{
                flexDirection: 'column',
                marginVertical: 13,
                marginHorizontal: 20,
                backgroundColor: '#EB8944',
                borderRadius: 20,
            }}>
                <View style={{
                    flex: 1,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        paddingVertical: 15,
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View>
                            <Text
                                size={14}
                                fontWeight={fonts.regular}
                                color={colorStyle.text2}
                            >
                                Bentuk Ujian
                            </Text>
                            <Text
                                size={20}
                                fontWeight={fonts.bold}
                                color={colorStyle.text2}
                            >
                                <Icon name='book' color={colorStyle.text2} size={25} />
                                {item.status === 1 ? ' Ulangan' : ' Ujian'}
                            </Text>
                            <Text
                                size={14}
                                fontWeight={fonts.regular}
                                color={colorStyle.text2}
                            >
                                Tenggat Waktu
                            </Text>
                            <Text
                                size={20}
                                fontWeight={fonts.bold}
                                color={colorStyle.text2}
                            >
                                <Icon name='calendar-outline' color={colorStyle.text2} size={25} />
                                {` ${moment(item.end_date).format('D MMM Y')}`}
                            </Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <View>
                            <Text
                                size={14}
                                fontWeight={fonts.regular}
                                color={colorStyle.text2}
                            >
                                Waktu Pengerjaan
                            </Text>
                            <Text
                                size={20}
                                fontWeight={fonts.bold}
                                color={colorStyle.text2}
                            >
                                <Icon name='time' color={colorStyle.text2} size={25} />
                                {` ${item.durasi} Menit`}
                            </Text>
                            <Text
                                size={14}
                                fontWeight={fonts.regular}
                                color={colorStyle.text2}
                            >
                                Jumlah Soal
                            </Text>
                            <Text
                                size={20}
                                fontWeight={fonts.bold}
                                color={colorStyle.text2}
                            >
                                <Icon name='help-circle' color={colorStyle.text2} size={25} />
                                {` ${item.jml_soal}`}
                            </Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            {
                item.status_code === 0 || item.status_code === 2 ? 
                <ScoreComponent nilai={item.nilai_quiz} fonts={fonts} />
            :
                <Fragment>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        marginTop: 15,
                        marginBottom: 10,
                        paddingHorizontal: 20,
                    }}>
                        <View style={{
                            flexGrow: 1,
                        }}>
                        <Text
                            size={13}
                            fontWeight={fonts.bold}
                            color='#73411C'
                        >
                            <Icon name='star-sharp' color={'#FECA42'} size={15} />
                            {`  Petunjuk ${item.status === 1 ? ' Ulangan' : ' Ujian'}`}
                        </Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        marginHorizontal: 20,
                        backgroundColor: '#2E9A6C',
                        borderRadius: 20,
                    }}>
                        <View style={{
                            paddingVertical: 20,
                            paddingHorizontal: 20,
                        }}>
                            <Text
                                size={13}
                                fontWeight={fonts.medium}
                                color='#F0F1DF'
                                style={{ alignSelf: 'center'}}
                            >
                                {   isAnsExist ? 
                                    'Kamu sudah mengerjakan ujian ini, namun server belum menerima jawaban kamu mungkin terjadi kendala antara perangkat kamu dan server. Kamu dapat mengirim ulang jawaban kamu dengan cara klick tombol di bawah' 
                                    :
                                    item.instruksi 
                                }
                            </Text>
                        </View>
                        <View style={{
                            borderRadius: 25,
                            borderColor: '#F9E6CD',
                            borderWidth: 1
                        }}></View>
                        <View style={{
                            alignSelf: 'center',
                            marginVertical: 20,
                        }}>
                        {
                            isAnsExist ? 
                            <Btn
                                onPress={() => sendExistAnswer(item._id)}
                                mode='contained'
                                color='#F9E6CD' 
                                fontColor='#89552C'
                                fontSize={14}
                                title='Kirim Ulang'
                            />
                            :
                            <Btn
                                onPress={() => navigation.push('Quiz', { id: item.id_paket, title: item.nama })}
                                mode='contained'
                                color='#F9E6CD' 
                                fontColor='#89552C'
                                fontSize={14}
                                title='Mulai Mengerjakan'
                            />
                        }    
                        </View>
                    </View>
                </Fragment>
            }
        </ScrollView>
    </>
)

const EvaluationScreen = ({route, navigation}) => {
    const { fonts, colors } = useTheme()
    const dispatch = useDispatch()
    const stateQuiz = useSelector(state => state.evaluation)

    const [ refresh, setRefresh ] = useState(false)
    const [ isAnsExist, setAnsExist ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ isLocalLoading, setLocalLoading ] = useState(false)
    const [ modalLoading, setModalLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const EmptySilabus = `<div style="display: flex; justify-content: center; align-items: center;"><h3 style="color: ${colors.textPrimary};">Tugas Tidak Tersedia. Silahkan hubungi pengajar.</h3></div>`

    const onRefresh = () => {
        loadDetailData()
    }

    const loadDetailData = async () => {
        try {
            setLoading(true)
            await dispatch(quizAct.getDetailQuiz(route.params.id))
            // await dispatch(quizAct.setAnsExist(stateQuiz.detailQuiz ? stateQuiz.detailQuiz._id : '1'))
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

    const sendExistAnswer = async id => {
        try {
            setLocalLoading(true)
            await dispatch(quizAct.reSendQuiz(id))
            navigation.push('QuizResult', { id: `${stateQuiz.detailQuiz._id}` })
            setLocalLoading(false)
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
            setLocalLoading(false)
            setLoading(false)
            setError(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            Orientation.unlockAllOrientations()
            StatusBar.setBarStyle('light-content')
            Platform.OS === 'android' && StatusBar.setBackgroundColor('#537DD3')

            let isActive = true
            if (isActive) loadDetailData()
            return () => {
                isActive = false
            }
        }, [isAnsExist, dispatch])
    )

    if (isLoading || (stateQuiz.detailQuiz === null)) return (
        <View style={{
            flex: 1,
        }}>
            <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
            <ImageBackground 
                source={require('../../../assets/images/bgScreenSoftBlue.png')}
                style={{flex: 1,}}
                resizeMode="cover"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LottieView 
                        source={require('../../../assets/lottie/28893-book-loading.json')} 
                        autoPlay
                        style={{
                            width: '40%',
                            alignItems: 'center',
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
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
        <LoadingModal visible={modalLoading} />
        <LocalLoading visible={isLocalLoading} setLocalLoading={setLocalLoading}/>
        <SafeAreaView style={{
            flex: 1,
            backgroundColor: '#FAF5EE'
        }}>
            <StatusBar barStyle='dark-content' backgroundColor='#FAF5EE' />
            <View style={{
                marginTop: 10,
                marginBottom: 15,
                flexDirection: 'row',
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    flexGrow: 1,
                    marginHorizontal: 20,
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.6}
                    >
                        <Icon name='chevron-back-outline' color='#DC5139' size={25} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    flexDirection: 'column',
                    flexGrow: 4,
                    marginHorizontal: 15,
                }}>
                    <View>
                        <Text
                            fontWeight={fonts.bold}
                            color='#68320A'
                            size={24}
                        >
                            { route.params.title }
                        </Text>
                    </View>
                    <View style={{
                        backgroundColor: stateQuiz.detailQuiz.status_code === 2 ? 'green' : (stateQuiz.detailQuiz.status_code === 1 ? 'orange' : 'red'),
                        paddingVertical: 2,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                    }}>
                        <Text
                            size={12}
                            fontWeight={fonts.medium}
                            color='white'
                        >
                            {stateQuiz.detailQuiz.status_kumpul}
                        </Text>
                    </View>
                </View>
            </View>
            
            <ScoreQuiz 
                item={stateQuiz.detailQuiz} 
                colors={colors} 
                fonts={fonts} 
                refresh={refresh} 
                onRefresh={onRefresh} 
                navigation={navigation} 
                colorStyle={colorStyle}
                isAnsExist={stateQuiz.isAnsExist}
                sendExistAnswer={sendExistAnswer}
            />
        </SafeAreaView>
        </>
    )
}

export default EvaluationScreen