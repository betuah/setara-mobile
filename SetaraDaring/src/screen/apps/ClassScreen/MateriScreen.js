import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, useWindowDimensions, RefreshControl, Linking, ImageBackground } from 'react-native';
import { Card, Divider, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import HTML from 'react-native-render-html';
import env from '../../../config/baseUrl';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

import * as authAct from '../../../store/actions/authAction';
import * as materiAct from '../../../store/actions/materiAction';

const MateriScreen = ({route, navigation}) => {
    const { fonts, colors } = useTheme()
    const dispatch = useDispatch()
    const { detailMateri } = useSelector(state => state.materi)
    const [ refresh, setRefresh ] = useState(false)
    const [ error, setError ] = useState(false)

    const EmptySilabus = `<div style="display: flex; justify-content: center; align-items: center;"><h3 style="color: ${colors.textPrimary};">Materi Tidak Tersedia. Silahkan hubungi pengajar.</h3></div>`

    const onRefresh = () => {
        loadDetailData()
    }

    const loadDetailData = async () => {
        try {
            setRefresh(true)
            await dispatch(materiAct.getDetailMateri(route.params.id))
            setRefresh(false)
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
            setRefresh(false)
            setError(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            if (isActive) loadDetailData()
            return () => {
                isActive = false
            }
        }, [dispatch])
    )

    if (error === true) 
        return (
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
        )

    // if (refresh) 
    //     return (
    //         <View 
    //             style={{
    //                 flex: 1,
    //                 flexDirection: 'column',
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //             }}
    //         >
    //             <LottieView 
    //                 source={require('../../../assets/lottie/28893-book-loading.json')} 
    //                 autoPlay
    //                 style={{width: '50%'}}
    //             />
    //             <View style={{width: useWindowDimensions().width * 0.7, marginTop: 10,}}>
    //                 <Text 
    //                     fontWeight={{...fonts.medium}} 
    //                     color={colors.textSecondary} 
    //                     style={{textAlign: 'center'}} 
    //                     size={12}
    //                 >
    //                     Mohon tunggu sebentar ya. Bahan Belajar kamu sedang dipersiapkan.
    //                 </Text>
    //             </View>
    //         </View>
    //     )

    return (
        <View>
            <ImageBackground
                source={require('../../../assets/images/bgScreen01.png')}
                style={{width:"100%",height:"100%"}}
                resizeMode="cover"
            >
            <ScrollView
                contentContainerStyle={{
                    paddingVertical: 13,
                    paddingHorizontal: 8,
                    // backgroundColor: colors.bgLight,
                }}
                refreshControl={
                    <RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refresh} onRefresh={onRefresh} />
                }
            >
                <Card style={{
                    paddingVertical: 10,
                    paddingHorizontal: 8,
                    borderRadius: 10,
                    elevation: 2,
                    shadowOffset: { width: 1, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}>
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        marginBottom: 5,
                    }}>
                        <Text
                            color={colors.textPrimary}
                            fontWeight={{...fonts.semiBold}}
                            size={20}
                        >
                            {detailMateri.judul}
                        </Text>
                        <Text
                            color={colors.textSecondary}
                            fontWeight={{...fonts.regular}}
                            size={10}
                        >
                            {`${moment(detailMateri.date_created).format('D MMM Y')} - ${moment(detailMateri.date_created).startOf('day').fromNow()}`}
                        </Text>
                    </View>
                    <Divider />
                    <HTML 
                        html={detailMateri ? (detailMateri.isi ? detailMateri.isi : EmptySilabus) : EmptySilabus} 
                        baseFontStyle={{color: colors.textDark, ...fonts.regular}} 
                        contentWidth={useWindowDimensions().width * 0.90}
                        imagesMaxWidth={useWindowDimensions().width * 0.93}
                        enableExperimentalPercentWidt={true}
                        staticContentMaxWidth={useWindowDimensions().width * 0.93}
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
            </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default MateriScreen