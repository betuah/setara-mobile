import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList, View, Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

import NotifComponent from '../../../components/NotifComponent';
import EmptyComponent from '../../../components/EmptyComponent';

import * as authAct from '../../../store/actions/authAction';
import * as notifActions from '../../../store/actions/notifActions';

const NotifUmum = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()
    const [devel, setDevel ] = useState(false)

    const { notif } = useSelector(state =>  state.notif)
    const data = notif.filter(item => item.category === 1).map(item => item)

    useEffect(() => {
        
    }, [notif])

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
                keyExtractor={(item, index) => item.id}
                data={data}
                extraData={data}
                renderItem={itemData => <NotifComponent data={itemData.item} />}
                ListEmptyComponent={() => (
                    <EmptyComponent />
                )}
            />
        </View>
        </>
    )
}


export default NotifUmum;