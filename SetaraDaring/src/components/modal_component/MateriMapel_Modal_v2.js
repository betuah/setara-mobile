import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, TouchableOpacity, Image, FlatList, Animated, Easing  } from 'react-native';
import { useTheme, List, Divider, TouchableRipple, Chip, Card } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { Transition, Transitioning, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Moment from 'moment';

import * as materiAct from '../../store/actions/materiAction';
import * as authAct from '../../store/actions/authAction';
import { useFocusEffect } from '@react-navigation/native';

const transition = (
    <Transition.Sequence>
        <Transition.In type='fade' durationMs={300} />
        <Transition.Out type='fade' durationMs={100} />
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
        onItemPress 
    }) => {

    const rotations = new Animated.Value(index === currentIndex && status_modul === 'unlocked' ? 1 : 0);
    const transRotate = rotations.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"]
    })

    rotations.addListener((value) => console.log(value))

    useFocusEffect(
        useCallback(() => {
            console.log(rotations._value, index === currentIndex && status_modul === 'unlocked' ? true : false)
            // if (index === currentIndex && status_modul === 'unlocked') {
                Animated.timing(
                    rotations, 
                    {
                        toValue: rotations._value ? 0 : 1,
                        duration: 500,
                        easing: Easing.linear,
                        useNativeDriver: true
                    }
                ).start()
            // }
        }, [currentIndex])
    )

    const onPress = () => {
        refer.current.animateNextTransition()
        onAccordionPress(() => index === currentIndex && status_modul === 'unlocked' ? null : index)
    }

    return (
        <View style={{
            flexGrow: 1,
            flexDirection: 'column',
        }}>
            {console.log('kerender ulang')}
            <TouchableRipple
                onPress={() => onPress()}
                rippleColor="rgba(0, 208, 255, .20)"
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}>
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Icon 
                            name={status_modul === 'locked' ? 'lock' : 'lock-open-variant'} 
                            size={23} 
                            color={status_modul === 'locked' ? colors.bgLock : colors.bgPrimary} />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        flex: 13,
                        marginLeft: 10,
                    }}>
                        <View>
                            <Text
                                size={14}
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
                                size={12}
                                color={colors.textDark}
                                fontWeight={{...fonts.regular}}
                            >
                                {`Nilai Akhir Modul : `}
                            </Text>
                            <Text
                                size={12}
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
                        <Animated.View style={{
                            transform: [
                                { rotate: transRotate },
                            ]
                        }}>
                            <Icon name={'chevron-down-circle'} size={20} color={colors.bgPrimary} />
                        </Animated.View>
                    </View>
                </View>
            </TouchableRipple>

            {
                currentIndex === index && 
                <FlatList 
                    data={materi}
                    style={{
                        paddingLeft: 40,
                    }}
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
                                    onPress={() => onItemPress(data.item.id, data.item.judul)}
                                    rippleColor="rgba(0, 208, 255, .20)"
                                >
                                    <View style={{
                                        paddingVertical: 5,
                                        paddingRight: 10,
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                        }}>
                                            <Icon name={'bookmark-check'} size={18} color={colors.bgPrimary} />
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
                                                    size={13}
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
    const materiState = useSelector(state => state.materi)
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [cAccIndex, setcAccIndex] = useState(null)
    const AcordionRef = useRef()
    
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
                marginHorizontal: 15,
                marginBottom: 15
            }}
        >
            <Card style={{
                height: Dimensions.get('window').height * 0.8,
                backgroundColor: colors.bgWhite,
                borderRadius: 10,
                elevation: 3,
            }}>
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
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
                            <Icon name='close' size={20} color={colors.textLight} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={18} fontWeight={fonts.bold} color={colors.textWhite}>MATERI</Text>
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
                    alignItems: 'center'
                }}>
                    <Btn mode='text' title='TUTUP' onPress={() => onDismiss('materi')} />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default MateriMapel_Modal;








