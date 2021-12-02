import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { View, ScrollView, RefreshControl, Linking, StatusBar, Dimensions, FlatList, Platform, BackHandler, TouchableOpacity } from 'react-native';
import { TouchableRipple, useTheme, ProgressBar, RadioButton, Dialog, Portal } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import CountDown from 'react-native-countdown-component';
import { Text, Btn } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import env from '../../../config/baseUrl';
import moment from 'moment/min/moment-with-locales';
import Orientation from 'react-native-orientation-locker';
import LottieView from 'lottie-react-native';
moment.locale('id')

import LoadingModal from '../../../components/modal_component/Loading_Modal';
import LoadingComponent from '../../../components/common/LoadingComponent';

import * as authAct from '../../../store/actions/authAction';
import * as quizAct from '../../../store/actions/evaluationAction';
import colors from '../../../constants/colors';

const deviceWidth = Dimensions.get('window');

const OpsiComponent = ({ itemOpsi, index, singleAnswer, setAnswer, colors, fonts }) => {
    if (singleAnswer) return (
        <View key={itemOpsi.key} style={{
            backgroundColor: singleAnswer.id_opsi === itemOpsi.id_opsi ? '#FF8FA3' : '#E8E4FA',
            borderRadius: 12,
            marginVertical: 5,
        }}>
            <TouchableRipple 
                borderless 
                rippleColor="rgba(0, 0, 0, .32)" 
                onPress={() => setAnswer(itemOpsi.id_opsi)}
            >
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <RadioButton
                        color={singleAnswer.id_opsi === itemOpsi.id_opsi ? '#FFFFFF' : '#796BE2'}
                        uncheckedColor={singleAnswer.id_opsi === itemOpsi.id_opsi ? '#FFFFFF' : '#796BE2'}
                        value={itemOpsi.id_opsi}
                        status={ singleAnswer.id_opsi === itemOpsi.id_opsi ? 'checked' : 'unchecked' }
                    />
                    <HTML
                        html={itemOpsi.text}
                        baseFontStyle={{color: singleAnswer.id_opsi === itemOpsi.id_opsi ? '#FFFFFF' : '#796BE2', ...fonts.regular, fontSize: 14}} 
                        contentWidth={Dimensions.get('window').width * 0.90}
                        imagesMaxWidth={Dimensions.get('window').width * 0.93}
                        enableExperimentalPercentWidt={true}
                        staticContentMaxWidth={Dimensions.get('window').width * 0.93}
                        onLinkPress={(event, url) => Linking.openURL(`${env.file_domain}/${url}`)}
                        alterChildren = {node => {
                            if (node.attribs.src) {
                                const firtsPath = node.attribs.src.split('/')
                                if (firtsPath[0] === 'assets') node.attribs.src = `${env.file_domain}/${node.attribs.src}`
                            }

                            if (node.name === 'iframe') {
                                delete node.attribs.width;
                            }
                            return node.children;
                        }}
                    />
                    {
                        singleAnswer.id_opsi === itemOpsi.id_opsi &&
                        <View style={{
                            flexGrow: 1,
                            paddingRight: 10,
                            justifyContent: 'center',
                            alignItems: 'flex-end'
                        }}>
                            <Icon name='checkmark-circle' color='#65DC41' size={25} />
                        </View>
                    }
                </View>
            </TouchableRipple>
        </View>
    )
    
    return (<></>)
}

