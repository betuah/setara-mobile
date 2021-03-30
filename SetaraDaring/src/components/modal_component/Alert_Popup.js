import React from 'react';
import { useWindowDimensions, View, Linking } from 'react-native';
import { useTheme, Card, Portal, Modal } from 'react-native-paper';
import { Text, Btn } from '../common/UtilsComponent';

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
        >
            <Card style={{
                borderRadius: 20,
                height: useWindowDimensions().height * 0.35,
                width: useWindowDimensions().width * 0.8,
            }}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    padding: 30,
                }}>
                    <Text style={{textAlign: 'center', marginVertical: 15,}} size={14} fontWeight={fonts.regular} color={colors.textPrimary}>Mohon Maaf, Sementara Fitur Pendaftaran Melalui Mobile tidak dapat dilakukan. Silahkan melakukan pendaftaran pada laman web setara.kemdikbud.go.id.</Text>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                    }}>
                        <Btn
                            onPress={() =>{ Linking.openURL('http://setara.kemdikbud.go.id') }}
                            color={colors.green} 
                            fontColor={colors.textWhite}
                            fontSize={12}
                            title='Daftar Via Web' 
                            mode="contained"
                            style={{ borderRadius: 10, marginRight: 10 }}
                        />
                        <Btn
                            onPress={() => onDismiss(false)}
                            color={colors.bgPrimary} 
                            fontColor={colors.textWhite}
                            fontSize={12}
                            title='Tutup' 
                            mode="contained" 
                            style={{ borderRadius: 10 }}
                        />
                    </View>
                </View>
            </Card>
        </Modal>
        </Portal>
    )
}

export default Development_Modal;