import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, TouchableOpacity, Image, FlatList, Animated, Easing  } from 'react-native';
import { useTheme, List, Divider, TouchableRipple, Chip, Card } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { Transition, Transitioning, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Moment from 'moment';

import * as materiAct from '../../store/actions/materiAction';
import * as authAct from '../../store/actions/authAction';

const transition = (
    <Transition.Sequence>
        <Transition.In type='fade' durationMs={200} />
        {/* <Transition.Out type='fade' durationMs={1} /> */}
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
        onItemPress 
    }) => {

    const [ea, setea] = useState('ea')

    const rotations = new Animated.Value(0);

    const transRotate = rotations.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"]
    })

    

    const onPress = () => {
        setea('oa')
        rotations.addListener((value) => console.log(value))
        console.log(rotations._value)
        refer.current.animateNextTransition()
        onAccordionPress(index === currentIndex || status_modul === 'locked' ? null : index)
        if (rotations._value) {
            console.log('haha')
            Animated.timing(
                rotations, 
                {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start()
        } else {
            console.log('huhu')
            Animated.timing(
                rotations, 
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start()
        }
    }

    return (
        <View style={{
            flexGrow: 1,
            flexDirection: 'column'
        }}>
            <TouchableRipple
                onPress={() => onPress()}
                rippleColor="rgba(0, 208, 255, .20)"
            >
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                }}>
                    <View style={{
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Icon name={status_modul === 'locked' ? 'lock' : 'lock-open-variant'} size={23} color={colors.bgPrimary} />
                    </View>
                    <View style={{
                        flexDirection: 'column',
                        flex: 13,
                        marginLeft: 10,
                    }}>
                        <View>
                            <Text
                                size={14}
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
                                size={12}
                                color={colors.textDark}
                                fontWeight={{...fonts.regular}}
                            >
                                {`Nilai Akhir Modul : `}
                            </Text>
                            <Text
                                size={12}
                                color={colors.textSecondary}
                                fontWeight={{...fonts.semiBold}}
                            >
                                {nilai_akhir_modul}
                            </Text>
                        </View>
                    </View>
                    <Animated.View style={{
                        flexGrow: 1,
                        alignItems: 'flex-end',
                        justifyContent: 'center',
                        transform: [
                            { rotate: transRotate },
                        ]
                    }}>
                        <Icon name={'chevron-down-circle'} size={20} color={colors.bgPrimary} />
                    </Animated.View>
                </View>
            </TouchableRipple>

            {
                currentIndex === index && 
                <FlatList 
                    data={materi}
                    style={{
                        paddingLeft: 40,
                    }}
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
                                    onPress={() => onItemPress(data.item.id, data.item.judul)}
                                    rippleColor="rgba(0, 208, 255, .20)"
                                >
                                    <View style={{
                                        paddingVertical: 5,
                                        paddingRight: 10,
                                        flexDirection: 'row',
                                    }}>
                                        <View style={{
                                            alignItems: 'flex-start',
                                            justifyContent: 'center',
                                        }}>
                                            <Icon name={'bookmark-check'} size={18} color={colors.bgPrimary} />
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
                                                    size={13}
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
    const materiState = useSelector(state => state.materi)
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [cAccIndex, setcAccIndex] = useState(null)
    const AcordionRef = useRef()

    const [rotate, setRotate] = useState(0)

    const rotation = new Animated.Value(rotate);

    const a = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "180deg"]
    })

    rotation.addListener((value) => console.log(value))

    const onAnimate = () => {
        
        if (rotation._value) {
            // setRotate(0)
            Animated.timing(
                rotation, 
                {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start()
        } else {
            // setRotate(1)
            Animated.timing(
                rotation, 
                {
                    toValue: 1,
                    duration: 1000,
                    easing: Easing.linear,
                    useNativeDriver: true
                }
            ).start()
        }
        
    }

    const onPressIn = () => {
        // setRotate(1)
        Animated.timing(
            rotation, 
            {
                toValue: 0,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start()
    }

    
    
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
                marginHorizontal: 15,
                marginBottom: 15
            }}
        >
            <Card style={{
                height: Dimensions.get('window').height * 0.8,
                backgroundColor: colors.bgWhite,
                borderRadius: 10,
                elevation: 3,
            }}>
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
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
                            <Icon name='close' size={20} color={colors.textLight} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={18} fontWeight={fonts.bold} color={colors.textWhite}>MATERI</Text>
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
                                style={{flex: 1}}
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
                <TouchableRipple 
                    onPressIn={() => {
                        Animated.timing(
                            rotation, 
                            {
                                toValue: 1,
                                duration: 1000,
                                easing: Easing.linear,
                                useNativeDriver: true
                            }
                        ).start()
                    }}

                    onPressIn={() => {
                        Animated.timing(
                            rotation, 
                            {
                                toValue: 0,
                                duration: 1000,
                                easing: Easing.linear,
                                useNativeDriver: true
                            }
                        ).start()
                    }}
                >
                <Animated.View style={{
                    borderWidth: 2,
                    borderRadius: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 30,
                    width: 40,
                    transform: [
                        { rotate: a },
                    ]
                }}>
                    <Icon size={20} name='lock' />
                </Animated.View>
                </TouchableRipple>
                <Btn mode='text' title='TOGLE' onPress={() => onAnimate()} />
                <Btn mode='text' title='TOGLE 2' onPress={() => onPressIn()} />
                <Card.Actions style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Btn mode='text' title='TUTUP' onPress={() => onDismiss('materi')} />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default MateriMapel_Modal;

import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme, List, Divider, TouchableRipple, Chip, Card } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { Transition, Transitioning } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Moment from 'moment';

import * as materiAct from '../../store/actions/materiAction';
import * as authAct from '../../store/actions/authAction';

const transition = (
    <Transition.Together>
        <Transition.In type='fade' durationMs={200} />
        <Transition.Out type='fade' durationMs={200} />
    </Transition.Together>
)

const ListAcordition = ({
        ref,
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
        onItemPress 
    }) => {

    return (
        <>
        <Transition.View
            ref={ref}
            transition={transition}
        >
        </Transition.View>
            <List.Accordion
                expanded={currentIndex === index && true}
                onPress={() => onAccordionPress(index === currentIndex || status_modul === 'locked' ? null : index)}
                title={nama}
                titleNumberOfLines={3}
                titleStyle={{
                    ...fonts.semiBold, 
                    justifyContent: 'center',
                    color: colors.textPrimary,
                    fontSize: 14,
                    marginLeft: 0,
                }}
                description={`Nilai Akhir Modul : ${nilai_akhir_modul}`}
                descriptionStyle={{
                    ...fonts.regular, 
                    justifyContent: 'center',
                    color: colors.textSecondary,
                    fontSize: 12,
                }}
                left={props => 
                    <List.Icon 
                        {...props}
                        icon={status_modul === 'locked' ? "lock" : "lock-open"}
                        color={status_modul === 'locked' ? colors.bgLock : colors.bgPrimary}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 0,
                            marginHorizontal: 0,
                        }} 
                    />
                }
            >
                <FlatList 
                    data={materi}
                    style={{
                        paddingLeft: 30,
                    }}
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
                                onPress={() => onItemPress(data.item.id, data.item.judul)}
                                rippleColor="rgba(0, 208, 255, .20)"
                            >
                                <View style={{
                                    flexDirection: 'row',
                                    paddingVertical: 10,
                                    paddingRight: 20
                                }}>
                                    <View style={{
                                        flex: 1,
                                        justifyContent: 'center',
                                        alignItems: 'flex-start'
                                    }}>
                                        <Icon name='bookmark' size={16} color={colors.textPrimary} />
                                    </View>
                                    <View style={{
                                        flex: 10,
                                        justifyContent: 'center',
                                    }}>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            color={colors.textPrimary}
                                            size={13}
                                        >
                                            {data.item.judul}
                                        </Text>
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
                                        justifyContent: 'center',
                                        alignItems: 'flex-end'
                                    }}>
                                        <Icon name='chevron-forward' size={16} color={colors.textPrimary} />
                                    </View>
                                </View>
                            </TouchableRipple>
                            {data.index === (materi.length - 1) ? null : <Divider />}
                        </> )
                    }
                    }}
                />
            </List.Accordion>
        
        <Divider />
        </>
    )
}