const SoalComponent = ({ data, colors, fonts, jawaban, setJawaban, index}) => {
    let opsiChanged = true
    const singleAnswer = jawaban.length > 0 && jawaban.find(itmAns => itmAns.id_soal === data.id_soal)
    const setAnswer = (id_opsi) => {
        let arr = jawaban

        arr.find((o, i) => {
            if (o.id_soal === singleAnswer.id_soal) {
                arr[i] = { id_soal: singleAnswer.id_soal, id_opsi: id_opsi}
                return true
            }
            
        })

        setJawaban(arr)
        opsiChanged = !opsiChanged
    }

    return (
    <>
    <ScrollView
        contentContainerStyle={{
            flexDirection: 'column',
            width: deviceWidth.width,
        }}
    >
        <View style={{
            flexDirection: 'column',
            backgroundColor: '#FFFFFF',
            borderRadius: 10,
            margin: 10,
            marginHorizontal: 15,
            marginTop: 18,
            paddingHorizontal: 12,
            paddingTop: 5,
            paddingBottom: 20,
        }}>
            <View style={{
                paddingBottom: 10,
            }}>
                <HTML
                    html={data.soal}
                    baseFontStyle={{color: '#767676', ...fonts.bold, fontSize: 15}} 
                    contentWidth={Dimensions.get('window').width * 0.90}
                    imagesMaxWidth={Dimensions.get('window').width * 0.93}
                    enableExperimentalPercentWidt={true}
                    staticContentMaxWidth={Dimensions.get('window').width * 0.93}
                    onLinkPress={(event, url) => Linking.openURL(`${env.file_domain}/${url}`)}
                    alterChildren = {node => {
                        if (node.attribs.src) {
                            const firtsPath = node.attribs.src.split('/')
                            if (firtsPath[0] === 'assets') node.attribs.src = `${env.file_domain}/${node.attribs.src}`
                        }

                        if (node.name === 'iframe') {
                            delete node.attribs.width;
                        }
                        return node.children;
                    }}
                />
            </View>
            <View style={{}}>
                <FlatList
                    data={data.opsi}
                    keyExtractor={item => item.id_opsi.toString()}
                    renderItem={(itemOpsi, index) => 
                        <OpsiComponent
                            itemOpsi={itemOpsi.item}
                            index={index}
                            singleAnswer={singleAnswer}
                            setAnswer={setAnswer}
                            fonts={fonts}
                            colors={colors}
                            key={itemOpsi.key}
                        />
                    }
                />
            </View>
        </View>
    </ScrollView>
    </>
    )
}

const AlertComponent = ({ visible, title = 'Title here', message = 'Your massage here', setAlertSave, onDone}) => {
    return (
        <Portal>
        <Dialog 
            visible={visible} 
            onDismiss={() => setAlertSave(false)}
            style={{
                borderRadius: 20,
            }}
        >
            <View style={{
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 13,
            }}>
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Icon name='alert-circle' color='#02ADFB' size={30} />
                </View>
                <View style={{
                    paddingHorizontal: 10,
                    width: deviceWidth.width * 0.7,
                }}>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            marginBottom: 10,
                        }}>
                            <Text 
                                color='#5D5D5D' 
                                size={18}
                                weight='bold'
                            >
                                {title}
                            </Text>
                        </View>
                        <View style={{
                            // flexWrap: 'wrap'
                        }}>
                            <Text 
                                color='#5D5D5D' 
                                size={14}
                            >
                                {message}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            marginVertical: 10,
                        }}>
                            <View style={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Btn
                                    onPress={() => setAlertSave(false)}
                                    mode='contained'
                                    color='#FF8FA3' 
                                    fontColor='#FFF'
                                    fontSize={12}
                                    title='Batal'
                                    style={{ width: deviceWidth.width * 0.27 }}
                                />
                            </View>
                            <View style={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Btn
                                    Icon={{name:"send", size: 10, color: '#FFF'}}
                                    IconRight={true}
                                    IconType='ionic'
                                    onPress={() => onDone()}
                                    mode='contained'
                                    color='#27AAFF' 
                                    fontColor='#FFF'
                                    fontSize={12}
                                    title='Ok'
                                    style={{ width: deviceWidth.width * 0.27 }}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{
                    flexGrow: 1,
                }}>
                    <TouchableOpacity
                        onPress={() => setAlertSave(false)}
                        activeOpacity={0.6}
                    >
                        <Icon name='close-outline' color='#5D5D5D' size={16} />
                    </TouchableOpacity>
                </View>
            </View>
        </Dialog>
        </Portal>
    )
}

const FlatAlert = ({ visible, title = 'Title here', message = 'Your massage here', setAlertSave}) => {
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
                flexDirection: 'row',
                paddingVertical: 10,
                paddingHorizontal: 13,
            }}>
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                    <Icon name='alert-circle' color='#EF5350' size={30} />
                </View>
                <View style={{
                    paddingHorizontal: 10,
                    width: deviceWidth.width * 0.7,
                }}>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <View style={{
                            marginBottom: 10,
                        }}>
                            <Text 
                                color='#5D5D5D' 
                                size={18}
                                weight='bold'
                            >
                                {title}
                            </Text>
                        </View>
                        <View style={{
                            // flexWrap: 'wrap'
                        }}>
                            <Text 
                                color='#5D5D5D' 
                                size={14}
                            >
                                {message}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        </Dialog>
        </Portal>
    )
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

