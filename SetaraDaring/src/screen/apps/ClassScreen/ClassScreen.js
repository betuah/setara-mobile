import React, { useCallback, useEffect, useState } from 'react';
import {  View, Image, ImageBackground, FlatList, RefreshControl } from 'react-native';
import { Btn, Text } from '../../../components/common/UtilsComponent';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

import ListClass from './ListClassScreen';
import JoinClass_Modal from '../../../components/modal_component/JoinClass_Modal';
import * as classAct from '../../../store/actions/classAction';
import { useFocusEffect } from '@react-navigation/native';

const ClassScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const AuthState = useSelector(state => state.auth)
    const classState = useSelector(state => state.class)
    const [ isRefresh, setRefresh] = useState(false)
    const [ joinClassModal, setJoinClassModal ] = useState(false)
    const [ joinClassValue, setJoinClassInput] = useState('')
    const dispatch = useDispatch()

    const loadData = async () => {
        try {
            setRefresh(true)
            await dispatch(classAct.initData())
            setRefresh(false)
        } catch (error) {
            alert(error)
            setRefresh(false)
        }
    }

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible:false
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            let isActive = true
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
            await dispatch(classAct.detailKelas('testing', data))
            navigation.navigate('DetailKelas')
        } catch (error) {
            alert(error)
        }
    }

    const onClassLongPress = data => {
        console.log('asd')
    }

    const showModal = () => setJoinClassModal(true)

    const hideModal = () => setJoinClassModal(false)

    const onInputChange = value => setJoinClassInput(value)

    const joinClass = () => {
        setJoinClassModal(false)
        console.log(joinClassValue)
    }

    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
        }}>
            <JoinClass_Modal 
                visible={joinClassModal} 
                onDismiss={hideModal} 
                onChange={onInputChange} 
                onSubmit={joinClass} 
                value={joinClassValue} 
            />

            <View style={{
                flex: 3,
                backgroundColor: colors.bgPrimary,
                elevation: 8,
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.5,
                shadowRadius: 6,
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
                                paddingHorizontal: 10,
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
                                                width: 60,
                                                height: 60,
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
                                        <Text fontWeight={fonts.semiBold} size={16} color={colors.textWhite}>{`Hi, ${AuthState.fullName}`}</Text>
                                        <Text fontWeight={fonts.italic} size={14} color={colors.textWhite}>{AuthState.status}</Text>
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
                                            color: colors.white,
                                            size: 15
                                        }}
                                        IconType='ionic'
                                        title='Gabung Kelas'
                                        color={colors.bgPrimary}
                                        fontColor={colors.white}
                                        fontSize={14}
                                        fontWeight={fonts.semiBold}
                                        style={{
                                            elevation: 4,
                                            shadowOffset: { width: 0, height: 4 },
                                            shadowOpacity: 0.5,
                                            shadowRadius: 4,
                                            borderRadius: 80,
                                            borderWidth: 3,
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
                    <Text color={colors.textWhite} fontWeight={fonts.semiBold} size={20}>DAFTAR KELAS</Text>
                </View>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: colors.bgAccent,
                    }}
                >
                    <FlatList 
                        style={{paddingVertical: 10}}
                        refreshControl={<RefreshControl colors={[`${colors.bgPrimary}`]} refreshing={isRefresh} onRefresh={fetchKelas} />}
                        keyExtractor={(item, index) => item.id_kelas}
                        data={classState.listClass}
                        extraData={classState}
                        renderItem={itemData => <ListClass onPress={onClassPress} onLongPress={onClassLongPress} data={itemData.item} />}
                    />
                </View>
            </View>
        </View>
    )
}

export default ClassScreen;