import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, TouchableOpacity, Image, FlatList, } from 'react-native';
import { useTheme, Divider, TouchableRipple, Chip, Card } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { Transition, Transitioning } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Moment from 'moment';

import * as materiAct from '../../store/actions/materiAction';
import * as authAct from '../../store/actions/authAction';

const transition = (
    <Transition.Sequence>
        <Transition.In type='fade' durationMs={300} />
    </Transition.Sequence>
)

const ListAcordition = ({
        refer,
        currentIndex, 
        index,
        onAccordionPress,
        nilai_akhir_modul, 
        status_modul ,
        userRole, 
        colors, 
        fonts, 
        nama, 
        materi,
        onItemPress,
        onDismiss
    }) => {

    const onPress = () => {
        if (status_modul === 'locked') {
            onDismiss('materi')
            Toast.show({
                type: 'info',
                text1: 'Modul Pelajaran Di Kunci.',
                text2: 'Kamu harus mengerjakan dahulu modul sebelum nya.'
            });
        }
        refer.current.animateNextTransition()
        onAccordionPress(() => index === currentIndex || status_modul === 'locked' ? null : index)
    }

    return (
        <View style={{
            flexGrow: 1,
            flexDirection: 'column',
        }}>
            <TouchableRipple
                onPress={() => onPress()}
                rippleColor="rgba(0, 208, 255, .20)"
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 13,
                    paddingVertical: 10,
                }}>
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Icon 
                            name={status_modul === 'locked' ? 'lock' : 'lock-open-variant'} 
                            size={20} 
                            color={status_modul === 'locked' ? colors.bgLock : colors.bgPrimary} />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        flex: 13,
                        marginLeft: 10,
                    }}>
                        <View>
                            <Text
                                size={13}
                                color={colors.textPrimary}
                                fontWeight={{...fonts.semiBold}}
                            >
                                {nama.trim()}
                            </Text>
                        </View>
                        <View style={{
                            flexDirection: 'row'
                        }}>
                            <Text
                                size={11}
                                color={colors.textDark}
                                fontWeight={{...fonts.regular}}
                            >
                                {`Nilai Akhir Modul : `}
                            </Text>
                            <Text
                                size={11}
                                color={colors.textSecondary}
                                fontWeight={{...fonts.semiBold}}
                            >
                                {nilai_akhir_modul}
                            </Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                    }}>
                        {/* <Animated.View style={{
                            transform: [
                                { rotate: transRotate },
                            ]
                        }}> */}
                            <Icon name={currentIndex === index ? 'chevron-up-circle' : 'chevron-down-circle'} size={16} color={colors.bgPrimary} />
                        {/* </Animated.View> */}
                    </View>
                </View>
            </TouchableRipple>

            {
                currentIndex === index && 
                <FlatList 
                    data={materi}
                    contentContainerStyle={{
                        flexDirection: 'column',
                    }}
                    renderItem={(data) => {
                        if (userRole === 'siswa' && data.item.status === 'draft') {
                            return null
                        } else {
                            return (
                            <>
                                <TouchableRipple
                                    onPress={() => onItemPress(data.item.id, data.item.judul, data.item.date_created)}
                                    rippleColor="rgba(0, 208, 255, .20)"
                                >
                                    <View style={{
                                        paddingLeft: 40,
                                        paddingVertical: 8,
                                        paddingRight: 10,
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                        }}>
                                            <Icon name={'bookmark-check'} size={16} color={colors.bgPrimary} />
                                        </View>
                                        <View style={{
                                            flexDirection: 'column',
                                            flex: 13,
                                            marginLeft: 5,
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                        }}>
                                            <View>
                                                <Text
                                                    size={12}
                                                    color={colors.textPrimary}
                                                    fontWeight={{...fonts.medium}}
                                                >
                                                    {data.item.judul}
                                                </Text>
                                            </View>
                                        </View>
                                        { data.item.status === 'draft' &&
                                            <Chip 
                                                style={{backgroundColor: colors.bgPrimary, alignItems: 'flex-end',}}
                                                textStyle={{color: colors.textWhite}}
                                            >
                                                Draft
                                            </Chip>
                                        }
                                        <View style={{
                                            flex: 1,
                                            alignItems: 'flex-end',
                                            justifyContent: 'center'
                                        }}>
                                            <Icon name={'chevron-right'} size={18} color={colors.bgPrimary} />
                                        </View>
                                    </View>
                                </TouchableRipple>
                                {data.index === (materi.length - 1) ? null : <Divider />}
                            </>)
                        }
                    }}
                />
            }

            <Divider />
        </View>
    )
}

