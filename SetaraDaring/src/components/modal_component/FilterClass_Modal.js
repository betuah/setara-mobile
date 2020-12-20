import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList, TouchableOpacity, useWindowDimensions, View, KeyboardAvoidingView } from 'react-native';
import Modal from 'react-native-modal';
import { Divider, Portal, TouchableRipple, useTheme } from 'react-native-paper';
import { Text, Input } from '../common/UtilsComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

import * as classAct from '../../store/actions/classAction';

const ListClass = ({data, fonts, colors, onPress}) => {
    return (
        <>
        <TouchableRipple
            onPress={() => onPress(data.id_kelas, data.nama)}
            rippleColor="rgba(0, 0, 0, .32)"
        >
            <View style={{
                paddingVertical: 10,
                paddingHorizontal: 20,
                flexDirection: 'row',
            }}>
                <View style={{
                    flex: 50,
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}>
                    <Text 
                        fontWeight={{...fonts.medium}} 
                        color={colors.textPrimary} 
                        size={12}
                    >
                        {data.nama}
                    </Text>
                </View>
                <View style={{
                    flexGrow: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                }}>
                    <Icon name='chevron-forward' color={colors.bgPrimary} />
                </View>
            </View>
        </TouchableRipple>
        <Divider style={{height: 0.8}} />
        </>
    )
}

const FilterClass = props => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()
    const state = useSelector(state => state.class)
    const [ search, setSearch ] = useState('')
    const onSearch = value => {
        setSearch(value)
    }

    const loadClass = async () => {
        try {
            await dispatch(classAct.initData())
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
            props.onDismiss()
        }
    }

    const fetchKelas = useCallback(() => {
        let isActive = true
        if (isActive) loadClass()
        return () => {
            isActive = false
        }
    }, [dispatch])

    useEffect(() => {
        if (props.visible) fetchKelas()
    }, [props.visible])

    const InputDefaultStyle = {
        selectionColor: colors.bgPrimary,
        underlineColor: colors.bgPrimary,
        fontSize: 12,
        IconColor: colors.bgPrimary,
        IconSize: 18,
        theme: {
            colors: { 
                text: colors.bgPrimary,
                placeholder: colors.bgPrimary,
                error: colors.accent,
                primary: colors.bgPrimary
            },
        }
    }

    return (
        <Portal>
            <Modal 
                isVisible={props.visible}
                onBackdropPress={() => props.onDismiss()}
                onSwipeComplete={() => props.onDismiss()}
                swipeDirection={['down']}
                propagateSwipe={true}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0,
                    width: '100%'
                }}
            >
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    maxHeight: useWindowDimensions().height * 0.55,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',                    
                        paddingVertical: 5,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                    }}>
                        <Divider 
                            style={{
                                borderRadius: 10,
                                marginTop: 5,
                                marginBottom: 5,
                                height: 3,
                                width: 50,
                                backgroundColor: colors.textLightAccent,
                            }}
                        />
                        <View
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 10,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                padding: 15,
                                zIndex: 100,
                            }}
                        >
                            <TouchableOpacity onPress={() => props.onDismiss()} activeOpacity={0.6}>
                                <Icon name='close' size={20} color={colors.textWhite} />
                            </TouchableOpacity>
                        </View>
                        <Text size={15} fontWeight={fonts.bold} color={colors.textWhite}>POSTING KELAS</Text>
                        <Text size={11} fontWeight={fonts.regular} color={colors.textWhite}>Filter posting berdasarkan kelas.</Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior={Platform.OS == "ios" ? "padding" : "height"}
                    >
                        <View style={{
                            paddingLeft: 18,
                            paddingRight: 23,
                            paddingBottom: 15,
                            backgroundColor: colors.bgWhite,
                            flexDirection: 'row',
                            elevation: 2,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            borderTopLeftRadius: 15,
                            borderTopRightRadius: 15,
                        }}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Icon name='filter' size={20} color={colors.bgPrimary} />
                            </View>
                            <View style={{flex: 10, justifyContent: 'center'}}>
                                <Input
                                    label="Filter Kelas"
                                    placeholder="Masukan nama kelas"
                                    value={search}
                                    color={colors.accent}
                                    defaultStyle={InputDefaultStyle}
                                    onChangeText={e => onSearch(e)}
                                />
                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <FlatList 
                        style={{
                            paddingBottom: 20,
                            backgroundColor: colors.bgWhite,
                        }}
                        keyExtractor={item => item.id_kelas}
                        data={
                            state.listClass.filter(item => {
                                return item.nama.toLowerCase().includes(search.toLowerCase())
                            })
                        }
                        extraData={state}
                        renderItem={itemData => <ListClass data={itemData.item} fonts={fonts} colors={colors} onPress={props.onPress} />}
                        ListEmptyComponent={() => 
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginVertical: 20,
                            }}>
                                <LottieView 
                                    source={require('../../assets/lottie/33279-stack-of-books.json')} 
                                    loop={false}
                                    autoPlay
                                    style={{
                                        width: '30%',
                                        alignItems: 'center',
                                    }}
                                />
                                <Text style={{textAlign: 'center'}} fontWeight={fonts.medium} size={12} color={colors.textPrimary}>Daftar Kelas tidak tersedia.</Text>
                            </View>
                        }
                    />
                </View>
            </Modal>
        </Portal>
    )
}

export default FilterClass;