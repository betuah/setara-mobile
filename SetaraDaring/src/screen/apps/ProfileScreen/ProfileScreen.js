import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, TouchableRipple, useTheme } from 'react-native-paper';
import { Text } from '../../../components/common/UtilsComponent';
import { Chase } from 'react-native-animated-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import { View, ScrollView, Image, RefreshControl, StatusBar, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import Toast from 'react-native-toast-message';

import StatusBariOS from '../../../components/common/StatusBar.js';
import Devel from '../../../components/modal_component/Development_Modal';

import * as authAct from '../../../store/actions/authAction';
import * as profileAction from '../../../store/actions/profileActions';
import * as themeAct from '../../../store/actions/themeAction';

const ProfileScreen = (props) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()

    const { darkMode } = useSelector(state => state.theme)
    const profileState = useSelector(state => state.profile)

    const [ isLoading, setLoading ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ error, setError ] = useState(false);
    const [ profile, setProfile ] = useState(null)
    const [ devel, setDevel ] = useState(false)
    const [ passModal, setPassModal ] = useState(false)

    useEffect(() => {
        if (Platform.OS === 'android') {
            StatusBar.setBarStyle('light-content')
            StatusBar.setBackgroundColor(colors.primary)
        }
        if (profileState.profile) setProfile(profileState.profile)
    }, [profileState])

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const fetch = async () => {
                try {
                    if (isActive) {
                        if (profile === null) {
                            await dispatch(profileAction.initData())
                            setProfile(profileState.profile)
                            setRefreshing(false)
                            setError(false)
                        }
                    }
                } catch (error) {
                    if (isActive) {
                        if (error) {
                            if (error === 'ERR_GENERATE_TOKEN') {
                                dispatch(authAct.signOut(true))
                                Toast.show({
                                    type: 'error',
                                    text1: 'Maaf, Sesi kamu telah Habis!',
                                    text2: 'Silahkan masuk kembali.'
                                });
                            }
                            setError(true)
                            setRefreshing(false)
                        }
                    }
                }
            }

            fetch();

            return () => {
                isActive = false
            }

        }, [profileState.profile, profile, error])
    );

    const onRefresh = () => {
        setProfile(null)
    }

    const isDarkModeSwtich = () => {
        try {
            dispatch(themeAct.setDarkMode(!darkMode))
        } catch (error) {
            console.log(error)
        }
    }

    const signOut = async () => {
        try {
            setLoading(true)
            await dispatch(authAct.signOut())
        } catch (err) {
            if (error === 'ERR_GENERATE_TOKEN') {
                dispatch(authAct.signOut(true))
                Toast.show({
                    type: 'error',
                    text1: 'Maaf, Sesi kamu telah Habis!',
                    text2: 'Silahkan masuk kembali.'
                });
            }
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Gagal Keluar SetaraDaring!',
                text2: err
            });
        }
    }

    if (error)  {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    flex: 1,
                    paddingBottom: 10,
                    paddingHorizontal: 10,
                }}
                refreshControl={
                    <RefreshControl refreshing={refreshing} colors={[`${colors.bgPrimary}`]} onRefresh={onRefresh} />
                }
            >
                <StatusBariOS/>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{textAlign: 'center'}} fontWeight={{...fonts.regular}} size={12} color={colors.red}>Maaf Terjadi Kesalahan, Geser layar ke bawah untuk mencoba lagi.</Text>
                </View>
            </ScrollView>
            
        )
    }

    if (profile === null && !error) 
        return (
            <View style={{
                flex: 1,
            }}>
                <StatusBariOS/>
                <ImageBackground 
                    source={require('../../../assets/images/bgScreen01.png')}
                    style={{flex: 1,}}
                    resizeMode="cover"
                >
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <LottieView 
                            source={require('../../../assets/lottie/28893-book-loading.json')} 
                            autoPlay
                            style={{
                                width: '40%',
                                alignItems: 'center',
                            }}
                        />
                    </View>
                </ImageBackground>
            </View>
        )

    return (
        <View style={{flex: 1,}}>
            <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
            <ImageBackground 
                source={require('../../../assets/images/bgScreen01.png')}
                style={{flex: 1,}}
                resizeMode="cover"
            >
                <Devel visible={devel} onDismiss={setDevel} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: 10,
                        paddingHorizontal: 10,
                    }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} colors={[`${colors.bgPrimary}`]} onRefresh={onRefresh} />
                    }
                >
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        elevation: 3,
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{
                                marginHorizontal: 15,
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                            }}>
                                { profile.foto ? 
                                    <Image 
                                        style={{
                                            width: 55,
                                            height: 55,
                                            borderWidth: 2,
                                            borderRadius: 50,
                                            borderColor: colors.bgPrimary
                                        }}
                                        source={{ uri: profile.foto }}   
                                    />
                                    :
                                    <View style={{
                                        width: 55,
                                        height: 55,
                                        borderWidth: 2,
                                        borderRadius: 50,
                                        borderColor: colors.orange,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.purple2
                                    }}>
                                        <Text
                                            color={colors.textWhite}
                                            style={{fontWeight: 'bold'}}
                                        >
                                            { profile.nama.split(" ").length === 1 ? profile.nama.substring(0, 1).toUpperCase() : `${profile.nama.split(" ")[0].substring(0, 1).toUpperCase()}${profile.nama.split(" ")[1].substring(0, 1).toUpperCase()}` }
                                        </Text>
                                    </View>
                                }
                            </View>
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                paddingHorizontal: 10,
                            }}>
                                <View style={{
                                    marginBottom: 5,
                                }}>
                                    <Text 
                                        fontWeight={{...fonts.semiBold}}
                                        size={16}
                                        color={colors.textPrimary}
                                    >
                                        { profile.nama }
                                    </Text>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        { `${profile.username}` }
                                    </Text>
                                </View>
                                <Divider style={{width: '100%', height: 1}} />
                            </View>
                        </View>
                        
                    </View>
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        marginTop: 10,
                        padding: 10,
                        borderRadius: 10,
                        elevation: 3,
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <View style={{
                            flexDirection: 'column',
                            paddingHorizontal: 10,
                        }}>
                            <View style={{
                                marginBottom: 3,
                                justifyContent: 'center',
                                // alignItems: 'center'
                            }}>
                                <Text 
                                    fontWeight={{...fonts.semiBold}}
                                    color={colors.primary}
                                    size={14}
                                >
                                    B I O D A T A
                                </Text>
                            </View>
                            <Divider style={{height: 0.5}}/>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 5,
                            }}>
                                <View style={{flexDirection: 'column'}}>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <View style={{paddingRight: 10,}}><Icon name='mail' color={colors.red} size={15} /></View>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.red}
                                        >
                                            Email
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <View style={{paddingRight: 10,}}><Icon name='male-female' color={colors.yellow} size={15} /></View>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.yellow}
                                        >
                                            Gender
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <View style={{paddingRight: 10,}}><Icon name='school' color={colors.deepGreen} size={15} /></View>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.deepGreen}
                                        >
                                            Sekolah
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <View style={{paddingRight: 10,}}><Icon name='map' color={colors.orange} size={15} /></View>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.orange}
                                        >
                                            Alamat
                                        </Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'column', marginLeft: 15,}}>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.grey}
                                        >
                                            {profile.email ? `:  ${profile.email}` : '-'}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.grey}
                                        >
                                            {profile.jk ? `:  ${profile.jk}` : '-'}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.grey}
                                        >
                                            {profile.sekolah ? `:  ${profile.sekolah}` : '-'}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', marginTop: 5}}>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.grey}
                                        >
                                            {profile.kota && profile.provinsi ? `:  ${profile.kota && profile.kota},${profile.provinsi && profile.provinsi}` : '-'}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        marginTop: 10,
                        borderRadius: 10,
                        elevation: 3,
                        shadowOffset: { width: 1, height: 1 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <View style={{
                            flexDirection: 'column',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}>
                            <View style={{
                                marginBottom: 3,
                                justifyContent: 'center',
                            }}>
                                <Text 
                                    fontWeight={{...fonts.semiBold}}
                                    color={colors.primary}
                                    size={14}
                                >
                                    P E N G A T U R A N
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <Divider style={{height: 1,}} />
                            <TouchableRipple
                                onPress={() => setPassModal(true)}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{paddingRight: 10,}}><Icon name='lock-open' color={colors.red} size={15} /></View>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        Ubah Password
                                    </Text>
                                </View>
                            </TouchableRipple>
                            <Divider style={{height: 1,}} />
                            <TouchableRipple
                                onPress={isDarkModeSwtich}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{
                                        flexGrow: 1,
                                        flexDirection: 'row',
                                        alignItems: 'flex-start'
                                    }}>
                                        <View style={{paddingRight: 10,}}><Icon name='contrast' color={colors.yellow} size={15} /></View>
                                        <Text 
                                            fontWeight={{...fonts.regular}}
                                            size={12}
                                            color={colors.grey}
                                        >
                                            Mode Layar Hitam
                                        </Text>
                                    </View>
                                    <View style={{
                                        flexGrow: 1,
                                        alignItems: 'flex-end'
                                    }}>
                                        <Icon name={darkMode ? 'moon' : 'sunny'} color={colors.primary} size={15} />
                                    </View>
                                </View>
                            </TouchableRipple>
                            <Divider style={{height: 1,}} />
                            <TouchableRipple
                                onPress={() => setDevel(true)}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{paddingRight: 10,}}><Icon name='finger-print' color={colors.deepGreen} size={15} /></View>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        Keamanan Sidik Jari
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        marginTop: 10,
                        borderRadius: 10,
                        elevation: 3,
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <View style={{
                            flexDirection: 'column',
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                        }}>
                            <View style={{
                                marginBottom: 3,
                                justifyContent: 'center',
                            }}>
                                <Text 
                                    fontWeight={{...fonts.semiBold}}
                                    color={colors.primary}
                                    size={14}
                                >
                                    I N F O R M A S I
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <Divider style={{height: 1,}} />
                            <TouchableRipple
                                onPress={() => setDevel(true)}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{paddingRight: 10,}}><Icon name='information-circle' color={colors.deepGreen} size={15} /></View>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        Tentang Kami
                                    </Text>
                                </View>
                            </TouchableRipple>
                            <Divider style={{height: 1,}} />
                            <TouchableRipple
                                onPress={() => setDevel(true)}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{paddingRight: 10,}}><Icon name='bulb' color={colors.purple2} size={15} /></View>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        Saran dan Masukan
                                    </Text>
                                </View>
                            </TouchableRipple>
                            <Divider style={{height: 1,}} />
                            <TouchableRipple
                                onPress={() => setDevel(true)}
                                rippleColor="rgba(0, 0, 0, .32)"
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{paddingRight: 10,}}><Icon name='bug' color={colors.red} size={15} /></View>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        Laporan Masalah
                                    </Text>
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        marginTop: 10,
                        borderRadius: 10,
                        elevation: 3,
                        shadowOffset: { width: 1, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <View style={{
                            flexDirection: 'column',
                        }}>
                            <TouchableRipple
                                onPress={signOut}
                                rippleColor="rgba(0, 0, 0, .32)"
                                style={{
                                    borderRadius: 10,
                                }}
                            >
                                <View style={{
                                    flexDirection: 'row', 
                                    marginVertical: 10,
                                    marginHorizontal: 20,
                                }}>
                                    <View style={{paddingRight: 10,}}><Icon name='log-out' color={colors.orange} size={15} /></View>
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.grey}
                                    >
                                        Keluar
                                    </Text>
                                    {
                                        isLoading &&
                                            <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                                <Chase size={16} color={colors.accent} />
                                            </View>
                                    }
                                </View>
                            </TouchableRipple>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}

export default ProfileScreen;