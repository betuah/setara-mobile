import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useWindowDimensions, View } from 'react-native';
import { useTheme, Card, Portal, Modal, TextInput } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import Toast from 'react-native-toast-message';

import * as profileAct from '../../store/actions/profileActions';

const UserReport_Modal = ({visible, onDismiss}) => {
    const { colors, fonts } = useTheme()
    const dispatch = useDispatch()
    const [ input, setInput ] = useState({
        judul: '',
        detail: ''
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
            judul: '',
            detail: ''
        })
    }

    const submit = () => {
        try {
            dismiss(false)
            dispatch(profileAct.report(input))
            Toast.show({
                type: 'success',
                text1: 'Terima Kasih!',
                text2: 'Saran kamu telah di kirim.'
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
            }
            Toast.show({
                type: 'error',
                text1: 'Ops.. Maaf!',
                text2: 'Terjadi Kesalahan. Coba beberapa saat lagi ya..'
            });
            dismiss(false)
        }
    }

    const InputTheme = {
        colors: { 
            placeholder: colors.primary,
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
                height: useWindowDimensions().height * 0.55,
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
                            marginTop: 5,
                        }} size={14} 
                        fontWeight={fonts.semiBold} 
                        color={colors.textWhite}
                    >
                        Laporan Permasalahan
                    </Text>
                    <Text 
                        style={{
                            textAlign: 'center',
                            marginBottom: 5,
                        }} size={10} 
                        fontWeight={fonts.regular} 
                        color={colors.textWhite}
                    >
                        Apabila terjadi permasalah pada applikasi jangan sungkan untuk melaporkan kepada kami.
                    </Text>
                </View>
                <View style={{
                    flex: 1,
                    paddingHorizontal: 15,
                    paddingTop: 10,
                }}>
                    <TextInput 
                        mode='outlined'
                        label='Judul Masalah'
                        dense={true}
                        editable={true}
                        theme={InputTheme}
                        selectionColor={colors.primary}
                        style={{
                            fontSize: 12,
                            marginBottom: 5,
                        }}
                        value={input.judul}
                        onChangeText={text => onInputChange(text, 'judul')}
                    />
                    <TextInput 
                        mode='outlined'
                        label='Detail Masalah'
                        multiline={true}
                        numberOfLines={10}
                        dense={true}
                        editable={true}
                        selectionColor={colors.primary}
                        style={{
                            fontSize: 12,
                        }}
                        theme={InputTheme}
                        value={input.detail}
                        onChangeText={text => onInputChange(text, 'detail')}
                    />
                </View>
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
                        title='Kirim' 
                        mode="text" 
                    />
                </View>
            </Card>
        </Modal>
        </Portal>
    )
}

export default UserReport_Modal;