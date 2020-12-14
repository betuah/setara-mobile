import React, { Fragment, useEffect, useState } from 'react';
import { Image, Keyboard, TouchableWithoutFeedback, View, RefreshControl, ScrollView } from 'react-native';
import { Card, useTheme, RadioButton, Paragraph, Title, Divider, Caption, Portal, Modal, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { Chase } from 'react-native-animated-spinkit';
import ImagePicker from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import { Text, Input, Btn } from '../../../components/common/UtilsComponent'
import * as profileAction from '../../../store/actions/profileActions';
import ImageBackground from 'react-native/Libraries/Image/ImageBackground';

const ProfileEditScreen = ({ navigation }) => {
    const { colors, fonts } = useTheme()
    const profileState = useSelector(state => state.profile)
    const [modal, setModal] = useState(false)
    const dispatch = useDispatch()

    const [ test, setTest] = useState({
        avatarSource: null,
        pic: null,
    })
    const [ error, setError ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ data, setData ] = useState({
        profile: null,
        error: {}
    })

    useEffect(() => {
        if (data.profile === null && profileState.profile) {
            setData({profile: profileState.profile, error: {}})
        }

        navigation.setOptions({
            headerRight: () => {
                return (
                    <Btn
                        onPress={saveAction}
                        mode='text'
                        style={{marginRight: 5}}
                        Icon={{
                            name: 'content-save-outline',
                            size: 25
                        }}
                        fontStyle={{color: colors.white}}
                    />
                )
            }
        })
    },[profileState, data])

    const saveAction = async () => {
        try {
            dispatch(profileAction.updateData(data.profile))

            Toast.show({
                type: 'success',
                text1: 'Data kamu berhasil di simpan!',
            });
        } catch (error) {
            Toast.show({
                type: 'error',
                text1: 'Maaf, Gagal mengubah data!',
                text2: error
            });
        }
    }

    const hideModal = () => setModal(false)

    const UploadImage = (req) => {
        setModal(true)

        const options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
            saveToPhotos: false
        };

        if (req === 'camera') {
            ImagePicker.launchCamera(options, response => {
                if (response.error) {
                    console.log(error)

                    return Toast.show({
                        type: 'error',
                        text1: 'Gagal Unggah Foto!',
                        text2: 'Pastikan Kamu sudah memberikan izin untuk menggunakan camera ya.'
                    });
                } else if (response.uri) {
                    setData({
                        ...data,
                        profile: {
                            ...data.profile,
                            foto: response.uri
                        }
                    })
    
                    Toast.show({
                        type: 'success',
                        text1: 'Unggah Foto berhasil, Jangan lupa di simpan ya.',
                    });
                }

                setModal(false)
            })
        } 
        
        if (req === 'library') {
            ImagePicker.launchImageLibrary(options, response => {
                if (response.error) {
                    Toast.show({
                        type: 'error',
                        text1: 'Gagal Unggah Foto!',
                        text2: 'Pastikan Kamu sudah memberikan izin untuk menggunakan camera ya.'
                    });
                } else if (response.uri) {
                    setData({
                        ...data,
                        profile: {
                            ...data.profile,
                            foto: response.uri
                        }
                    })
    
                    Toast.show({
                        type: 'success',
                        text1: 'Unggah Foto berhasil, Jangan lupa di simpan ya.',
                    });
                }

                setModal(false)
            })
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
        selectionColor: colors.secondary,
        underlineColor: colors.secondary,
        fontSize: 12,
        IconColor: colors.secondary,
        IconSize: 16,
        theme: {
            colors: { 
                text: colors.secondary,
                placeholder: colors.secondary,
                error: colors.accent,
                primary: colors.secondary
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
                backgroundColor: colors.loadingBackground
            }}>
                <Chase size={48} color={colors.secondary}></Chase>
            </View>
        )

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Fragment>
            <Portal>
                <Modal visible={modal} onDismiss={hideModal}>
                    <Card style={{
                        margin: 30,
                        paddingVertical: 20,
                        borderBottomColor: colors.secondary,
                        borderRadius: 20,
                        elevation: 3,
                        shadowOffset: { width: 0, height: 3 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                    }}>
                        <View style={{
                            borderBottomColor: colors.secondary,
                            borderBottomWidth: 1,
                            paddingBottom: 10
                        }}>
                            <Text style={{textAlign: 'center'}} weight='bold' size={20}>Pilih Foto</Text>
                        </View>
                        <List.Item
                            onPress={() => UploadImage('camera')}
                            title="Ambil Foto dari Kamera"
                            titleStyle={{color: colors.secondary, fontSize: 16}}
                            left={props => <List.Icon color={colors.secondary} icon="camera" />}
                            style={{ paddingVertical: 0 }}
                        />
                        <List.Item
                            onPress={() => UploadImage('library')}
                            title="Pilih Foto dari Galery"
                            titleStyle={{color: colors.secondary, fontSize: 16}}
                            left={props => <List.Icon color={colors.secondary} icon="folder-image" />}
                            style={{ paddingVertical: 0 }}
                        />
                    </Card>
                </Modal>
            </Portal>
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <View style={{flex: 1}}>
                    <Card style={{
                        backgroundColor: colors.cyan,
                        paddingVertical: 25,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 0,
                        elevation: 3,
                        shadowOffset: { width: 2, height: 3 },
                        shadowOpacity: 0.5,
                        shadowRadius: 3,
                    }}>
                        <ImageBackground 
                            source={{ uri: data.profile.foto }}
                            style={{flex: 1,}}
                            resizeMode="cover"
                        >

                        </ImageBackground>
                        {/* <View style={{
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image 
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderWidth: 3,
                                    // borderRadius: 100,
                                    // borderColor: colors.bgWhite
                                }}
                                source={{ uri: data.profile.foto }}   
                            />
                        </View>

                        <Btn
                            onPress={UploadImage}
                            mode='outlined'
                            Icon={{
                                name: 'upload',
                                size: 18,
                                color: colors.textWhite
                            }}
                            title='Unggah Foto'
                            style={{
                                marginTop: 15,
                                borderColor: colors.textWhite,
                                borderRadius: 30,
                                borderWidth: 2,
                            }}
                            fontStyle={{color: colors.textWhite, ...fonts.semiBold, justifyContent: 'center'}}
                        /> */}
                    </Card>

                    <Text style={{
                        marginHorizontal: 15, 
                        paddingVertical: 10, 
                        color: colors.secondary,
                        borderBottomWidth: 1, 
                        textAlign: 'center',
                        borderBottomColor: colors.secondary
                    }}>
                        BIODATA
                    </Text>

                    <Card style={{
                        marginHorizontal: 10,
                        marginVertical: 15,
                        elevation: 4,
                        borderTopWidth: 3,
                        borderBottomWidth: 3,
                        borderTopColor: colors.secondary,
                        borderBottomColor: colors.secondary,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                    }}>
                        <Card.Content>
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
                                        value={data.profile.jk}
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
                                        value={data.profile.jk}
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
                                                <Text>Laki - Laki</Text>
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
                                                <Text>Perempuan</Text>
                                                <RadioButton value="Perempuan" />
                                            </View>
                                        </View>
                                    </RadioButton.Group>
                                </View>
                            </View>
                            
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
                        </Card.Content>
                    </Card>

                    <Text 
                        color={colors.secondary}
                        style={{
                            marginHorizontal: 15, 
                            paddingVertical: 10, 
                            borderBottomWidth: 1, 
                            textAlign: 'center',
                            borderBottomColor: colors.secondary,
                        }}
                    >
                        SOCIAL MEDIA
                    </Text>

                    <Card style={{
                        marginHorizontal: 10,
                        marginVertical: 15,
                        elevation: 4,
                        borderTopWidth: 3,
                        borderBottomWidth: 3,
                        borderTopColor: colors.secondary,
                        borderBottomColor: colors.secondary,
                        marginBottom: 20,
                        shadowOffset: { width: 0, height: 4 },
                        shadowOpacity: 0.5,
                        shadowRadius: 4,
                    }}>
                        <Card.Content>
                            <Input
                                label="Website"
                                placeholder="Alamat Website Kamu"
                                value={data.profile.website}
                                IconName='earth'
                                color={colors.accent}
                                defaultStyle={InputDefaultStyle}
                                onChangeText={e => onInputChange(e, 'website')}
                                errorVisible={data.error.nama ? true : false}
                                errorMassage={data.error.nama}
                            />
                            <Input
                                label="Facebook"
                                placeholder="Akun facebook kamu"
                                value={data.profile.facebook}
                                IconName='facebook'
                                color={colors.accent}
                                defaultStyle={InputDefaultStyle}
                                onChangeText={e => onInputChange(e, 'facebook')}
                                errorVisible={data.error.email ? true : false}
                                errorMassage={data.error.email}
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
                                errorVisible={data.error.sekolah ? true : false}
                                errorMassage={data.error.sekolah}
                            />
                        </Card.Content>
                    </Card>
                </View>
            </ScrollView>
            </Fragment>
        </TouchableWithoutFeedback>
    )
}

export default ProfileEditScreen;