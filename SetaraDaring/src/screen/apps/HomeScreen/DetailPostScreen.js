import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Divider, useTheme } from 'react-native-paper';
import { ScrollView, StatusBar, View, RefreshControl, ImageBackground, Image, Dimensions } from 'react-native';
import { Text } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';
import env from '../../../config/baseUrl';
import HTML from 'react-native-render-html';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

import * as authAct from '../../../store/actions/authAction';
import * as postAct from '../../../store/actions/homeActions';

const PostClass = ({navigation, route}) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()
    const state = useSelector(state => state.home)
    const data = state.detailFeed
    const [ refreshing, setRefreshing ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)

    const loadDetailFeed = async () => {
        try {
            setLoading(true)
            await dispatch(postAct.postDetail(route.params.postId))
            setLoading(false)
        } catch (error) {
            if (error === 'ERR_GENERATE_TOKEN') {
                dispatch(authAct.signOut(true))
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Sesi kamu telah Habis!',
                    text2: 'Silahkan masuk kembali.'
                });
            }
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Ops...!',
                text2: error
            });
        }
    }

    const onRefresh = async () => {
        loadDetailFeed()
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            isActive && loadDetailFeed()

            Orientation.lockToPortrait()

            return () => {
                isActive = false
            }
        }, [dispatch],)
    )

    if (isLoading || data === null) 
        return (
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

    return (
        <>
        <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
        <View 
            style={{
                flex: 1,
            }}
        >
            <ImageBackground 
                source={require('../../../assets/images/bgScreenSoftBlue.png')}
                style={{flex: 1,}}
                resizeMode="cover"
            >
                <ScrollView
                    refreshControl={<RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refreshing} onRefresh={onRefresh} />}
                    contentContainerStyle={{
                        paddingVertical: 15,
                        paddingHorizontal: 10,
                    }}
                >
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        padding: 10,
                        borderRadius: 10,
                        elevation: 2,
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'flex-start'
                            }}>
                                <Image 
                                    style={{
                                        width: 50,
                                        height: 50,
                                        borderRadius: 50,
                                    }}
                                    source={{ uri: data.foto_creator }} 
                                />
                            </View>
                            
                            <View style={{
                                flex: 1,
                                paddingLeft: 10,
                                marginBottom: 10,
                                flexDirection: 'column'
                            }}>
                                <Text weight='bold' color={colors.primary} size={14}>
                                    {data.nama_creator}
                                </Text>
                                <Text weight='bold' color={colors.orange} size={12}>
                                    {data.nama_kelas} 
                                </Text>
                                <Text color={colors.textGrey} size={10}>
                                    {`${moment(data.date_created).format('DD MMM YYYY')} - ${moment(data.date_created).startOf('day').fromNow()}`}
                                </Text>
                            </View>
                        </View>
                        <Divider style={{height: 1,}} />
                        <View style={{
                            marginTop: 10,
                        }}>
                            <Text
                                fontWeight={{...fonts.regular}}
                                color={colors.textDark}
                                size={12}
                            >
                                {state.detailFeed ? (state.detailFeed.isi_postingan ? state.detailFeed.isi_postingan : '') : ''}
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
        </>
    )
}

export default PostClass;