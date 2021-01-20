import React, { useState } from 'react';
import { Dimensions, View, KeyboardAvoidingView } from 'react-native';
import { useTheme, Card, Divider } from 'react-native-paper';
import { Text, Btn, Input } from '../common/UtilsComponent';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; 

const JoinClass_Modal = ({visible, onDismiss, onChange, onSubmit, value}) => {
    const { colors, fonts } = useTheme()

    const InputDefaultStyle = {
        selectionColor: colors.bgPrimary,
        underlineColor: colors.bgPrimary,
        fontSize: 12,
        theme: {
            colors: { 
                text: colors.bgPrimary,
                placeholder: colors.bgPrimary,
                error: colors.accent,
                primary: colors.bgPrimary
            },
        }
    }

    return (
        <Modal 
            isVisible={visible}
            onBackdropPress={() => onDismiss()}
            onSwipeComplete={() => onDismiss()}
            swipeDirection={['down']}
            style={{
                justifyContent: 'flex-end',
                margin: 0
            }}
        >
            <Card style={{
                backgroundColor: colors.bgPrimary,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20,
                height: Dimensions.get('window').height * 0.35
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingBottom: 5,
                    paddingTop: 10,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                    <Divider 
                        style={{
                            borderRadius: 10,
                            marginBottom: 5,
                            height: 3,
                            width: 50,
                            backgroundColor: colors.textLightAccent,
                        }}
                    />
                    <View 
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 8,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            padding: 15,
                        }}
                    >
                        <Icon name='close' size={16} color={colors.bgWhite} />
                    </View>
                    <Text size={15} fontWeight={fonts.bold} color={colors.textWhite}>GABUNG KELAS</Text>
                    <Text size={11} fontWeight={fonts.regular} color={colors.textWhite}>Bergabung dengan kelas yang ingin kamu ikuti.</Text>
                </View>
                <View style={{
                    paddingLeft: 18,
                    paddingRight: 23,
                    paddingTop: 10,
                    paddingBottom: 20,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: colors.bgWhite,
                    flexDirection: 'column',
                    flex: 1,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginBottom: 10
                    }}>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Icon name='qr-code-outline' size={20} color={colors.bgPrimary} />
                        </View>
                        <View style={{flex: 10, justifyContent: 'center'}}>
<<<<<<< HEAD
                        <KeyboardAvoidingView
                            behavior={Platform.OS == "ios" ? "padding" : "height"}
                        >
                            <Input
                                label="Kode Kelas"
                                placeholder="Masukan kode kelas"
                                value={value}
                                color={colors.accent}
                                defaultStyle={InputDefaultStyle}
                                onChangeText={e => onChange(e)}
                                autoCapitalize='characters'
                            />
                        </KeyboardAvoidingView>
=======
                            <KeyboardAvoidingView
                                behavior={Platform.OS == "ios" ? "padding" : "height"}
                            >
                                <Input
                                    label="Kode Kelas"
                                    placeholder="Masukan kode kelas"
                                    value={value}
                                    color={colors.accent}
                                    defaultStyle={InputDefaultStyle}
                                    onChangeText={e => onChange(e)}
                                    autoCapitalize='characters'
                                />
                            </KeyboardAvoidingView>
>>>>>>> bb843262d75eae6b0310856b0eb07d849f648f53
                        </View>
                    </View>
                    <View style={{
                        marginTop: 10,
                        marginBottom: 15,
                    }}>
                        <Btn 
                            onPress={() => onSubmit()}
                            title='Gabung Kelas'
                            color={colors.bgPrimary}
                            fontColor={colors.textWhite}
                            fontSize={12}
                            fontWeight={fonts.semiBold}
                            style={{
                                borderRadius: 10,
                            }}
                        />
                    </View>
                </View>
            </Card>
        </Modal>
    )
}

export default JoinClass_Modal;