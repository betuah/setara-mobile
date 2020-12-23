import React, { useEffect, useState } from 'react';
import { Image, StatusBar, View, RefreshControl, ScrollView, KeyboardAvoidingView, Platform, PermissionsAndroid } from 'react-native';
import { useTheme, RadioButton, Divider, Portal, Modal, List, FAB } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { Text, Input, Btn } from '../../../components/common/UtilsComponent'
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';

import * as profileAct from '../../../store/actions/profileActions';
import * as authAct from '../../../store/actions/authAction';

import LoadingModal from '../../../components/modal_component/Loading_Modal';

const ProfileEditScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const profileState = useSelector(state => state.profile)
    const [modal, setModal] = useState(false)
    const [fabOpen, setFabOpen] = useState(false)
    const dispatch = useDispatch()

    const [ error, setError ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ isLoading, setLoading ] = useState(false)
    const [ data, setData ] = useState({
        profile: null,
        error: {}
    })

    const updateData = () => {
        setData({
            profile: { 
                ...profileState.profile,
                ...{ 
                    website: profileState.profile.sosmed.website,
                    facebook: profileState.profile.sosmed.facebook,
                    linkedin: profileState.profile.sosmed.linkedin,
                    twitter: profileState.profile.sosmed.twitter
                },
            }, 
            error: {}
        })
    }

    useEffect(() => {
        if (data.profile === null && profileState.profile) {
            updateData()
        }

        Orientation.lockToPortrait()
    },[profileState, data])

    const saveAction = async () => {
        try {
            setLoading(true)
            await dispatch(profileAct.updateData(data.profile))
            setLoading(false)
            Toast.show({
                type: 'success',
                text1: 'Data kamu berhasil di simpan!',
            });
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
                text1: 'Maaf, Gagal mengubah data!',
                text2: error
            });
            setLoading(false)
        }
    }

    const hideModal = () => setModal(false)

    const UploadImage = async (req) => {
        setModal(true)

        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            saveToPhotos: false
        };

        const setCamera = () => launchCamera(options, async response => {
            if (response.error) {
                return Toast.show({
                    type: 'error',
                    text1: 'Gagal Unggah Foto!',
                    text2: 'Pastikan Kamu sudah memberikan izin untuk menggunakan camera ya.'
                });
            } else if (response.uri) {
                setModal(false)
                setLoading(true)
                await dispatch(profileAct.updateAvatar(response, profileState.profile.id))
                setLoading(false)
                updateData()
                Toast.show({
                    type: 'success',
                    text1: 'Yey.. Unggah Foto kamu berhasil.',
                });
            }

            setModal(false)
        })

        const setGalery = () => launchImageLibrary(options, async response => {
            if (response.error) {
                Toast.show({
                    type: 'error',
                    text1: 'Gagal Unggah Foto!',
                    text2: 'Pastikan Kamu sudah memberikan izin untuk menggunakan camera ya.'
                });
            } else if (response.uri) {
                setModal(false)
                setLoading(true)
                await dispatch(profileAct.updateAvatar(response, profileState.profile.id))
                setLoading(false)
                updateData()
                Toast.show({
                    type: 'success',
                    text1: 'Yey.. Unggah Foto kamu berhasil.',
                });
            }
        })        

        if (req === 'camera') {

            const granted = Platform.OS === 'android' && await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Perizinan Camera",
                    message:"SetaraDaring membutuhkan akses kamera kamu. ",
                    buttonNegative: "Tolak",
                    buttonPositive: "Izinkan"
                }
            );

            if ( Platform.OS === 'ios' || (Platform.OS === 'android' && granted === PermissionsAndroid.RESULTS.GRANTED)) {
                setCamera()
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Info Unggah Foto dengan Camera!',
                    text2: 'Kamu tidak dapat upload foto sampai kamu mengubah pengaturan perizinan applikasi.'
                });
            }
        } 
        
        if (req === 'library') {
            const granted = Platform.OS === 'android' &&  await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: "Perizinan Penyimpanan Data",
                message:"SetaraDaring membutuhkan akses penyimpanan kamu untuk keperluan unggah foto dan file.",
                buttonNegative: "Tolak",
                buttonPositive: "Izinkan"
            }
            );

            if ( Platform.OS === 'ios' || (Platform.OS === 'android' && granted === PermissionsAndroid.RESULTS.GRANTED)) {
                setGalery()
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Info Unggah Foto dengan Camera!',
                    text2: 'Kamu tidak dapat upload foto sampai kamu mengubah pengaturan perizinan applikasi.'
                });
            }
        }
    };

    const onRefresh = () => {
        setData({
            profile: null,
            error: {}
        })
    }

    const onInputChange = (value, input) => {
        setData({
            ...data,
            profile: {
                ...data.profile,
                [input]: value,
            },
            error: {}
        })
    }

    const InputDefaultStyle = {
        selectionColor: colors.primary,
        underlineColor: colors.primary,
        fontSize: 11,
        IconColor: colors.bgPrimary,
        IconSize: 18,
        theme: {
            colors: { 
                text: colors.grey,
                placeholder: colors.primary,
                error: colors.red,
                primary: colors.primary
            },
        }
    }

    if (error === true) 
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.loadingBackground
            }}>
                <Text style={{textAlign: 'center'}} size={16}>Maaf Terjadi Kesalahan, Scroll Ke bawah ya untuk menyegarakan Tampilan.</Text>
            </View>
        )
    
    if (data.profile === null && error === false) 
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.bgLightBlue
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
        )

    return (
        <View style={{
            backgroundColor: colors.softBlue
        }}>
        <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
        <LoadingModal visible={isLoading} />
        <FAB.Group
            open={fabOpen}
            style={{
                position: 'absolute',
                margin: 0,
                right: 0,
                bottom: 0,
                left: 0,
                top: 0,
                zIndex: 1,
            }}
            color={colors.textWhite}
            fabStyle={{backgroundColor: colors.primary}}
            icon={fabOpen ? "close" : "feather"}
            actions={[
                {
                    color: colors.bgWhite,
                    icon: 'content-save',
                    label: 'Simpan',
                    style: {
                        backgroundColor: colors.deepGreen
                    },
                    onPress: () => saveAction(),
                },
            ]}
            onStateChange={() => setFabOpen(!fabOpen)}
        />
        <Portal>
            <Modal 
                visible={modal} 
                onDismiss={hideModal}
                contentContainerStyle={{
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View style={{
                    backgroundColor: colors.bgWhite,
                    width: '70%',
                    borderRadius: 10,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.3,
                    shadowRadius: 1,
                }}>
                    <View style={{
                        paddingVertical: 10,
                        backgroundColor: colors.bgPrimary,
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10,
                    }}>
                        <Text style={{textAlign: 'center'}} color={colors.textWhite} fontWeight={{...fonts.semiBold}} size={14}>Pilih Foto</Text>
                    </View>
                    <List.Item
                        onPress={() => UploadImage('camera')}
                        title="Ambil Foto dari Kamera"
                        titleStyle={{color: colors.grey, ...fonts.regular, fontSize: 12}}
                        left={props => <List.Icon color={colors.bgPrimary} icon="camera" />}
                        style={{ paddingVertical: 0 }}
                    />
                    <List.Item
                        onPress={() => UploadImage('library')}
                        title="Pilih Foto dari Galery"
                        titleStyle={{color: colors.grey, fontSize: 12}}
                        left={props => <List.Icon color={colors.bgPrimary} icon="folder-image" />}
                        style={{ paddingVertical: 0 }}
                    />
                </View>
            </Modal>
        </Portal>
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl colors={[`${colors.orange}`]} refreshing={refreshing} onRefresh={onRefresh} />
                }
            >                
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    marginBottom: Platform.OS === 'ios' ? 3 : 0,
                }}>
                    <ImageBackground 
                        source={require('../../../assets/images/icon_pattern.png')}
                        style={{
                            flex: 1,
                            paddingTop: 20,
                            padding: 15,
                        }}
                        resizeMode="cover"
                    >
                        <View
                            style={{
                                position: 'absolute',
                                left: 0,
                                right: 0,
                                top: 0,
                                bottom: 0,
                                alignItems: 'center',
                                paddingTop: 30,
                                paddingLeft: 70,
                                zIndex: 100,
                            }}
                        >
                            <TouchableOpacity 
                                onPress={() => UploadImage()}
                                activeOpacity={0.7}
                            >
                                <View style={{
                                    backgroundColor: colors.textPrimary,
                                    padding: 5,
                                    borderRadius: 100,
                                }}>
                                    <Icon name='camera' size={16} color={colors.textWhite} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            { data.profile.foto ? 
                                <TouchableOpacity 
                                    onPress={() => UploadImage()}
                                    activeOpacity={0.7}
                                >
                                    <Image 
                                        style={{
                                            width: 80,
                                            height: 80,
                                            borderWidth: 3,
                                            borderRadius: 50,
                                            borderColor: colors.bgWhite,
                                        }}
                                        source={{ uri: data.profile.foto }}                                            
                                    />
                                </TouchableOpacity>
                                :
                                <TouchableOpacity 
                                    onPress={() => UploadImage()}
                                    activeOpacity={0.7}
                                >
                                    <View style={{
                                        width: 80,
                                        height: 80,
                                        borderWidth: 3,
                                        borderRadius: 50,
                                        borderColor: colors.bgWhite,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        backgroundColor: colors.purple2
                                    }}>
                                        <Text
                                            color={colors.textWhite}
                                            style={{fontWeight: 'bold'}}
                                            size={20}
                                        >
                                            { data.profile.nama.split(" ").length === 1 ? data.profile.nama.substring(0, 1).toUpperCase() : `${data.profile.nama.split(" ")[0].substring(0, 1).toUpperCase()}${data.profile.nama.split(" ")[1].substring(0, 1).toUpperCase()}` }
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            }
                        </View>
                        <View style={{
                            alignItems: 'center',
                            flexDirection: 'column',
                            marginTop: 10,
                            paddingHorizontal: 10,
                        }}>
                            <View style={{
                                marginBottom: 5,
                                alignItems: 'center',
                            }}>
                                <Text 
                                    fontWeight={{...fonts.semiBold}}
                                    size={16}
                                    color={colors.textWhite}
                                >
                                    { data.profile.nama }
                                </Text>
                                <Text 
                                    fontWeight={{...fonts.regular}}
                                    size={10}
                                    color={colors.textWhite}
                                >
                                    { `${data.profile.username}` }
                                </Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{
                    
                }}>
                    <ImageBackground 
                        source={require('../../../assets/images/bgScreenSoftBlue.png')}
                        style={{flex: 1, padding: 10,}}
                        resizeMode="cover"
                    >                    
                        <View style={{
                            backgroundColor: colors.bgWhite,
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 2,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                paddingHorizontal: 10,
                                paddingBottom: 10,
                            }}>
                                <View style={{
                                    marginVertical: 10,
                                    justifyContent: 'center',
                                }}>
                                    <Text 
                                        fontWeight={{...fonts.semiBold}}
                                        color={colors.textPrimary}
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
                                </View>
                                <View>
                                    <Input
                                        label="Nama Lengkap"
                                        placeholder="Nama Lengkap Kamu"
                                        value={data.profile.nama}
                                        IconName='account-tie'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'nama')}
                                        errorVisible={data.error.nama ? true : false}
                                        errorMassage={data.error.nama}
                                    />
                                    <Input
                                        label="Email"
                                        placeholder="Alamat email kamu"
                                        value={data.profile.email}
                                        IconName='email'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'email')}
                                        errorVisible={data.error.email ? true : false}
                                        errorMassage={data.error.email}
                                    />

                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <View style={{flex: 1}}>
                                            <Input
                                                label="Gender"
                                                disabled={true}
                                                placeholder="Jenis Kelamin kamu"
                                                value={data.profile.jk ? data.profile.jk : "Laki - Laki"}
                                                IconName='gender-male-female'
                                                color={colors.accent}
                                                defaultStyle={InputDefaultStyle}
                                                onChangeText={e => onInputChange(e, 'jk')}
                                                errorVisible={data.error.jk ? true : false}
                                                errorMassage={data.error.jk}
                                            />
                                        </View>
                                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                                            <RadioButton.Group 
                                                onValueChange={newValue => setData({
                                                    ...data,
                                                    profile: {
                                                        ...data.profile,
                                                        jk: newValue
                                                    }
                                                })} 
                                                value={data.profile.jk ? data.profile.jk : "Laki - Laki"}
                                            >
                                                <View
                                                    style={{
                                                        flexDirection: 'row',
                                                    }}
                                                >
                                                    <View style={{
                                                        paddingHorizontal: 10,
                                                        paddingTop: 10,
                                                        alignItems: 'center',
                                                        justifyContent: 'center'
                                                    }}>
                                                        <Text color={colors.primary} size={12}>Laki - Laki</Text>
                                                        <RadioButton value="Laki - Laki" />
                                                    </View>
                                                    <View
                                                        style={{
                                                            paddingHorizontal: 10,
                                                            paddingTop: 10,
                                                            alignItems: 'center',
                                                            justifyContent: 'center'
                                                        }}
                                                    >
                                                        <Text color={colors.primary} size={12}>Perempuan</Text>
                                                        <RadioButton value="Perempuan" />
                                                    </View>
                                                </View>
                                            </RadioButton.Group>
                                        </View>
                                    </View>
                                    <Divider style={{height: 1, backgroundColor: colors.bgPrimary}} />
                                    <Input
                                        label="Sekolah"
                                        placeholder="Nama sekolah atau Institusi kamu"
                                        value={data.profile.sekolah}
                                        IconName='school'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'sekolah')}
                                        errorVisible={data.error.sekolah ? true : false}
                                        errorMassage={data.error.sekolah}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: colors.bgWhite,
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 2,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}>
                            <View style={{
                                flexDirection: 'column',
                                paddingHorizontal: 10,
                                paddingBottom: 10,
                            }}>
                                <View style={{
                                    marginVertical: 10,
                                    justifyContent: 'center',
                                }}>
                                    <Text 
                                        fontWeight={{...fonts.semiBold}}
                                        color={colors.textPrimary}
                                        size={14}
                                    >
                                        S O C I A L  M E D I A
                                    </Text>
                                </View>
                                <Divider style={{height: 0.5}}/>
                                <View style={{
                                    flexDirection: 'row',
                                    marginTop: 5,
                                }}>
                                </View>
                                <View>
                                <Input
                                        label="Website"
                                        placeholder="Alamat Website Kamu"
                                        value={data.profile.website}
                                        IconName='earth'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'website')}
                                        errorVisible={data.error.website ? true : false}
                                        errorMassage={data.error.website}
                                    />
                                    <Input
                                        label="Facebook"
                                        placeholder="Akun facebook kamu"
                                        value={data.profile.facebook}
                                        IconName='facebook'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'facebook')}
                                        errorVisible={data.error.facebook ? true : false}
                                        errorMassage={data.error.facebook}
                                    />
                                    <Input
                                        label="LinkedIn"
                                        placeholder="Akun LinkedIn Kamu"
                                        value={data.profile.linkedin}
                                        IconName='linkedin'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'linkedin')}
                                        errorVisible={data.error.jk ? true : false}
                                        errorMassage={data.error.jk}
                                    />
                                    <Input
                                        label="Twitter"
                                        placeholder="Akun twitter kamu"
                                        value={data.profile.twitter}
                                        IconName='twitter'
                                        color={colors.accent}
                                        defaultStyle={InputDefaultStyle}
                                        onChangeText={e => onInputChange(e, 'twitter')}
                                        errorVisible={data.error.twitter ? true : false}
                                        errorMassage={data.error.twitter}
                                    />
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        </View>
    )
}

export default ProfileEditScreen;