const MateriMapel_Modal = ({visible, onDismiss, id, onItemPress}) => {
    const { colors, fonts } = useTheme()
    const materiState = useSelector(state => state.materi)
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [cAccIndex, setcAccIndex] = useState(null)
    const AcordionRef = useRef()
    
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
                marginHorizontal: 15,
                marginBottom: 15
            }}
        >
            <Card style={{
                height: Dimensions.get('window').height * 0.8,
                backgroundColor: colors.bgWhite,
                borderRadius: 10,
                elevation: 3,
            }}>
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
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
                            <Icon name='close' size={20} color={colors.textLight} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={18} fontWeight={fonts.bold} color={colors.textWhite}>MATERI</Text>
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
                            <FlatList 
                                data={materiState.listMateri.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                extraData={materiState.listMateri.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                keyExtractor={item => item._id.toString()}
                                renderItem={(data) => 
                                    <ListAcordition 
                                        ref={AcordionRef}
                                        {...data.item}
                                        currentIndex={cAccIndex}
                                        index={data.index}
                                        onAccordionPress={setcAccIndex}
                                        userRole={authState.role} 
                                        colors={colors} 
                                        fonts={fonts} 
                                        onItemPress={onItemPress} 
                                    />
                                }
                            />
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
                    alignItems: 'center'
                }}>
                    <Btn mode='text' title='TUTUP' onPress={() => onDismiss('materi')} />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default MateriMapel_Modal;