const QuizScreen = ({route, navigation}) => {
    const insets = useSafeAreaInsets();
    const { fonts, colors } = useTheme()
    const dispatch = useDispatch()
    const soalData = useSelector(state => state.evaluation)

    const soalRef = useRef(null)
    const [ soalIndex, setSoalIndex ] = useState(0)
    const [ backClickCount, setBackClick ] = useState(0)
    const [ alertSave, setAlertSave ] = useState(false)
    const [ alertBack, setAlertBack ] = useState(false)
    const [ alertFinish, setAlertFinish ] = useState(false)
    const [ alertExit, setAlertExit ] = useState(false)
    const [ changed, setChange ] = useState(true)
    const [ refresh, setRefresh ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ localLoading, setLocalLoading ] = useState(false)
    const [ modalLoading, setModalLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const onRefresh = () => {
        loadDetailData()
    }

    const goToIndexSoal = (req, i) => {
        let index
        switch (req) {
            case 'prev':
                
                if (soalIndex === 0) {
                    index = 0
                    setSoalIndex(index)
                } else {
                    index = soalIndex - 1
                    setSoalIndex(index)
                }
                soalRef.current.scrollToIndex({animated: true, index: index})
                break;
            
            case 'next':
                const arrLength = soalData.soalItem.soal.length
                if (soalIndex === (arrLength - 1)) {
                    index = arrLength - 1
                    setSoalIndex(index)
                } else {
                    index = soalIndex + 1
                    setSoalIndex(index)
                }
                soalRef.current.scrollToIndex({animated: true, index: index})
                break;

            case 'to':
                setSoalIndex(i)
                soalRef.current.scrollToIndex({animated: true, index: i})
                break;
        }
    }

    const goBack = async () => {
        try {
            setAlertBack(false)
            setLocalLoading(true)
            await dispatch(quizAct.saveJawaban(soalData.detailQuiz._id, soalData.detailQuiz.id_paket, soalData.jawaban))
            navigation.goBack()
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
            navigation.goBack()
            setAlertBack(false)
            setLocalLoading(false)
        }
    }

    const loadDetailData = async () => {
        try {
            setLoading(true)
            await dispatch(quizAct.flushDetailSoal())
            await dispatch(quizAct.getDetailSoal(route.params.id))
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

    const saveJawaban = async () => {
        try {
            setAlertSave(false)
            setLocalLoading(true)
            await dispatch(quizAct.saveJawaban(soalData.detailQuiz._id, soalData.detailQuiz.id_paket, soalData.jawaban))
            navigation.push('Home', { 
                screen: 'Kelas', 
                params: { 
                    screen: 'QuizResult',
                    params: { id: `${soalData.detailQuiz._id}` }
                }
            })
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
            navigation.push('Home', { 
                screen: 'Kelas', 
                params: { 
                    screen: 'QuizResult',
                    params: { id: `${soalData.detailQuiz._id}` }
                }
            })
            setAlertSave(false)
            setLocalLoading(false)
        }
    }

    const timeFinish = async () => {
        setAlertFinish(true)
        setTimeout(async () => {
            try {
                setAlertFinish(false)
                setLocalLoading(true)
                await dispatch(quizAct.saveJawaban(soalData.detailQuiz._id, soalData.detailQuiz.id_paket, soalData.jawaban))
                navigation.push('Home', { 
                    screen: 'Kelas', 
                    params: { 
                        screen: 'QuizResult',
                        params: { id: `${soalData.detailQuiz._id}` }
                    }
                })
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
                navigation.push('Home', { 
                    screen: 'Kelas', 
                    params: { 
                        screen: 'QuizResult',
                        params: { id: `${soalData.detailQuiz._id}` }
                    }
                })
                setAlertFinish(false)
                setLocalLoading(false)
            }
        }, 5000);
    }

    const exitApp = async () => {
        try {
            setAlertExit(false)
            setLocalLoading(true)
            await dispatch(quizAct.saveJawaban(soalData.detailQuiz._id, soalData.detailQuiz.id_paket, soalData.jawaban))
            BackHandler.exitApp()
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
            BackHandler.exitApp()
            setAlertExit(false)
            setLocalLoading(false)
        }
    }

    const handleBackButton = () => {
        if (backClickCount == 1) {
            setAlertExit(true)
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

    const setJawaban = async arr => {
        try {
            await dispatch(quizAct.setJawaban(arr))
            setChange(!changed)
        } catch (error) {
            console.log('error cuy')
        }
    }

    if (isLoading || (soalData.soalItem === null)) return (
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
        <LoadingModal visible={modalLoading} />
        <StatusBar barStyle='dark-content' backgroundColor='#FFFFFF' />
        <AlertComponent visible={alertSave} title={'Kumpul Evaluasi'} message="Apakah kamu yakin sudah mengisi semua jawaban ?" setAlertSave={setAlertSave} onDone={saveJawaban} />
        <AlertComponent visible={alertBack} title={'Keluar'} message="Apakah kamu yakin ingin keluar ? Evaluasi akan di anggap selesai jika kamu keluar." setAlertSave={setAlertBack} onDone={goBack} />
        <AlertComponent visible={alertExit} title={'Keluar Aplikasi'} message="Apakah kamu yakin ingin keluar ? Evaluasi akan di anggap selesai jika kamu keluar." setAlertSave={setAlertExit} onDone={exitApp} />
        <FlatAlert visible={alertFinish} title={'Waktu Habis'} message="Waktu kamu telah habis, jawaban akan segera dikirim."/>
        <LocalLoading visible={localLoading} setLocalLoading={setLocalLoading}/>
        <View style={{
            flex: 1,
        }}>
            <View style={{
                flexGrow: 1,
                marginTop: insets.top,
                backgroundColor: '#F2F9FB',
                flexDirection: 'column'
            }}>
                <View style={{
                    flexDirection: 'row',
                    backgroundColor: '#FFFFFF',
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                        <TouchableRipple 
                            borderless 
                            rippleColor="rgba(0, 0, 0, .32)" 
                            onPress={() => setAlertBack(true)}
                        >
                            <Icon name='arrow-back-outline' color='#5D5D5D' size={25} />
                        </TouchableRipple>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text 
                            fontWeight={fonts.bold} 
                            color='#5D5D5D' 
                            size={15}
                        >
                            Soal Nomor { soalIndex + 1 }
                        </Text>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                    }}>
                        <View style={{
                            flexDirection: 'row',
                            borderRadius: 10,
                            backgroundColor: '#2196F3',
                            borderRadius: 20,
                            paddingHorizontal: 10,
                        }}>
                            <CountDown
                                until={Number(soalData.detailQuiz.durasi * 60 || 0)}
                                onFinish={() => timeFinish()}
                                onPress={() => {}}
                                size={14}
                                timeToShow={['H', 'M', 'S']}
                                timeLabels={{h: null, m: null, s: null}}
                                digitStyle={{backgroundColor: 'transparent', width: 18}}
                                digitTxtStyle={{color: 'white', fontWeight: 'bold',}}
                                style={{justifyContent: 'center', alignItems: 'center' }}
                                separatorStyle={{color: 'white', fontSize: 14}}
                                showSeparator
                            />
                        </View>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    padding: 15,
                }}>
                    <View style={{
                        marginBottom: 5,
                    }}>
                        <ProgressBar 
                            progress={soalData.jawaban.filter(itm => itm.id_opsi !== '').length / soalData.soalItem.soal.length} 
                            color='#65DC41' 
                            style={{
                                borderRadius: 50,
                                height: 8,
                            }}
                        />
                    </View>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View>
                            <Text 
                                color='#5D5D5D' 
                                size={11}
                            >
                                Progress
                            </Text>
                        </View>
                        <View style={{
                            flexGrow: 1,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end'
                        }}>
                            <Text 
                                weight='bold'
                                color='#5D5D5D' 
                                size={11}
                            >
                                {`${soalData.jawaban.filter(itm => itm.id_opsi !== '').length}/${soalData.soalItem.soal.length} Soal`}
                            </Text>
                        </View>
                    </View>
                </View>
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                    }}
                >
                <FlatList
                    horizontal
                    ref={soalRef}
                    initialScrollIndex={soalIndex}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    legacyImplementation={false}
                    data={soalData.soalItem.soal}
                    extraData={changed}
                    maxToRenderPerBatch={3}
                    windowSize={1}
                    removeClippedSubviews={Platform.OS === 'android' ? true : false}
                    keyExtractor={item => item.id_soal.toString()}
                    onMomentumScrollEnd={e => {
                        let contentOffset = e.nativeEvent.contentOffset
                        let viewSize = e.nativeEvent.layoutMeasurement
                        let pageNum = Math.floor(contentOffset.x / viewSize.width)
                        setSoalIndex(pageNum)
                    }}
                    getItemLayout={(data, index) => ({
                        length: deviceWidth.width,
                        offset: deviceWidth.width * index,
                        index,
                    })}
                    renderItem={({item, index}) => 
                        <SoalComponent
                            index={index}
                            insets={insets}
                            data={item}
                            fonts={fonts}
                            colors={colors}
                            jawaban={soalData.jawaban}
                            setJawaban={setJawaban}
                            changed={changed}
                            setChange={setChange}
                            key={index}
                        />
                    }
                />
                </ScrollView>
                <View style={{
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flexWrap: 'wrap',
                        flexDirection: 'row',
                        paddingHorizontal: 15,
                    }}>
                        {
                            soalIndex > 0 && 
                            <View style={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Btn
                                    Icon={{name:"chevron-back-outline", size: 14, color: '#845430'}}
                                    IconType='ionic'
                                    onPress={() => goToIndexSoal('prev')}
                                    mode='contained'
                                    color='#FEDFAF' 
                                    fontColor='#845430'
                                    fontSize={14}
                                    title='Sebelumnya'
                                    style={{ width: deviceWidth.width * 0.4 }}
                                />
                            </View>
                        }
                        {
                            soalIndex < (soalData.soalItem.soal.length - 1) &&
                            <View style={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Btn
                                    Icon={{name:"chevron-forward-outline", size: 14, color: '#845430'}}
                                    IconType='ionic'
                                    IconRight={true}
                                    onPress={() => goToIndexSoal('next')}
                                    mode='contained'
                                    color='#FEDFAF' 
                                    fontColor='#845430'
                                    fontSize={14}
                                    title='Selanjutnya'
                                    style={{ width: deviceWidth.width * 0.4 }}
                                />
                            </View>
                        }
                        {
                            soalIndex === (soalData.soalItem.soal.length - 1) &&
                            <View style={{
                                flexGrow: 1,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Btn
                                    Icon={{name:"send", size: 14, color: '#FFF'}}
                                    IconRight={true}
                                    IconType='ionic'
                                    onPress={() => setAlertSave(true)}
                                    mode='contained'
                                    color='#27AAFF' 
                                    fontColor='#FFF'
                                    fontSize={14}
                                    title='Selesai'
                                    style={{ width: deviceWidth.width * 0.4 }}
                                />
                            </View>
                        }
                    </View>
                    <View style={{
                        flexGrow: 1,
                        marginTop: deviceWidth.height * 0.02,
                        paddingHorizontal: 20,
                        paddingVertical: 15,
                        backgroundColor: '#FFFFFF'
                    }}>
                        <FlatList 
                            horizontal
                            initialScrollIndex={soalIndex}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={true}
                            legacyImplementation={false}
                            data={soalData.soalItem.soal}
                            extraData={changed}
                            keyExtractor={item => item.id_soal.toString()}
                            renderItem={({item, index}) => 
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 5,
                                }}>
                                    <TouchableRipple 
                                        borderless
                                        rippleColor="rgba(0, 0, 0, .32)" 
                                        onPress={() => goToIndexSoal('to', index)}
                                    >
                                    <View style={{
                                        backgroundColor: index === soalIndex || soalData.jawaban.find(itm => itm.id_soal === item.id_soal).id_opsi !== '' ? '#FF8FA3' : '#82B1FF',
                                        borderColor: index === soalIndex ? '#F8BBD0' : '#E8E4FA',
                                        borderWidth: 2,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        paddingTop: 5,
                                        borderRadius: 10,
                                        minHeight: deviceWidth.height * 0.05,
                                        minWidth: deviceWidth.width * 0.09
                                    }}>
                                        <Text
                                            color='white'
                                            size={14}
                                            fontWeight={{...fonts.bold}} 
                                        >
                                            { index + 1 }
                                        </Text>
                                    </View>
                                    </TouchableRipple>
                                </View>
                            }
                        />
                    </View>
                </View>
            </View>
        </View>
        </>
    )
}

export default QuizScreen