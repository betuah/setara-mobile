import React from 'react';
import { useWindowDimensions, View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Card, Divider, useTheme } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import HTML from 'react-native-render-html';
import env from '../../config/baseUrl';

const Silabus_Modal = ({visible, onDismiss, silabus}) => {
    const { colors, fonts } = useTheme()
    const insets = useSafeAreaInsets();

    const EmptySilabus = `<div style="display: flex; justify-content: center; align-items: center;"><h3 style="color: ${colors.textPrimary};">Silabus Tidak Tersedia.</h3></div>`

    return (
        <Modal
            isVisible={visible}
            onBackdropPress={() => onDismiss('silabus')}
            style={{
                margin: 0,
                justifyContent: 'flex-end',
            }}
        >
            <Card style={{
                height: useWindowDimensions().height * 0.8,
                backgroundColor: colors.bgWhite,
                borderTopRightRadius: 15,
                borderTopLeftRadius: 15,
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            }}>
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 15,
                    borderTopLeftRadius: 15,
                    elevation: 2,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                }}>
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 0,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            padding: 15,
                            zIndex: 100,
                        }}
                    >
                        <TouchableOpacity onPress={() => onDismiss('silabus')}>
                            <Icon name='close' size={16} color={colors.textWhite} />
                        </TouchableOpacity>
                        
                    </View>
                    <Text size={16} fontWeight={fonts.bold} color={colors.textWhite}>SILABUS</Text>
                    <Text size={11} fontWeight={fonts.regular} color={colors.textWhite}>Informasi mengenai mata pelajaran yang kamu pilih.</Text>
                </View>
                <ScrollView contentContainerStyle={{
                    paddingHorizontal: 13,
                    paddingVertical: 10,
                }}>
                    <HTML 
                        html={visible ? (silabus ? silabus : EmptySilabus) : EmptySilabus} 
                        baseFontStyle={{color: colors.textDark, ...fonts.regular}} 
                        contentWidth={useWindowDimensions().width * 0.90}
                        imagesMaxWidth={useWindowDimensions().width * 0.93}
                        enableExperimentalPercentWidt={true}
                        staticContentMaxWidth={useWindowDimensions().width * 0.93}
                        alterChildren = {node => {
                            if (node.attribs.src) {
                                const firtsPath = node.attribs.src.split('/')
                                if (firtsPath[0] === 'assets') node.attribs.src = `${env.file_domain}/${node.attribs.src}`
                            }

                            if (node.name === 'iframe') {
                                delete node.attribs.width;
                            }
                            return node.children;
                        }}
                    />
                </ScrollView>
                <Divider />
                <Card.Actions style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.bgSecondary,
                    paddingBottom: insets.bottom
                }}>
                    <Btn 
                        title='TUTUP' 
                        mode='text'
                        style={{
                            width: '100%'
                        }} 
                        fontColor={colors.textWhite} 
                        fontSize={14} 
                        onPress={() => onDismiss('silabus')} 
                    />
                </Card.Actions>
            </Card>
        </Modal>
    )
}

export default Silabus_Modal;