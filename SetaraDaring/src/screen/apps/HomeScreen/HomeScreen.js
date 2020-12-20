import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Text } from '../../../components/common/UtilsComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';
import Icon from 'react-native-vector-icons/Ionicons'
import { 
    View, 
    StatusBar, 
    FlatList,
    ImageBackground,
    RefreshControl,
    Image,
    TouchableOpacity,
    useWindowDimensions,
    Platform
} from 'react-native';
import Toast from 'react-native-toast-message';
import Moment from 'moment/min/moment-with-locales';
Moment.locale('id')

import FilterModal from '../../../components/modal_component/FilterClass_Modal';
import FeedComponent from '../../../components/FeedComponent';

import * as authAct from '../../../store/actions/authAction';
import * as homeAct from '../../../store/actions/homeActions';

const LoginScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()

    const { fullName, foto, sekolah } = useSelector(state => state.auth)
    const homeState = useSelector(state => state.home)

    const [ refreshing, setRefreshing ] = useState(false)
    const [ screenLoading, setScreenLoading ] = useState(true);
    const [ filterModal, setFilterModal ] = useState(false)

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
                text1: 'Ops...!',
                text2: error
            });
            setRefreshing(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true

            Platform.OS === 'android' && StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent;
            StatusBar.setBarStyle("light-content");

            Orientation.lockToPortrait()

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

    const classPostPress = (classId, className) => {
        setFilterModal(false)
        navigation.navigate('PostClass', {
            classId,
            className
        })
    }

    const detailPress = (postId, date_created) => {
        navigation.navigate('DetailPost', { postId, date_created })
    }

    return (
        <View style={{
            flex: 1,
        }}>
            { Platform.OS === 'ios' ? 
                <StatusBar barStyle='light-content' translucent />
                :
                <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
            }
            <FilterModal 
                visible={filterModal} 
                onDismiss={() => setFilterModal(false)} 
                onPress={classPostPress}
            />
            
            <View style={{
                backgroundColor: colors.bgPrimary,
                elevation: 4,
                shadowOffset: { width: 1, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
                shadowColor: 'black',
            }}>
                <ImageBackground 
                    source={require('../../../assets/images/header/bg-header-1.png')}
                    style={{width:"100%"}}
                    resizeMode="cover"
                >
                    <SafeAreaView>
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            paddingVertical: 10,
                            paddingHorizontal: 13,
                        }}>
                            <View
                                style={{
                                    flexGrow: 1,
                                    alignItems: 'flex-start'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => onRefresh()}
                                    activeOpacity={0.6}
                                >
                                    <Icon 
                                        name='home' 
                                        color={colors.textWhite} 
                                        size={22}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text
                                fontWeight={{
                                    ...fonts.bold
                                }}
                                size={18}
                                color={colors.textWhite}
                            >
                                B E R A N D A
                            </Text>
                            <View
                                style={{
                                    flexGrow: 1,
                                    alignItems: 'flex-end'
                                }}
                            >
                                <TouchableOpacity
                                    onPress={() => setFilterModal(true)}
                                    activeOpacity={0.6}
                                >
                                    <Icon 
                                        name='filter' 
                                        color={colors.textWhite} 
                                        size={22}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            paddingTop: 10,
                            paddingBottom: 20,
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
                    source={require('../../../assets/images/bgScreen01.png')}
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
                        renderItem={itemData => <FeedComponent onClassPress={classPostPress} onDetailPress={detailPress} {...itemData.item} />}
                        ListEmptyComponent={() => 
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: useWindowDimensions().height * 0.2
                            }}>
                                <LottieView 
                                    source={require('../../../assets/lottie/33173-smartphone-addicition.json')} 
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