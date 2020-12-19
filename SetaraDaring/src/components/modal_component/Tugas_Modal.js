import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme, Divider, TouchableRipple, Card } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { Transition, Transitioning } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Moment from 'moment';

import * as tugasAct from '../../store/actions/tugasAction';
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
        colors, 
        fonts, 
        nama, 
        tugas,
        onItemPress,
        onDismiss
    }) => {

    const onPress = () => {
        if (status_modul === 'locked') {
            onDismiss('tugas')
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
                        <Icon name={currentIndex === index ? 'chevron-up-circle' : 'chevron-down-circle'} size={16} color={colors.bgPrimary} />
                    </View>
                </View>
            </TouchableRipple>

            {
                currentIndex === index && 
                <FlatList 
                    keyExtractor={item => item._id}
                    data={tugas}
                    contentContainerStyle={{
                        flexDirection: 'column',
                    }}
                    renderItem={(data) => (
                        <>
                        <TouchableRipple
                            onPress={() => onItemPress(data.item._id, data.item.nama, data.item.date_created)}
                            rippleColor="rgba(0, 208, 255, .20)"
                        >
                            <View style={{
                                paddingLeft: 40,
                                paddingVertical: 5,
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
                                            {data.item.nama}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{
                                    flex: 1,
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    <Icon name={'chevron-right'} size={18} color={colors.bgPrimary} />
                                </View>
                            </View>
                        </TouchableRipple>
                        {data.index === (tugas.length - 1) ? null : <Divider />}
                    </>
                    )}
                />
            }

            <Divider />
        </View>
    )
}

const Tugas_Modal = ({visible, onDismiss, id, onItemPress}) => {
    const { colors, fonts } = useTheme()
    const tugasState = useSelector(state => state.tugas)
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [cAccIndex, setcAccIndex] = useState(null)
    const AcordionRef = useRef()
    
    useEffect(
        useCallback(() => {
            let isActive = true

            const loadData = async id => {
                try {
                    if (isActive) {
                        setLoading(true)
                        await dispatch(tugasAct.loadListTugas(id))
                        setLoading(false)
                    }
                } catch (error) {
                    if (isActive) {
                        setLoading(false)
                        onDismiss('tugas')
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
            }

            if (visible && isActive) loadData(id)

            return () => {
                isActive = false
            }
        }, [visible, dispatch, tugasState])
    , [visible])

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => onDismiss('tugas')}
            style={{
                justifyContent: 'flex-end',
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
                        <TouchableOpacity onPress={() => onDismiss('tugas')}>
                            <Icon name='close' size={16} color={colors.textWhite} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={15} fontWeight={fonts.bold} color={colors.textWhite}>PENUGASAN</Text>
                    <Text size={11} fontWeight={fonts.regular} color={colors.textWhite}>Daftar tugas yang tersedia di setiap modul.</Text>
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
                        ( tugasState.listTugas.length > 0 ? 
                            <Transitioning.View
                                ref={AcordionRef}
                                transition={transition}
                                style={{flex: 1, }}
                            >
                            <FlatList 
                                data={tugasState.listTugas.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                extraData={tugasState.listTugas.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
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
                    backgroundColor: colors.bgSecondary
                }}>
                    <Btn 
                        title='TUTUP' 
                        mode='text'
                        style={{
                            width: '100%'
                        }} 
                        fontColor={colors.textWhite} 
                        fontSize={14} 
                        onPress={() => onDismiss('tugas')}
                    />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default Tugas_Modal;