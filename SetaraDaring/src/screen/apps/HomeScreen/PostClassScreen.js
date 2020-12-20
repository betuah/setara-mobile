import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { FlatList, StatusBar, View, RefreshControl, useWindowDimensions, ImageBackground } from 'react-native';
import { Text } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';

import FeedComponent from '../../../components/FeedComponent';

import * as authAct from '../../../store/actions/authAction';
import * as postAct from '../../../store/actions/homeActions';

const PostClass = ({navigation, route}) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()
    const state = useSelector(state => state.home)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)

    const loadClassFeed = async () => {
        try {
            setLoading(true)
            await dispatch(postAct.postClass(route.params.classId))
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
        loadClassFeed()
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            isActive && loadClassFeed()

            Orientation.lockToPortrait()

            return () => {
                isActive = false
            }
        }, [dispatch],)
    )

    const detailPress = (postId, date_created) => {
        navigation.navigate('DetailPost', { postId, date_created })
    }

    if (isLoading) 
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
                <FlatList 
                    contentContainerStyle={{
                        paddingVertical: 15,
                    }}
                    refreshControl={<RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refreshing} onRefresh={onRefresh} />}
                    keyExtractor={itemData => itemData._id}
                    data={state.feedClass}
                    extraData={state.feedClass}
                    renderItem={itemData => <FeedComponent postScreen={true} onDetailPress={detailPress} {...itemData.item} />}
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
                            <Text style={{textAlign: 'center'}} size={12} fontWeight={{...fonts.regular}} color={colors.textPrimary}>Tidak Ada Postingan pada Kelas ini.</Text>
                        </View>
                    }
                />
            </ImageBackground>
        </View>
        </>
    )
}

export default PostClass;