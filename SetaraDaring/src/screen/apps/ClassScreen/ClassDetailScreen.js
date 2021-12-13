import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Image, ImageBackground, Platform, ScrollView, View, StatusBar } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/Ionicons';
import Orientation from 'react-native-orientation-locker';

import StatusBariOS from '../../../components/common/StatusBar';

import AnggotaComponent from '../../../components/class_component/AnggotaComponent';
import MapelComponent from '../../../components/class_component/MapelComponent';
import SilabusModal from '../../../components/modal_component/Silabus_Modal';
import MateriMapelModal from '../../../components/modal_component/MateriMapel_Modal';

import LoadingModal from '../../../components/modal_component/Loading_Modal';
import Devel from '../../../components/modal_component/Development_Modal';
import MapelModal from '../../../components/modal_component/Mapel_modal';
import MembersModal from '../../../components/modal_component/Members_modal';
import TugasModal from '../../../components/modal_component/Tugas_Modal';
import EvaluationModal from '../../../components/modal_component/Evaluation_Modal';

const ClassDetailsScreen = ({navigation}) => {
    const { colors, fonts } = useTheme();
    const insets = useSafeAreaInsets();

    const AuthState = useSelector(state => state.auth)
    const classState = useSelector(state => state.class)
    const materiState = useSelector(state => state.materi)
    
    const detailClass = classState.detailClass
    const mapel = detailClass.listMapel
    const members = detailClass.listMembers

    const carouselRef = useRef(null);
    const scrollPageRef = useRef(null);

    const [activeMapel, setActiveMapel] = useState(mapel[mapel.length > 1 ? 1 : 0])
    const [activeMapelIndex, setMapelIndex] = useState(mapel.length > 1 ? 1 : 0)
    const [isLoading, setLoading] = useState(false)
    const [devel, setDevel] = useState(false)

    const [modal, setModal] = useState({
        mapel: false,
        members: false,
        silabus: false,
        materi: false,
        tugas: false,
        evaluation: false,
    })

    const onMapelSliders = (index) => {
        setActiveMapel(mapel[index])
        setMapelIndex(index)
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerBackTitle: false,
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
        
        Orientation.lockToPortrait()
    }, [detailClass, classState.detailClass, materiState])

    const setModals = req_modal => {
        setModal({
            ...modal,
            [req_modal] : true
        })
    }

    const hideModal = req_modal => {
        setModal({
            ...modal,
            [req_modal] : false
        })
    }

    const moreMapel = () => setModal({...mapel, mapel: true})
    const moreAnggota = () => setModal({...mapel, members: true})
    
    const MapelItemPress = id => {
        const index = mapel.findIndex(item => item.id === id)
        carouselRef.current.snapToItem(index)
        hideModal('mapel')
    }

    const navIconHandller = async (request) => {
        switch (request) {
            case 'silabus':
                setModals('silabus')
                break;
            
            case 'materi':
                setModals('materi')
                break;

            case 'raport':
                setDevel(true)
                break;

            case 'tugas':
                setModals('tugas')
                break;

            case 'diskusi':
                setDevel(true)
                break;

            case 'nilai':
                setModals('evaluation')
                break;
        
            default:
                console.log(request)
                break;
        }
    }

    const onMateriPress = (id, title, date_created) => {
        hideModal('materi')
        navigation.push('Materi', { id, title, date_created })
    }

    const onTugasPress = (id, title, date_created) => {
        hideModal('tugas')
        navigation.push('Tugas', { id, title, date_created })
    }

    const onEvalutionPress = (id, title, date_created) => {
        hideModal('evaluation')
        navigation.push('Evaluation', { id, title, date_created })
    }

    return (
        <>
        {
            Platform.OS === 'ios' ?
            <StatusBariOS
                bgColor={colors.bgDarkBlue} 
                barHeight={insets.top - 5} 
            />
            :
            <StatusBar barStyle='light-content' backgroundColor={colors.bgDarkBlue} />
        }
        <ScrollView 
            style={{
                backgroundColor: colors.bgAccent,
                flex: 1,
            }}
        >
            <LoadingModal visible={isLoading} />
            <Devel visible={devel} onDismiss={setDevel} />

            <MapelModal visible={modal.mapel} onDismiss={hideModal} itemPress={MapelItemPress} data={mapel} />
            <MembersModal visible={modal.members} onDismiss={() => hideModal('members')} data={members} />
            <SilabusModal visible={modal.silabus} onDismiss={hideModal} silabus={activeMapel ? activeMapel.silabus : false} />
            <MateriMapelModal visible={modal.materi} onDismiss={hideModal} id={activeMapel ? activeMapel.id : ''} onItemPress={onMateriPress} />
            <TugasModal visible={modal.tugas} onDismiss={hideModal} id={activeMapel ? activeMapel.id : ''} onItemPress={onTugasPress} />
            <EvaluationModal navigation={navigation} visible={modal.evaluation} onDismiss={hideModal} id={activeMapel ? activeMapel.id : ''} onItemPress={onEvalutionPress} />

            <View style={{
                flex: 3,
                backgroundColor: colors.bgPrimary,
                elevation: 5,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.3,
                shadowRadius: 3,
            }}>
                <ImageBackground
                    source={require('../../../assets/images/header/bg-header-classDetails.png')}
                    style={{width:"100%",height: '100%'}}
                    resizeMode="cover"
                >
                    <SafeAreaView>
                        <View style={{
                            marginTop: Platform.OS === 'ios' ? 10 : 50,
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
                                    <Text fontWeight={fonts.semiBold} size={16} color={colors.textWhite}>{AuthState.fullName}</Text>
                                    <Text fontWeight={fonts.medium} size={13} color={colors.textWhite}>{detailClass.name}</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    alignItems: 'flex-end',
                                    justifyContent: 'flex-start'
                                }}>
                                    <View style={{
                                        borderWidth: 2,
                                        borderRadius: 15,
                                        borderColor: colors.bgWhite,
                                        paddingHorizontal: 10,
                                        paddingVertical: 5,
                                        backgroundColor: detailClass.status === 'LOCKED' ? colors.bgLock : colors.bgPrimary,
                                        elevation: 5,
                                        shadowOffset: { width: 0, height: 2 },
                                        shadowOpacity: 0.3,
                                        shadowRadius: 2,
                                        flexDirection: "row",
                                    }}>
                                        { 
                                            detailClass.status === 'LOCKED' ?
                                                <>
                                                    <View style={{justifyContent: 'center', paddingRight: 5,}}><Icon name="lock-closed" size={16} color={colors.bgWhite} /></View>
                                                    
                                                    <Text weight='bold' size={16} color={colors.textWhite}>TERKUNCI</Text>
                                                </>
                                            :   
                                                <Text weight='bold' size={18} color={colors.textWhite}>{detailClass.code}</Text>
                                        }
                                        
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginVertical: 20,
                                    padding: 10,
                                    elevation: 3,
                                    shadowOffset: { width: 0, height: 3 },
                                    shadowOpacity: 0.3,
                                    shadowRadius: 3,
                                    backgroundColor: colors.bgPrimary,
                                    borderWidth: 3,
                                    borderColor: colors.bgWhite,
                                    borderRadius: 20,
                                    marginBottom: Platform.OS === 'android' ? -50 : -80,
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
                                    <Text fontWeight={fonts.semiBold} size={16} color={colors.textWhite}>Tentang Kelas</Text>
                                    <Text fontWeight={fonts.regular} size={11} color={colors.textWhite}>{detailClass.about ? detailClass.about : 'Tidak ada keterangan kelas.'}</Text>
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
            { mapel.length === 0 ? 
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
                                <Text fontWeight={fonts.semiBold} size={12} color={colors.textWhite}>{`Mata Pelajaran (${mapel.length})`}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.bgLight,
                        paddingVertical: 50,
                        paddingHorizontal: 18,
                        alignItems: 'center'
                    }}>
                        <Text fontWeight={fonts.regular} color={colors.textPrimary}>Maaf, Mata Pelajaran Belum Tersedia.</Text>
                    </View>
                </View>
            :
                <>
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
                                <Text fontWeight={fonts.semiBold} size={12} color={colors.textWhite}>{`Mata Pelajaran (${mapel.length})`}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingTop: 10,
                        }}>
                            <TouchableOpacity onPress={moreMapel}>
                                <Text fontWeight={fonts.medium} size={12} color={colors.textSecondary}>{`lihat Semua >`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        backgroundColor: colors.bgWhite,
                        elevation: 2,
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.3,
                        shadowRadius: 2,
                    }}>
                        <Carousel
                            ref={carouselRef}
                            keyExtractor={(item) => item.id.toString()}
                            firstItem={activeMapelIndex}
                            containerCustomStyle = {{
                                paddingTop: 10,
                                paddingBottom: 5,
                            }}
                            layout={'default'}
                            data={mapel}
                            extraData={mapel}
                            renderItem={(data) => <MapelComponent onPress={MapelItemPress} id={data.item.id} title={data.item.nama} />}
                            sliderWidth={Dimensions.get('window').width}
                            itemWidth={Dimensions.get('window').width * 0.8}
                            onSnapToItem={index => onMapelSliders(index) }
                            removeClippedSubviews={true}
                            initialNumToRender={3}
                            maxToRenderPerBatch={6}
                            updateCellsBatchingPeriod={12}
                        />

                        <ScrollView 
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            ref={scrollPageRef}
                            style={{
                                alignSelf: 'center',
                                width: Dimensions.get('window').width * 0.4,
                            }}
                        >
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
                                    backgroundColor: colors.bgCardPrimary,
                                }}
                                inactiveDotStyle={{
                                    backgroundColor: colors.bgPrimary,
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.6}
                            />
                        </ScrollView>
                    </View>
                </View>
                <View style={{
                    flexDirection: 'column',
                    marginTop: 20,
                    marginBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: colors.bgWhite,
                    elevation: 2,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                }}>
                    <View style={{
                        paddingHorizontal: 10,
                        paddingVertical: 8,
                        justifyContent: 'center',
                        alignItems: 'center',
                        
                    }}>
                        <Text 
                            style={{textAlign: 'center'}}
                            fontWeight={fonts.semiBold} 
                            color={colors.orange}
                            size={18}
                        >
                            {activeMapel.nama.toUpperCase()}
                        </Text>
                    </View>
                    <Divider style={{width: '100%', height: 1}} />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginBottom: 5,
                        marginTop: 18,
                    }}>
                        <TouchableOpacity
                            onPress={() => navIconHandller('silabus')} 
                            activeOpacity={0.65}
                            style={{
                                width: 90,
                                height: 90,
                                padding: 8,
                                marginHorizontal: 5,
                                backgroundColor: colors.navMapelBg,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.navMapelBorder,
                                borderStyle: 'dotted',
                            }}
                        >
                            <Icon name='clipboard' size={28} color={colors.navMapelPrimary} />
                            <Text fontWeight={fonts.medium} size={11} color={colors.navMapelPrimary}>Silabus</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navIconHandller('materi')}
                            activeOpacity={0.65}
                            style={{
                                width: 90,
                                height: 90,
                                padding: 8,
                                marginHorizontal: 5,
                                backgroundColor: colors.navMapelBg,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.navMapelBorder,
                                borderStyle: 'dotted',
                            }}
                        >
                            <Icon name='book' size={28} color={colors.navMapelPrimary} />
                            <Text fontWeight={fonts.medium} size={11} color={colors.navMapelPrimary}>Materi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => navIconHandller('raport')}
                            activeOpacity={0.65}
                            style={{
                                width: 90,
                                height: 90,
                                padding: 8,
                                marginHorizontal: 5,
                                backgroundColor: colors.navMapelBg,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.navMapelBorder,
                                borderStyle: 'dotted',
                            }}
                        >
                            <Icon name='pulse' size={25} color={colors.navMapelPrimary} />
                            <Text fontWeight={fonts.medium} size={9} color={colors.navMapelPrimary}>Perkembangan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 5,
                        marginBottom: 20,
                    }}>
                        <TouchableOpacity 
                            onPress={() => navIconHandller('tugas')}
                            activeOpacity={0.65}
                            style={{
                                width: 90,
                                height: 90,
                                padding: 8,
                                marginHorizontal: 5,
                                backgroundColor: colors.navMapelBg,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.navMapelBorder,
                                borderStyle: 'dotted',
                            }}
                        >
                            <Icon name='document-text' size={25} color={colors.navMapelPrimary} />
                            <Text fontWeight={fonts.medium} size={11} color={colors.navMapelPrimary}>Penugasan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navIconHandller('nilai')}
                            activeOpacity={0.65}
                            style={{
                                width: 90,
                                height: 90,
                                padding: 8,
                                marginHorizontal: 5,
                                backgroundColor: colors.navMapelBg,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.navMapelBorder,
                                borderStyle: 'dotted',
                            }}
                        >
                            <Icon name='ribbon' size={25} color={colors.navMapelPrimary} />
                            <Text fontWeight={fonts.medium} size={11} color={colors.navMapelPrimary}>Penilaian</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navIconHandller('diskusi')}
                            activeOpacity={0.65}
                            style={{
                                width: 90,
                                height: 90,
                                padding: 8,
                                marginHorizontal: 5,
                                backgroundColor: colors.navMapelBg,
                                borderRadius: 10,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: colors.navMapelBorder,
                                borderStyle: 'dotted',
                            }}
                        >
                            <Icon name='chatbubbles' size={25} color={colors.navMapelPrimary} />
                            <Text fontWeight={fonts.medium} size={11} color={colors.navMapelPrimary}>Diskusi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </>
            }
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
                                <Text fontWeight={fonts.semiBold} size={12} color={colors.textWhite}>{`Anggota Kelas (${members.length})`}</Text>
                            </View>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            paddingTop: 10,
                        }}>
                            <TouchableOpacity onPress={moreAnggota}>
                                <Text fontWeight={fonts.medium} size={12} color={colors.textSecondary}>{`Lihat Semua >`}</Text>
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
                            members.length > 10 
                                ? 
                                members.slice(0, 10).map((item) => <AnggotaComponent key={item.id} data={item} />)
                                :
                                members.map((item) => <AnggotaComponent key={item.id} data={item} />)
                        }
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
        </>
    )
}

export default ClassDetailsScreen;