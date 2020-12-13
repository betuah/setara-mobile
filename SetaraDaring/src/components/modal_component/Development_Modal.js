import React from 'react';
import { useWindowDimensions, View } from 'react-native';
import { useTheme, Card, Portal, Modal } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';
// import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';

const Development_Modal = ({visible, onDismiss}) => {
    const { colors, fonts } = useTheme()

    return (
        <Portal>
        <Modal 
            visible={visible}
            onDismiss={() => onDismiss(false)}
            contentContainerStyle={{
                alignItems: 'center'
            }}
            // isVisible={visible}
            // onBackdropPress={() => onDismiss(false)}
            // onSwipeComplete={() => onDismiss(false)}
            // swipeDirection={['down']}
        >
            <Card style={{
                borderRadius: 20,
                height: useWindowDimensions().height * 0.5,
                width: useWindowDimensions().width * 0.8,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: 30,
                }}>
                    <LottieView 
                            source={require('../../assets/lottie/26383-teamwork.json')} 
                            autoPlay
                            style={{
                                width: '70%',
                                alignItems: 'center',
                            }}
                        />
                    <Text style={{textAlign: 'center', marginVertical: 15,}} size={12} fontWeight={fonts.regular} color={colors.textPrimary}>Mohon Maaf Fitur Ini Sedang Dalam Pengembangan.</Text>
                    <Btn
                        onPress={() => onDismiss(false)}
                        color={colors.bgPrimary} 
                        fontColor={colors.textWhite}
                        fontSize={12}
                        title='Tutup' 
                        mode="contained" 
                    />
                </View>
            </Card>
        </Modal>
        </Portal>
    )
}

export default Development_Modal;