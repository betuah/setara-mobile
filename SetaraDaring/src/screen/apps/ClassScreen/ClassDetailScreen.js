import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, StatusBar, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LottieView from 'lottie-react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';

import * as authAct from '../../../store/actions/authAction';
import * as classAct from '../../../store/actions/classAction';

import AnggotaComponent from '../../../components/class_component/AnggotaComponent';
import MapelComponent from '../../../components/class_component/MapelComponent';

import MapelModal from '../../../components/modal_component/Mapel_modal';
import MembersModal from '../../../components/modal_component/Members_modal';
import { useFocusEffect } from '@react-navigation/native';

const ClassDetailsScreen = ({route, navigation}) => {
    const { colors, fonts } = useTheme();
    const dispatch = useDispatch()
    const AuthState = useSelector(state => state.auth)
    const classState = useSelector(state => state.class)
    const [isLoading, setLoading] = useState(false)
    const detailClass = classState.detailClass
    const mapel = detailClass.listMapel
    const members = detailClass.listMembers
    const [activeMapel, setActiveMapel] = useState(mapel[1])
    const [activeMapelIndex, setMapelIndex] = useState(1)
    const [modal, setModal] = useState({
        mapel: false,
        members: false
    });

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: '',
            headerTintColor: colors.textWhite,
            headerTransparent: {
                position: 'absolute',
                backgroundColor: 'transparent',
                elevation: 0,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 0,
                shadowOpacity: 0,
                zIndex: 100, 
                top: 0, 
                left: 0, 
                right: 0
            },
        })

        console.log(activeMapel, activeMapelIndex)
    }, [detailClass, classState.detailClass])

    const loadData = async (id) => {
        try {
            setLoading(true)
            await dispatch(classAct.detailKelas(id))
            setActiveMapel(mapel[1])
            setMapelIndex(1)
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
            setLoading(false)
        }
    }

    useFocusEffect(
        useCallback(() => {
            let isActive = true
            const id = route.params.id_kelas
            setLoading(true)
            
            if (isActive) loadData(id)
            return () => {
                isActive = false
            }
        }, [dispatch])
    )

    const hideModal = req_modal => {
        setModal({
            ...modal,
            [req_modal] : false
        })
    }

    const onMapelSliders = (index) => {
        setActiveMapel(mapel[index])
        setMapelIndex(index)
    }

    const moreMapel = () => setModal({...mapel, mapel: true})

    const moreAnggota = () => setModal({...mapel, members: true})

    const MapelItemPress = id => {
        console.log(id)
    }

    const MembersItemPress = id => {
        console.log(id)
    }

    if (isLoading) return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.bgAccent
        }}>
            <LottieView 
                source={require('../../../assets/lottie/28893-book-loading.json')} 
                autoPlay 
                style={{width: '50%'}}
            />
            <Text 
                style={{paddingTop: 20,}} 
                size={20} 
                fontWeight={fonts.medium}
                color={colors.textPrimary}
            >
                Loading...
            </Text>
        </View>
    )

    return (
        <ScrollView 
            style={{
                backgroundColor: colors.bgAccent,
                flex: 1,
            }}
        >
            <StatusBar backgroundColor={colors.bgPrimary} barStyle='light-content' />
            <MapelModal visible={modal.mapel} onDismiss={hideModal} itemPress={MapelItemPress} data={mapel} />
            <MembersModal visible={modal.members} onDismiss={hideModal} itemPress={MembersItemPress} data={members} />

            <View style={{
                flex: 3,
                backgroundColor: colors.bgPrimary,
                elevation: 5,
                shadowOffset: { width: 0, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 5,
            }}>
                <ImageBackground
                    source={require('../../../assets/images/header/bg-header-classDetails.png')}
                    style={{width:"100%",height: '100%'}}
                    resizeMode="cover"
                >
                    <SafeAreaView>
                        <View style={{
                            marginTop: 50,
                            paddingHorizontal: 18,
                            flexDirection: 'column'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                            }}>
                                <View style={{
                                    flex: 2,
                                    flexDirection: 'column',
                                    alignItems: 'flex-start',
                                }}>
                                    <Text fontWeight={fonts.italic} size={12} color={colors.textWhite}>Selamat Belajar</Text>
                                    <Text fontWeight={fonts.semiBold} size={18} color={colors.textWhite}>{AuthState.fullName}</Text>
                                    <Text fontWeight={fonts.medium} size={14} color={colors.textWhite}>{detailClass.name}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'center'
                                }}>
                                    <View style={{
                                        borderWidth: 3,
                                        borderRadius: 15,
                                        borderColor: colors.bgWhite,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        backgroundColor: detailClass.status === 'LOCKED' ? colors.bgLock : colors.bgPrimary,
                                        elevation: 5,
                                        shadowOffset: { width: 0, height: 5 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 5,
                                        flexDirection: "row",
                                    }}>
                                        { 
                                            detailClass.status === 'LOCKED' ?
                                                <>
                                                    <View style={{justifyContent: 'center', paddingRight: 5,}}><Icon name="lock-closed" size={16} color={colors.bgWhite} /></View>
                                                    
                                                    <Text weight='bold' size={18} color={colors.textWhite}>TERKUNCI</Text>
                                                </>
                                            :   
                                                <Text weight='bold' size={22} color={colors.textWhite}>{detailClass.code}</Text>
                                        }
                                        
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: 20,
                                    padding: 10,
                                    elevation: 4,
                                    shadowOffset: { width: 0, height: 4 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 4,
                                    backgroundColor: colors.bgPrimary,
                                    borderWidth: 5,
                                    borderColor: colors.bgWhite,
                                    borderRadius: 20,
                                    marginBottom: -50,
                                }}
                            >
                                <View style={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    justifyContent: 'center',
                                    alignItems: 'flex-end',
                                    padding: 10,
                                }}>
                                    <Image 
                                        source={require('../../../assets/images/triangle-1.png')}
                                        resizeMode='contain'
                                    />
                                </View>
                                <View style={{
                                    flex: 2,
                                    paddingRight: 5,
                                }}>
                                    <Text fontWeight={fonts.semiBold} size={18} color={colors.textWhite}>Tentang Kelas</Text>
                                    <Text fontWeight={fonts.regular} size={12} color={colors.textWhite}>{detailClass.about}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                }}>
                                    <Image 
                                        source={require('../../../assets/images/online_lesson__monochromatic.png')}
                                        style={{width: '100%',}}
                                        resizeMode='contain'
                                    />
                                </View>
                            </View>
                        </View>
                    </SafeAreaView>
                </ImageBackground>
            </View>
            <View style={{
                flex: 6,
            }}>
                <View style={{
                    marginTop: 60,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                        paddingHorizontal: 18,
                    }}>
                        <View style={{
                            flex: 2,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <View style={{
                                backgroundColor: colors.bgPrimary,
                                paddingTop: 3,
                                paddingHorizontal: 5,
                                borderRadius: 8,
                            }}>
                                <Text fontWeight={fonts.semiBold} size={14} color={colors.textWhite}>{`Mata Pelajaran (${mapel.length})`}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingTop: 10,
                        }}>
                            <TouchableOpacity onPress={moreMapel}>
                                <Text fontWeight={fonts.medium} size={14} color={colors.textSecondary}>{`Lihat Semua >`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.bgLight,
                    }}>
                        <Carousel 
                            firstItem={1}
                            containerCustomStyle = {{
                                paddingTop: 10,
                                paddingBottom: 5,
                                paddingHorizontal: 10,
                            }}
                            layout={'default'}
                            data={mapel}
                            renderItem={(data, index) => <MapelComponent key={data.item.id} title={data.item.nama} />}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width * 0.65}
                            onSnapToItem={index => onMapelSliders(index) }
                        />

                        <Pagination
                            dotsLength={mapel.length}
                            activeDotIndex={activeMapelIndex}
                            containerStyle={{
                                paddingVertical: 0,
                                marginTop: 5,
                                marginBottom: 15,
                            }}
                            dotStyle={{
                                width: 8,
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: colors.accent,
                            }}
                            inactiveDotStyle={{
                                backgroundColor: colors.bgPrimary,
                            }}
                            inactiveDotOpacity={0.4}
                            inactiveDotScale={0.6}
                        />
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginTop: 20,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.bgLight,
                    paddingVertical: 20,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5
                    }}>
                        <View style={{
                            width: 90,
                            height: 90,
                            padding: 10,
                            marginHorizontal: 5,
                            backgroundColor: '#cfeefa',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='reader' size={40} color={'#32a852'} />
                            <Text fontWeight={fonts.medium} color={'#32a852'}>Silabus</Text>
                        </View>
                        <View style={{
                            width: 90,
                            height: 90,
                            padding: 5,
                            marginHorizontal: 5,
                            backgroundColor: '#cfeefa',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='book' size={40} color={'#32a852'} />
                            <Text fontWeight={fonts.medium} color={'#32a852'}>Materi</Text>
                        </View>
                        <View style={{
                            width: 90,
                            height: 90,
                            padding: 5,
                            marginHorizontal: 5,
                            backgroundColor: '#cfeefa',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='pulse' size={40} color={'#32a852'} />
                            <Text fontWeight={fonts.medium} color={'#32a852'}>Raport</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 5,
                    }}>
                        <View style={{
                            width: 90,
                            height: 90,
                            padding: 10,
                            marginHorizontal: 5,
                            backgroundColor: '#cfeefa',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='document-text' size={40} color={'#32a852'} />
                            <Text fontWeight={fonts.medium} color={'#32a852'}>Tugas</Text>
                        </View>
                        <View style={{
                            width: 90,
                            height: 90,
                            padding: 5,
                            marginHorizontal: 5,
                            backgroundColor: '#cfeefa',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='chatbubbles' size={40} color={'#32a852'} />
                            <Text fontWeight={fonts.medium} color={'#32a852'}>Diskusi</Text>
                        </View>
                        <View style={{
                            width: 90,
                            height: 90,
                            padding: 5,
                            marginHorizontal: 5,
                            backgroundColor: '#cfeefa',
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Icon name='medal' size={40} color={'#32a852'} />
                            <Text fontWeight={fonts.medium} color={'#32a852'}>Nilai</Text>
                        </View>
                    </View>
                </View>
                <View style={{
                    marginTop: 10,
                    flexDirection: 'column',
                }}>
                    <View style={{
                        flexDirection: 'row',
                        paddingVertical: 5,
                        paddingHorizontal: 18,
                    }}>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <View style={{
                                backgroundColor: colors.bgPrimary,
                                paddingTop: 3,
                                paddingBottom: 2,
                                paddingHorizontal: 5,
                                borderRadius: 8,
                            }}>
                                <Text fontWeight={fonts.semiBold} size={14} color={colors.textWhite}>{`Anggota Kelas (${members.length})`}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingTop: 10,
                        }}>
                            <TouchableOpacity onPress={moreAnggota}>
                                <Text fontWeight={fonts.medium} size={14} color={colors.textSecondary}>{`Lihat Semua >`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                        style={{
                            paddingHorizontal: 10,
                        }}
                    >
                        {
                            members.length > 20 
                                ? 
                                members.slice(0, 20).map((item) => <AnggotaComponent key={item.id} data={item} />)
                                :
                                members.map((item) => <AnggotaComponent key={item.id} data={item} />)
                        }
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default ClassDetailsScreen;