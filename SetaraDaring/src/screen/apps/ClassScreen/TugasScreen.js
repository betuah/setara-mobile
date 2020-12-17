import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, RefreshControl, Linking, ImageBackground, StatusBar, Dimensions, TouchableOpacity } from 'react-native';
import { Card, Divider, useTheme, TextInput, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Btn } from '../../../components/common/UtilsComponent';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import env from '../../../config/baseUrl';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

import * as authAct from '../../../store/actions/authAction';
import * as tugasAct from '../../../store/actions/tugasAction';

const TugasScreen = ({route, navigation}) => {
    const { fonts, colors } = useTheme()
    const dispatch = useDispatch()
    const stateTugas = useSelector(state => state.tugas)
    const [ refresh, setRefresh ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)

    const EmptySilabus = `<div style="display: flex; justify-content: center; align-items: center;"><h3 style="color: ${colors.textPrimary};">Tugas Tidak Tersedia. Silahkan hubungi pengajar.</h3></div>`

    const onRefresh = () => {
        loadDetailData()
    }

    const loadDetailData = async () => {
        try {
            setLoading(true)
            await dispatch(tugasAct.getDetailTugas(route.params.id))
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
                text2: error
            });
            setLoading(false)
            setError(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('light-content')
            StatusBar.setBackgroundColor(colors.primary)

            let isActive = true
            if (isActive) loadDetailData()
            return () => {
                isActive = false
            }
        }, [dispatch])
    )

    const onAttachFile = async () => {
        console.log('attach')
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            for (const res of results) {
                console.log(
                    res.uri,
                    res.type, // mime type
                    res.name,
                    res.size
                );
            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    if (isLoading || (stateTugas.detailTugas === null)) return (
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
        <View>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
            <ImageBackground
                source={require('../../../assets/images/bgScreen01.png')}
                style={{width:"100%",height:"100%"}}
                resizeMode="cover"
            >
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 13,
                    paddingHorizontal: 8,
                }}
                refreshControl={
                    <RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refresh} onRefresh={onRefresh} />
                }
            >
                <Card style={{
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    elevation: 2,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        marginBottom: 5,
                    }}>
                        <View style={{
                            flex: 5,
                            alignItems: 'flex-start',
                            justifyContent: 'center'
                        }}>
                            <Text
                                color={colors.textPrimary}
                                fontWeight={{...fonts.semiBold}}
                                size={14}
                            >
                                {stateTugas.detailTugas.nama}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            paddingTop: 5,
                        }}>
                            <Text
                                color={colors.textGreyLight}
                                fontWeight={{...fonts.regular}}
                                size={10}
                            >
                                {`${moment(stateTugas.detailTugas.date_created).format('D MMM Y')}`}
                            </Text>
                        </View>
                    </View>
                    <Divider />
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                    }}>
                        <View style={{
                            paddingRight: 10,
                            justifyContent: 'flex-start'
                        }}>
                            <Icon name='calendar-outline' size={22} color={colors.primary} />
                        </View>
                        <View>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <Text
                                    color={colors.text}
                                    fontWeight={{...fonts.regular}}
                                    size={12}
                                >
                                    {`Tenggat Waktu : `}
                                </Text>
                                <Text
                                    color={colors.textPrimary}
                                    fontWeight={{...fonts.medium}}
                                    size={12}
                                >
                                    {`${moment(stateTugas.detailTugas.deadline).format('HH:MM - D MMM Y')}`}
                                </Text>
                            </View>
                            <Text
                                color={colors.text}
                                fontWeight={{...fonts.regular}}
                                size={10}
                            >
                                {`Berakhir ${moment(stateTugas.detailTugas.deadline).endOf('minute').fromNow()}.`}
                            </Text>
                        </View>
                    </View>
                    <Divider />
                    <HTML 
                        html={stateTugas.detailTugas ? (stateTugas.detailTugas.deskripsi ? stateTugas.detailTugas.deskripsi : EmptySilabus) : EmptySilabus} 
                        baseFontStyle={{color: colors.textDark, ...fonts.regular, fontSize: 11}} 
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
                </Card>
                <Card style={{
                    marginTop: 10,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                    borderRadius: 10,
                    elevation: 2,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingBottom: 5,
                    }}>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-start'
                        }}>
                            <Text
                                fontWeight={{...fonts.medium}}
                                size={14}
                                color={colors.textPrimary}
                            >
                                Pengumpulan Tugas
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end',
                            justifyContent: 'center'
                        }}>
                            <Icon name='create' color={colors.primary} size={18} />
                        </View>
                    </View>
                    <Divider />
                    <View style={{
                        paddingVertical: 8,
                    }}>
                        <TextInput 
                            mode='outlined'
                            label='Jawab Tugas'
                            placeholder='Tulis jawaban Kamu di sini dan lampirkan file bila perlu.'
                            multiline={true}
                            numberOfLines={5}
                            dense={true}
                            editable={true}
                            selectionColor={colors.primary}
                            style={{
                                fontSize: 12,
                            }}
                        />
                    </View>
                    <View style={{
                        paddingBottom: 10,
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <TouchableOpacity 
                                onPress={() => onAttachFile()}
                                activeOpacity={0.7}
                            >
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <Icon name='attach' color={colors.primary} size={18} />
                                    <Text
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.text}
                                    >
                                        Lampirkan File
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end'
                        }}>
                            <Btn 
                                onPress={() => console.log('test')}
                                mode="text"
                                title='Simpan'
                                fontColor={colors.primary}
                                fontSize={14}
                                fontWeight={fonts.semiBold}
                            />
                        </View>
                    </View>
                </Card>
            </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default TugasScreen