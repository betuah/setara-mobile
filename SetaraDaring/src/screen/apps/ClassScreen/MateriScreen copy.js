import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, ScrollView, useWindowDimensions, RefreshControl } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import HTML from 'react-native-render-html';

import * as materiAct from '../../../store/actions/materiAction';
import * as authAct from '../../../store/actions/authAction';

const MateriScreen = ({ navigation, route }) => {
    const { fonts, colors } = useTheme()
    const dispatch = useDispatch()
    const materiState = useSelector(state => state.materi)
    const [ detailMateri, setDetailMateri ] = useState(null)
    const [ refresh, setRefresh ] = useState(false)
    const [ error, setError ] = useState(false)

    const loadData = async () => {
        try {
            console.log('start')
            await dispatch(materiAct.getDetailMateri(route.params.id))
            console.log('end')
            // setRefresh(false)
        } catch (error) {
            if (error === 'ERR_GENERATE_TOKEN') {
                dispatch(authAct.signOut(true))
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Sesi kamu telah Habis!',
                    text2: 'Silahkan masuk kembali.'
                });
            }
            console.log(error)
            // setRefresh(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            if (isActive) loadData()
            return () => {
                isActive = false
            }
        }, [dispatch])
    )

    const onRefresh = () => {
        detailMateri(null)
    }

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

    if (detailMateri === null) 
        return (
            <View 
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <LottieView 
                    source={require('../../../assets/lottie/28893-book-loading.json')} 
                    autoPlay
                    style={{width: '50%'}}
                />
                <View style={{width: useWindowDimensions().width * 0.7, marginTop: 10,}}>
                    <Text 
                        fontWeight={{...fonts.regular}} 
                        color={colors.textSecondary} 
                        style={{textAlign: 'center'}} 
                        size={14}
                    >
                        Mohon tunggu sebentar ya. Bahan Belajar kamu sedang dipersiapkan.
                    </Text>
                </View>
            </View>
        )

    return (
        <ScrollView
            refreshControl={
                <RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={refresh} onRefresh={onRefresh} />
            }
        >
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.bgWhite
            }}>
                <Text color={colors.accent}>Fidian Nisa</Text>
                
            </View>
        </ScrollView>
        
    )
}

export default MateriScreen