import React, { useEffect, useCallback, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimensions, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { useTheme, List, Divider, TouchableRipple, Chip, Card } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { Transition, Transitioning } from 'react-native-reanimated';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';
import Moment from 'moment';

import * as materiAct from '../../store/actions/materiAction';
import * as authAct from '../../store/actions/authAction';

const transition = (
    <Transition.Sequence>
        <Transition.In type='fade' durationMs={500} />
        <Transition.Out type='fade' durationMs={500} />
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
        onItemPress 
    }) => {

    const onPress = () => {
        refer.current.animateNextTransition()
        onAccordionPress(index === currentIndex || status_modul === 'locked' ? null : index)
    }

    return (
        <>
        <List.Accordion
            expanded={currentIndex === index && true}
            onPress={() => onPress()}
            style={{
                flexGrow: 1,
                borderWidth: 1
            }}
            title={nama}
            titleNumberOfLines={3}
            titleStyle={{
                ...fonts.semiBold, 
                justifyContent: 'center',
                color: colors.textPrimary,
                fontSize: 14,
                marginLeft: 0,
            }}
            description={`Nilai Akhir Modul : ${nilai_akhir_modul}`}
            descriptionStyle={{
                ...fonts.regular, 
                justifyContent: 'center',
                color: colors.textSecondary,
                fontSize: 12,
            }}
            left={props => 
                <List.Icon 
                    {...props}
                    icon={status_modul === 'locked' ? "lock" : "lock-open"}
                    color={status_modul === 'locked' ? colors.bgLock : colors.bgPrimary}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 0,
                        marginHorizontal: 0,
                    }} 
                />
            }
        >
            <FlatList 
                data={materi}
                style={{
                    paddingLeft: 30,
                }}
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
                            onPress={() => onItemPress(data.item.id, data.item.judul)}
                            rippleColor="rgba(0, 208, 255, .20)"
                        >
                            <View style={{
                                flexDirection: 'row',
                                paddingVertical: 10,
                                paddingRight: 20
                            }}>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}>
                                    <Icon name='bookmark' size={16} color={colors.textPrimary} />
                                </View>
                                <View style={{
                                    flex: 10,
                                    justifyContent: 'center',
                                }}>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        color={colors.textPrimary}
                                        size={13}
                                    >
                                        {data.item.judul}
                                    </Text>
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
                                    justifyContent: 'center',
                                    alignItems: 'flex-end'
                                }}>
                                    <Icon name='chevron-forward' size={16} color={colors.textPrimary} />
                                </View>
                            </View>
                        </TouchableRipple>
                        {data.index === (materi.length - 1) ? null : <Divider />}
                    </> )
                }
                }}
            />
        </List.Accordion>
        <Divider />
        </>
    )
}

const MateriMapel_Modal = ({visible, onDismiss, id, onItemPress}) => {
    const { colors, fonts } = useTheme()
    const materiState = useSelector(state => state.materi)
    const authState = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [isLoading, setLoading] = useState(false)
    const [cAccIndex, setcAccIndex] = useState(null)
    const AcordionRef = useRef()
    
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
                marginHorizontal: 15,
                marginBottom: 15
            }}
        >
            <Card style={{
                height: Dimensions.get('window').height * 0.8,
                backgroundColor: colors.bgWhite,
                borderRadius: 10,
                elevation: 3,
            }}>
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
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
                            <Icon name='close' size={20} color={colors.textLight} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={18} fontWeight={fonts.bold} color={colors.textWhite}>MATERI</Text>
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
                            <FlatList 
                                data={materiState.listMateri.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                extraData={materiState.listMateri.sort((a, b) => Moment(a.date_created) - Moment(b.date_created))}
                                keyExtractor={item => item._id.toString()}
                                renderItem={(data) => 
                                    <Transitioning.View
                                        ref={AcordionRef}
                                        transition={transition}
                                    >
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
                                        />
                                    </Transitioning.View>
                                }
                            />
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
                    alignItems: 'center'
                }}>
                    <Btn mode='text' title='TUTUP' onPress={() => onDismiss('materi')} />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default MateriMapel_Modal;