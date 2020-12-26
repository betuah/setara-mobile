import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowDimensions, View } from 'react-native';
import { useTheme, Card, Portal, Modal } from 'react-native-paper';
import { Text, Btn, Input } from '../common/UtilsComponent';
import Toast from 'react-native-toast-message';
import LottieView from 'lottie-react-native';

import * as profileAct from '../../store/actions/profileActions';

const ChangePass_Modal = ({visible, onDismiss}) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()

    const [isLoading, setLoading] = useState(false)
    const [ input, setInput ] = useState({
        oldpass: '',
        newpass: '',
        confirmNewPass: '',
    })

    const onInputChange = (value, key) => {
        setInput({
            ...input,
            [key]: value,
        })
    }

    const dismiss = () => {
        onDismiss(false)
        setInput({
            oldpass: '',
            newpass: '',
            confirmNewPass: '',
        })
    }

    const submit = async () => {
        if (input.newpass.trim() === '' || input.oldpass.trim() === '' || input.confirmNewPass.trim() === '') {
            Toast.show({
                type: 'error',
                text1: 'Password tidak boleh kosong!',
                text2: 'Kamu belum melengkapi semua atau salah satu dari formulir ubah password.'
            });
        } else if (input.newpass !== input.confirmNewPass) {
            Toast.show({
                type: 'error',
                text1: 'Password Baru tidak sesuai!',
                text2: 'Periksa kembali password baru dan confirmasi password kamu ya.'
            });
        } else if (input.newpass.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Keamanan Password!',
                text2: 'Password harus memiliki panjang minimal 8 karakter.'
            });
        } else {
            try {
                setLoading(true)
                await dispatch(profileAct.resetPass(input))
                dismiss(false)
                setLoading(false)
                Toast.show({
                    type: 'success',
                    text1: 'Ubah Password Berhasil!',
                    text2: 'Perubahan password kamu telah di simpan.'
                });
            } catch (error) {
                if (error === 'ERR_GENERATE_TOKEN') {
                    dispatch(authAct.signOut(true))
                    Toast.show({
                        type: 'error',
                        text1: 'Maaf, Sesi kamu telah Habis!',
                        text2: 'Silahkan masuk kembali.'
                    });
                    dismiss(false)
                    setLoading(false)
                } else {
                    Toast.show({
                        type: 'error',
                        text1: 'Ubah Password Gagal!',
                        text2: error
                    });
                    setLoading(false)
                }
                setLoading(false)
            }
        }
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

    return (
        <Portal>
        <Modal 
            visible={visible}
            onDismiss={() => onDismiss(false)}
            contentContainerStyle={{
                alignItems: 'center'
            }}
        >
            <Card style={{
                borderRadius: 15,
                height: useWindowDimensions().height * 0.48,
                width: useWindowDimensions().width * 0.85,
            }}>
                <View style={{
                    paddingHorizontal: 10,
                    paddingVertical: 10,
                    backgroundColor: colors.bgPrimary,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>
                    <Text 
                        style={{
                            textAlign: 'center', 
                            marginVertical: 5,
                        }} size={14} 
                        fontWeight={fonts.semiBold} 
                        color={colors.textWhite}
                    >
                        Ubah Password
                    </Text>
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
                    <View style={{
                        flex: 1,
                        paddingHorizontal: 15,
                    }}>
                        <Input
                            label="Password Lama"
                            placeholder="Password Lama Kamu"
                            value={input.oldpass}
                            IconName='lock'
                            color={colors.accent}
                            defaultStyle={InputDefaultStyle}
                            secureTextEntry={true}
                            onChangeText={e => onInputChange(e, 'oldpass')}
                        />
                        <Input
                            label="Password Baru"
                            placeholder="Password Baru Kamu"
                            value={input.newpass}
                            IconName='lock'
                            color={colors.accent}
                            defaultStyle={InputDefaultStyle}
                            secureTextEntry={true}
                            onChangeText={e => onInputChange(e, 'newpass')}
                        />
                        <Input
                            label="Konfirmasi Password Baru"
                            placeholder="Masukan kembali Password Baru Kamu"
                            value={input.confirmNewPass}
                            IconName='lock'
                            color={colors.accent}
                            defaultStyle={InputDefaultStyle}
                            secureTextEntry={true}
                            onChangeText={e => onInputChange(e, 'confirmNewPass')}
                        />
                    </View>
                }
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    paddingVertical: 10,
                }}>
                    <Btn
                        onPress={() => dismiss()}
                        fontColor={colors.textGreyLight}
                        fontSize={12}
                        title='Tutup' 
                        mode="text" 
                    />
                    <Btn
                        onPress={() => submit()}
                        fontColor={colors.textPrimary}
                        fontSize={12}
                        title='Simpan' 
                        mode="text" 
                    />
                </View>
            </Card>
        </Modal>
        </Portal>
    )
}

export default ChangePass_Modal;