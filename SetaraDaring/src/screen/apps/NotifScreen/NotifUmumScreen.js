import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, FlatList, View, Dimensions, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

import NotifComponent from '../../../components/NotifComponent';
import EmptyComponent from '../../../components/EmptyComponent';

import * as authAct from '../../../store/actions/authAction';
import * as notifAct from '../../../store/actions/notifActions';
import { useFocusEffect } from '@react-navigation/native';

const NotifUmum = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()

    const [devel, setDevel ] = useState(false)
    const [refreshing, setRefresh] = useState(false)

    const { notif } = useSelector(state =>  state.notif)
    const data = notif.filter(item => item.category === 1).map(item => item)

    useEffect(() => {
        
    }, [notif])

    const onRefresh = useCallback(() => {
        let isActive = true;

        const fetch = async () => {
            try {
                if (isActive) {
                    setRefresh(true)
                    await dispatch(notifAct.initData())
                    setRefresh(false)
                }
            } catch (error) {
                if (isActive) {
                    setRefresh(false)
                    if (error) {
                        if (error === 'ERR_GENERATE_TOKEN') {
                            dispatch(authAct.signOut(true))
                            Toast.show({
                                type: 'error',
                                text1: 'Maaf, Sesi kamu telah Habis!',
                                text2: 'Silahkan masuk kembali.'
                            });
                        }
                    }
                }
            }
        }

        fetch();

        return () => {
            isActive = false
        }

    }, [dispatch])

    if (devel) return (
        <>
        <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
        <View>
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                marginTop: Dimensions.get('window').height * 0.3,
            }}>
                <LottieView 
                        source={require('../../../assets/lottie/26383-teamwork.json')} 
                        autoPlay
                        style={{
                            width: '40%',
                            alignItems: 'center',
                        }}
                    />
                <Text style={{textAlign: 'center', marginVertical: 15,}} size={12} fontWeight={fonts.regular} color={colors.textPrimary}>Mohon Maaf Fitur Ini Sedang Dalam Pengembangan.</Text>
            </View>
        </View>
        </>
    )

    return (
        <>
        <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
        <View style={{
            flex: 1,
            backgroundColor: colors.bgWhite
        }}>
            <FlatList
                refreshControl={<RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refreshing} onRefresh={onRefresh} />}
                keyExtractor={(item, index) => item.id}
                data={data}
                extraData={data}
                renderItem={itemData => <NotifComponent data={itemData.item} />}
                ListEmptyComponent={() => (
                    <View style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 20,
                        marginTop: '30%'
                    }}>
                        <Image 
                            source={require('../../../assets/images/coach_monochromatic.png')}
                            style={{
                                width: 140,
                                height: 140
                            }}
                            resizeMode='contain'
                        />
                        <Text style={{textAlign: 'center'}} size={12} fontWeight={fonts.regular} color={colors.textPrimary}>Tidak Ada Notifikasi.</Text>
                    </View>
                )}
            />
        </View>
        </>
    )
}


export default NotifUmum;