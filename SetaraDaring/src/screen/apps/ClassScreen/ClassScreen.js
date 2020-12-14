import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {  View, Image, ImageBackground, FlatList, RefreshControl, StatusBar } from 'react-native';
import { Btn, Text } from '../../../components/common/UtilsComponent';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

import ListClass from './ListClassScreen';
import JoinClass_Modal from '../../../components/modal_component/JoinClass_Modal';
import LoadingModal from '../../../components/modal_component/Loading_Modal';

import * as classAct from '../../../store/actions/classAction';
import * as authAct from '../../../store/actions/authAction';

const ClassScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const AuthState = useSelector(state => state.auth)
    const classState = useSelector(state => state.class)
    const [ isRefresh, setRefresh ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ joinClassModal, setJoinClassModal ] = useState(false)
    const [ joinClassValue, setJoinClassInput] = useState('')
    const dispatch = useDispatch()

    const loadData = async () => {
        try {
            setRefresh(true)
            await dispatch(classAct.initData())
            setRefresh(false)
        } catch (error) {
            if (error === 'ERR_GENERATE_TOKEN') {
                dispatch(authAct.signOut(true))
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Sesi kamu telah Habis!',
                    text2: 'Silahkan masuk kembali.'
                });
            }
            setRefresh(false)
        }
    }

    useEffect(() => {
        StatusBar.setBackgroundColor('transparent');
        StatusBar.setTranslucent;
        StatusBar.setBarStyle("light-content");
        
        navigation.setOptions({
            tabBarVisible:false
        })
    }, [])

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

    const fetchKelas = useCallback(() => {
        let isActive = true
        if (isActive) loadData()
        return () => {
            isActive = false
        }
    }, [dispatch])

    const onClassPress = async data => {
        try {
            setLoading(true)
            await dispatch(classAct.detailKelas(data.id_kelas))
            navigation.navigate('DetailKelas')
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
            Toast.show({
                type: 'error',
                text1: 'Maaf, Terjadi Kesalahan!',
                text2: error
            });
            setLoading(false)
        }
    }

    const onClassLongPress = data => {
        console.log('asd')
    }

    const showModal = () => setJoinClassModal(true)

    const hideModal = () => setJoinClassModal(false)

    const onInputChange = value => setJoinClassInput(value)

    const joinClass = async () => {
        try {
            setLoading(true)
            setJoinClassModal(false)
            await dispatch(classAct.joinClass(joinClassValue))
            setLoading(false)
            setJoinClassInput('')
            Toast.show({
                type: 'success',
                text1: 'Sukses!',
                text2: 'Berhasil gabung kelas.'
            })
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Maaf, Gagal Bergabung kelas!',
                text2: error
            })
            setJoinClassInput('')
            setJoinClassModal(false)
            setLoading(false)
        }
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <StatusBar barStyle='light-content' translucent backgroundColor='transparent' />
            <JoinClass_Modal 
                visible={joinClassModal} 
                onDismiss={hideModal} 
                onChange={onInputChange} 
                onSubmit={joinClass} 
                value={joinClassValue} 
            />

            <LoadingModal visible={isLoading} />

            <View style={{
                flex: 3,
                backgroundColor: colors.bgPrimary,
                elevation: 4,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            }}>
                <ImageBackground 
                    source={require('../../../assets/images/header/bg-header.png')}
                    style={{width:"100%",height:"100%"}}
                    resizeMode="cover"
                >
                    <SafeAreaView style={{
                        flex: 1,
                    }}>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                paddingHorizontal: 15,
                                paddingVertical: 30,
                            }}>
                                <View style={{
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <Image 
                                            style={{
                                                width: 50,
                                                height: 50,
                                                borderWidth: 2,
                                                borderRadius: 50,
                                                borderColor: colors.bgWhite
                                            }}
                                            source={{ uri: AuthState.foto }}   
                                        />
                                    </View>
                                    <View style={{
                                        paddingLeft: 10,
                                        alignItems: 'flex-start',
                                        justifyContent: 'center'
                                    }}>
                                        <Text fontWeight={fonts.semiBold} size={14} color={colors.textWhite}>{`Hi, ${AuthState.fullName}`}</Text>
                                        <Text fontWeight={fonts.italic} size={12} color={colors.textWhite}>{AuthState.status}</Text>
                                    </View>
                                </View>
                                <View style={{
                                    marginTop: 20,
                                    justifyContent: 'flex-end',
                                }}>
                                    <Btn 
                                        onPress={() => showModal()}
                                        Icon={{
                                            name: 'school',
                                            color: colors.bgWhite,
                                            size: 15
                                        }}
                                        IconType='ionic'
                                        title='Gabung Kelas'
                                        color={colors.bgPrimary}
                                        fontColor={colors.bgWhite}
                                        fontSize={12}
                                        fontWeight={fonts.semiBold}
                                        style={{
                                            elevation: 3,
                                            shadowOffset: { width: 0, height: 3 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 3,
                                            borderRadius: 80,
                                            borderWidth: 2,
                                            borderColor: colors.textWhite
                                        }}
                                    />
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                paddingBottom: 10
                            }}>
                                <LottieView 
                                    source={require('../../../assets/lottie/30884-online-tutorials-online-work.json')} 
                                    autoPlay
                                    style={{width: '100%'}}
                                />
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
            <View style={{
                flex: 7,
                backgroundColor: colors.bgWhite,
            }}>
                <View style={{
                    paddingTop: 10,
                    alignItems: 'center',
                    backgroundColor: colors.bgPrimary,
                    borderColor: colors.textWhite,
                    borderBottomWidth: 2
                }}>
                    <Text color={colors.textWhite} fontWeight={fonts.semiBold} size={16}>DAFTAR KELAS</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.bgAccent,
                    }}
                >
                    <FlatList 
                        contentContainerStyle={{paddingVertical: 10,}}
                        refreshControl={<RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={isRefresh} onRefresh={fetchKelas} />}
                        keyExtractor={(item, index) => item.id_kelas}
                        data={classState.listClass}
                        extraData={classState}
                        renderItem={itemData => <ListClass onPress={onClassPress} onLongPress={onClassLongPress} data={itemData.item} />}
                        ListEmptyComponent={() => 
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
                                        width: 150,
                                        height: 150
                                    }}
                                    resizeMode='contain'
                                />
                                <Text style={{textAlign: 'center', marginTop: 10,}} fontWeight={fonts.regular} color={colors.textPrimary}>Kamu belum bergabung di kelas.</Text>
                            </View>
                        }
                    />
                </View>
            </View>
        </View>
    )
}

export default ClassScreen;