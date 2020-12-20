import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StatusBar, FlatList, View, Dimensions, Image, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { useTheme } from 'react-native-paper';
import Orientation from 'react-native-orientation-locker';
import moment from 'moment/min/moment-with-locales';
import Toast from 'react-native-toast-message';
moment.locale('id')

import NotifComponent from '../../../components/NotifComponent';

import * as authAct from '../../../store/actions/authAction';
import * as notifAct from '../../../store/actions/notifActions';

const NotifClass = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()

    const [refreshing, setRefresh] = useState(false)

    const { notif } = useSelector(state =>  state.notif)
    const data = notif.filter(item => item.category === 3 || item.category === 4).map(item => item)

    useEffect(() => {
        Orientation.lockToPortrait()
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
                extraData={notif}
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


export default NotifClass;