const MateriMapel_Modal = ({visible, onDismiss, id, onItemPress}) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()
    const insets = useSafeAreaInsets();

    const AcordionRef = useRef()

    const materiState = useSelector(state => state.materi)
    const authState = useSelector(state => state.auth)
    
    const [isLoading, setLoading] = useState(false)
    const [cAccIndex, setcAccIndex] = useState(null)
        
    useEffect(
        useCallback(() => {
            let isActive = true

            if (visible) loadData(id)

            return () => {
                isActive = false
            }
        }, [visible, dispatch, materiState])
    , [visible])

    const loadData = async id => {
        setLoading(true)
        try {
            await dispatch(materiAct.loadListMateri(id))
            setLoading(false)
        } catch (error) {
            setLoading(false)
            onDismiss('materi')
            if (error === 'ERR_GENERATE_TOKEN') {
                dispatch(authAct.signOut(true))
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Sesi kamu telah Habis!',
                    text2: 'Silahkan masuk kembali.'
                });
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Terjadi Kesalahan!',
                    text2: error
                });
            }
        }
    }

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => onDismiss('materi')}
            style={{
                justifyContent: 'flex-end',
                // marginHorizontal: 15,
                // marginBottom: 15
                margin: 0,
            }}
        >
            <Card style={{
                height: Dimensions.get('window').height * 0.7,
                backgroundColor: colors.bgWhite,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                elevation: 3,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
            }}>
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    elevation: 2,
                }}>
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            padding: 15,
                            zIndex: 100,
                        }}
                    >
                        <TouchableOpacity onPress={() => onDismiss('materi')}>
                            <Icon name='close' size={16} color={colors.textWhite} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={15} fontWeight={fonts.bold} color={colors.textWhite}>MATERI</Text>
                    <Text size={11} fontWeight={fonts.regular} color={colors.textWhite}>Daftar materi pelajaran dalam mapel yang kamu pilih.</Text>
                </View>
                    { 
                        isLoading ? 
                            <View style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: colors.backdrop
                            }}>
                                <LottieView 
                                    source={require('../../assets/lottie/35480-app-preloader.json')} 
                                    autoPlay 
                                    style={{width: '50%'}}
                                />
                            </View>
                        :
                        ( materiState.listMateri.length > 0 ? 
                            <Transitioning.View
                                ref={AcordionRef}
                                transition={transition}
                                style={{flex: 1, }}
                            >
                            <FlatList 
                                data={materiState.listMateri.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                extraData={materiState.listMateri.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                keyExtractor={item => item._id.toString()}
                                renderItem={(data) => 
                                    <ListAcordition 
                                        {...data.item}
                                        refer={AcordionRef}
                                        currentIndex={cAccIndex}
                                        index={data.index}
                                        onAccordionPress={setcAccIndex}
                                        userRole={authState.role} 
                                        colors={colors} 
                                        fonts={fonts} 
                                        onItemPress={onItemPress}
                                        onDismiss={onDismiss}
                                    />
                                }
                            />
                            </Transitioning.View>
                            :
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <Image 
                                    source={require('../../assets/images/world_wide_web_monochromatic.png')}
                                    style={{
                                        width: 150,
                                        height: 150
                                    }}
                                    resizeMode='contain'
                                />
                                <Text style={{textAlign: 'center', marginTop: 10,}} fontWeight={fonts.regular} color={colors.textPrimary}>Modul Tidak Tersedia.</Text>
                            </View>
                        )
                    }
                <Card.Actions style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.bgSecondary,
                    paddingBottom: insets.bottom
                }}>
                    <Btn 
                        title='TUTUP' 
                        mode='text'
                        style={{
                            width: '100%'
                        }} 
                        fontColor={colors.textWhite} 
                        fontSize={14} 
                        onPress={() => onDismiss('materi')}
                    />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default MateriMapel_Modal;