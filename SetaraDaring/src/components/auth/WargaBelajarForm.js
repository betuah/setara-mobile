import React, { useEffect } from 'react';
import { Btn, Input } from '../common/UtilsComponent';
import { 
    View, 
    StyleSheet,
    Dimensions, 
} from 'react-native';

const WargaBelajarForm = props => {
    return (
        <View style={props.style}>
            <View style={styles.form}>
                <Input
                    label="Kode Kelas"
                    placeholder="Masukan kode kelas"
                    value={props.data.kode_kelas}
                    IconName='qrcode'
                    style={{ width: '100%' }}
                    onChangeText={e => props.onInputChange(e, 'kode_kelas')}
                    errorVisible={props.err.kode_kelas ? true : false}
                    errorMassage={props.err.kode_kelas}
                />
                <Input
                    label="Nama Lengkap"
                    placeholder="Nama lengkap Anda"
                    value={props.data.name}
                    IconName='card-account-details'
                    style={{ width: '100%' }}
                    onChangeText={e => props.onInputChange(e, 'name')}
                    errorVisible={props.err.name ? true : false}
                    errorMassage={props.err.name}
                />
                <Input
                    label="Username"
                    placeholder="Dapat berupa email, username atau NIK"
                    value={props.data.uname}
                    IconName='account-box'
                    style={{ width: '100%' }}
                    onChangeText={e => props.onInputChange(e, 'uname')}
                    errorVisible={props.err.uname ? true : false}
                    errorMassage={props.err.uname}
                />
                <Input
                    label="Password"
                    placeholder="Masukan Password Baru Anda"
                    value={props.data.password}
                    secureTextEntry={true}
                    IconName='lock'
                    style={{
                        width: '100%'
                    }}
                    onChangeText={e => props.onInputChange(e, 'password')}
                    errorVisible={props.err.password ? true : false}
                    errorMassage={props.err.password}
                />
                <Input
                    label="Konfirmasi Password"
                    placeholder="Masukan kembali password Anda"
                    value={props.data.confirmPass}
                    secureTextEntry={true}
                    IconName='lock'
                    style={{
                        width: '100%'
                    }}
                    onChangeText={e => props.onInputChange(e, 'confirmPass')}
                    errorVisible={props.err.confirmPass ? true : false}
                    errorMassage={props.err.confirmPass}
                />
            </View>
            <View style={styles.button}>
                <Btn 
                    Icon={{name:"clipboard-text", size: 15, color: "#2A9FC4"}}
                    title="Daftar" 
                    onPress={props.signUp}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        // alignItems: 'center',
        // paddingVertical: Dimensions.get('window').height > 600 ? 10 : 10
        paddingTop: 10
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Dimensions.get('window').height > 600 ? 20 : 10,
        alignItems: "center"
    },
});

export default WargaBelajarForm;