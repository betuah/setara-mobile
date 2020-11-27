import React, { useEffect, useState } from 'react';
import { Dimensions, Image, ImageBackground, ScrollView, View } from 'react-native';
import { useTheme, Portal, Modal } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AnggotaComponent from '../../../components/class_component/AnggotaComponent';
import MapelComponent from '../../../components/class_component/MapelComponent';
import FeedClassComponent from '../../../components/class_component/FeedClassComponent';

import MapelModal from '../../../components/modal_component/Mapel_modal';
import MembersModal from '../../../components/modal_component/Members_modal';

const ClassDetailsScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme();
    const AuthState = useSelector(state => state.auth)
    const classState = useSelector(state => state.class)
    const mapel = classState.detailClass.listMapel
    const members = classState.detailClass.listMember

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
    }, [classState.detailClass])

    const hideModal = req_modal => {
        setModal({
            ...modal,
            [req_modal] : false
        })
    }

    const moreMapel = () => setModal({...mapel, mapel: true})

    const moreAnggota = () => setModal({...mapel, members: true})

    const MapelItemPress = id => {
        console.log(id)
    }

    const MembersItemPress = id => {
        console.log(id)
    }

    return (
        <ScrollView style={{
            backgroundColor: colors.bgAccent,
            flex: 1,
        }}
        >
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
                                    <Text fontWeight={fonts.medium} size={14} color={colors.textWhite}>{classState.detailClass.details.nama}</Text>
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
                                        backgroundColor: colors.bgPrimary,
                                        elevation: 5,
                                        shadowOffset: { width: 0, height: 5 },
                                        shadowOpacity: 0.5,
                                        shadowRadius: 5,
                                    }}>
                                        <Text weight='bold' size={22} color={colors.textWhite}>{classState.detailClass.details.kode}</Text>
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
                                    <Text fontWeight={fonts.regular} size={12} color={colors.textWhite}>{classState.detailClass.details.tentang}</Text>
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
                            <Text fontWeight={fonts.semiBold} size={14} color={colors.textPrimary}>{`Mata Pelajaran (${mapel.length})`}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                            <TouchableOpacity onPress={moreMapel}>
                                <Text fontWeight={fonts.medium} size={14} color={colors.textSecondary}>{`Lihat Semua >`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView 
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{
                            backgroundColor: colors.bgLight,
                            paddingVertical: 10,
                            paddingHorizontal: 10,
                        }}
                        contentContainerStyle={{
                            maxWidth: Dimensions.get('window').width * 2 + 200,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }}
                    >
                        { mapel.map((item, index) => <MapelComponent key={index} title={item.title} />) }
                    </ScrollView>
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
                            <Text fontWeight={fonts.medium} size={14} color={colors.textPrimary}>{`Anggota Kelas (${members.length})`}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
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
                            members.map((item) => <AnggotaComponent key={item.id} data={item} />)
                        }
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default ClassDetailsScreen;