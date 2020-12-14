import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Text } from '../../components/common/UtilsComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { 
    View, 
    StatusBar, 
    FlatList,
    ImageBackground,
    RefreshControl,
    Image
} from 'react-native';
import Toast from 'react-native-toast-message';
import Moment from 'moment/min/moment-with-locales';
Moment.locale('id')

import FeedComponent from '../../components/FeedComponent';

import * as authAct from '../../store/actions/authAction';
import * as homeAct from '../../store/actions/homeActions';



const LoginScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const { fullName, foto, sekolah } = useSelector(state => state.auth)
    const homeState = useSelector(state => state.home)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ error, setError ] = useState(true);
    const [ screenLoading, setScreenLoading ] = useState(true);
    const dispatch = useDispatch()
    const feed = homeState.feed

    const loadData = async () => {
        try {
            setRefreshing(true)
            await dispatch(homeAct.initData())
            setRefreshing(false)
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
                text1: 'Maaf, Terjadi Kesalahan!',
                text2: error
            });
            setRefreshing(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true

            StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent;
            StatusBar.setBarStyle("light-content");

            if (isActive) loadData()
            return () => {
                isActive = false
            }
        }, [dispatch])
    )

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible: false
        })

        setScreenLoading(false)
    }, [homeState, screenLoading])

    const onRefresh = async () => {
        loadData()
    }

    return (
        <View style={{
            flex: 1,
        }}>
            <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
            <View style={{
                backgroundColor: colors.bgPrimary,
                elevation: 4,
                shadowOffset: { width: 2, height: 4 },
                shadowOpacity: 0.5,
                shadowRadius: 4,
            }}>
                <ImageBackground 
                    source={require('../../assets/images/header/bg-header-1.png')}
                    style={{width:"100%"}}
                    resizeMode="cover"
                >
                    <SafeAreaView>
                        <View style={{
                            flexDirection: 'row',
                            paddingVertical: 20,
                            paddingHorizontal: 13,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                flex: 1,
                            }}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}>
                                    <Text fontWeight={{...fonts.italic}} color={colors.textWhite} size={12}>{`Selamat Belajar`}</Text>
                                    <Text fontWeight={{...fonts.semiBold}} color={colors.textWhite} size={16} weight='bold'>{`${fullName}`}</Text>
                                    <Text fontWeight={{...fonts.medium}} color={colors.textWhite} size={13} weight='bold'>{`${sekolah.split(':').length > 1 ? sekolah.split(':')[1].trim() : sekolah}`}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                }}>
                                    <Image 
                                        style={{
                                            width: 65,
                                            height: 65,
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: colors.bgWhite
                                        }}
                                        source={{ uri: foto }}   
                                    />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
            <View style={{
                flex: 1,
            }}>
                <ImageBackground 
                    source={require('../../assets/images/bgScreen01.png')}
                    style={{width:"100%",height:"100%"}}
                    resizeMode="cover"
                >
                    <FlatList
                        contentContainerStyle={{
                            paddingVertical: 15,
                        }}
                        refreshControl={<RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refreshing} onRefresh={onRefresh} />}
                        keyExtractor={(item) => item._id}
                        data={feed.sort((a, b) => Moment(b.date_created) - Moment(a.date_created))}
                        extraData={feed}
                        renderItem={itemData => <FeedComponent {...itemData.item} />}
                        ListEmptyComponent={() => 
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '50%'
                            }}>
                                <LottieView 
                                    source={require('../../assets/lottie/33173-smartphone-addicition.json')} 
                                    autoPlay
                                    style={{
                                        width: '40%',
                                        alignItems: 'center',
                                    }}
                                />
                                <Text style={{textAlign: 'center'}} color={colors.primary}>Tidak Ada Postingan</Text>
                            </View>
                        }
                    />
                </ImageBackground>
            </View>
        </View>
    )
}

export default LoginScreen;