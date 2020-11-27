import React, { useEffect } from 'react';
import { Image, ImageBackground, ScrollView, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';
import { Text } from '../../../components/common/UtilsComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

import AnggotaComponent from '../../../components/class_component/AnggotaComponent';
import MapelComponent from '../../../components/class_component/MapelComponent';
import FeedClassComponent from '../../../components/class_component/FeedClassComponent';

const ClassDetailsScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme();
    const AuthState = useSelector(state => state.auth)

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

    }, [])

    const moreAnggota = () => {
        console.log('more')
    }

    return (
        <ScrollView 
            showsVerticalScrollIndicator ={false}
            style={{
                backgroundColor: colors.bgAccent
            }}
        >
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
                                    <Text fontWeight={fonts.semiBold} size={18} color={colors.textWhite}>Betuah Anugerah</Text>
                                    <Text fontWeight={fonts.medium} size={14} color={colors.textWhite}>SMAN 01 Tajurhalang - Kelas XI.A</Text>
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
                                        <Text weight='bold' size={22} color={colors.textWhite}>XC8V2D</Text>
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
                                    <Text fontWeight={fonts.regular} size={12} color={colors.textWhite}>Kelas ini adalah kelas SMK Binar rahayu khusus untuk pembelajaran profuktif atau TKJ, Pada Kelas ini kalian akan banyak praktik.</Text>
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
                            <Text fontWeight={fonts.semiBold} size={14} color={colors.textPrimary}>{`Daftar Mata Pelajaran (${20})`}</Text>
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
                        // contentContainerStyle={{ width: `${100 * intervals}%` }}
                        // scrollEventThrottle={300}
                        decelerationRate="fast"
                        pagingEnabled
                        style={{backgroundColor: colors.bgLight, paddingTop: 10,}}
                    >
                        <MapelComponent title='Artificial Intelegent' />
                        <MapelComponent title='Pemograman Dasar 1' />
                        <MapelComponent title='Fisika Diskrit' />
                        <MapelComponent title='Bahasa Inggris Lanjutan' />
                        <MapelComponent title='Automata' />
                        <MapelComponent title='Matematika Lanjutan 2' />
                    </ScrollView>
                </View>
                <View style={{
                    marginTop: 20,
                    backgroundColor: colors.bgLight,
                }}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                    >
                        <FeedClassComponent data={{
                            picture: AuthState.foto,
                            name: AuthState.fullName,
                            status: 'Tutor',
                            createdTime: new Date("October 13, 2018 11:13:00"),
                            post:  `<p>'Selamat Datang'<br><br>Perkenalkan saya adalah Guru Kelas dari SMAN 1 Cihampelas Kelas XI.<br>Untuk Guru Mata Pelajaran Matematika adalah Bapak Al Bahri, untuk Guru Mata Pelajaran Bahasa Inggris ada Bapak Pansera, dan untuk Guru Mata Pelajaran Bahasa Indonesia adalah Bapak Ihsan. Untuk Guru Fisika adalah Bapak Ruli Handrian<br><br>Semua modul pembelajaran akan dimasukkan kedalam aplikasi LMS ini, jadi tolong rajin2 untuk membuka LMS ini.Terima kasih.<br>Bapak Fazhar.</p>`
                        }} />

                        <FeedClassComponent data={{
                            picture: AuthState.foto,
                            name: AuthState.fullName,
                            status: 'Tutor',
                            createdTime: new Date("October 13, 2018 11:13:00"),
                            post:  `<p>'Selamat Datang'<br><br>Perkenalkan saya adalah Guru Kelas dari SMAN 1 Cihampelas Kelas XI.<br>Untuk Guru Mata Pelajaran Matematika adalah Bapak Al Bahri, untuk Guru Mata Pelajaran Bahasa Inggris ada Bapak Pansera, dan untuk Guru Mata Pelajaran Bahasa Indonesia adalah Bapak Ihsan. Untuk Guru Fisika adalah Bapak Ruli Handrian<br><br>Semua modul pembelajaran akan dimasukkan kedalam aplikasi LMS ini, jadi tolong rajin2 untuk membuka LMS ini.Terima kasih.<br>Bapak Fazhar.</p>`
                        }} />
                    </ScrollView>
                </View>
                <View style={{
                    marginTop: 20,
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
                            <Text fontWeight={fonts.medium} size={14} color={colors.textPrimary}>{`Anggota Kelas (${20})`}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                            <TouchableOpacity onPress={moreAnggota}>
                                <Text fontWeight={fonts.semiBold} size={14} color={colors.textSecondary}>{`Lihat Semua >`}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ScrollView 
                        horizontal 
                        showsHorizontalScrollIndicator={false}
                    >
                        <AnggotaComponent data={{foto: AuthState.foto, nama: AuthState.fullName, sekolah: 'SMAN 1 Tajurhalang'}} />
                        <AnggotaComponent data={{foto: AuthState.foto, nama: AuthState.fullName, sekolah: 'SMAN 1 Tajurhalang'}} />
                        <AnggotaComponent data={{foto: AuthState.foto, nama: AuthState.fullName, sekolah: 'SMAN 1 Tajurhalang'}} />
                        <AnggotaComponent data={{foto: AuthState.foto, nama: AuthState.fullName, sekolah: 'SMAN 1 Tajurhalang'}} />
                        <AnggotaComponent data={{foto: AuthState.foto, nama: AuthState.fullName, sekolah: 'SMAN 1 Tajurhalang'}} />
                        <AnggotaComponent data={{foto: AuthState.foto, nama: AuthState.fullName, sekolah: 'SMAN 1 Tajurhalang'}} />
                    </ScrollView>
                </View>
            </View>
        </ScrollView>
    )
}

export default ClassDetailsScreen;