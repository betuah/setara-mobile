import React, { useEffect } from 'react';
import { Btn, Input } from '../common/UtilsComponent';
import { 
    View, 
    StyleSheet,
    Dimensions, 
} from 'react-native';

const TutorForm = props => {
    return (
        <View>
            <View style={styles.form}>
                <View style={{ width: '100%' }}>
                    <Input
                        label="Nama Lengkap"
                        placeholder="Nama lengkap Anda"
                        value={props.data.name}
                        IconName='card-account-details'
                        onChangeText={e => props.onInputChange(e, 'name')}
                        errorVisible={props.err.name ? true : false}
                        errorMassage={props.err.name}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <Input
                        label="Username"
                        placeholder="Dapat berupa email, username atau NIK"
                        value={props.data.uname}
                        keyboardType='email-address'
                        IconName='account-box'
                        onChangeText={e => props.onInputChange(e, 'uname')}
                        errorVisible={props.err.uname ? true : false}
                        errorMassage={props.err.uname}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <Input
                        label="Email"
                        placeholder="Masukan Email aktif Anda"
                        value={props.data.email}
                        IconName='email'
                        onChangeText={e => props.onInputChange(e, 'email')}
                        errorVisible={props.err.email ? true : false}
                        errorMassage={props.err.email}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <Input
                        label="Password"
                        placeholder="Masukan Password Baru Anda"
                        value={props.data.password}
                        secureTextEntry={true}
                        IconName='lock'
                        onChangeText={e => props.onInputChange(e, 'password')}
                        errorVisible={props.err.password ? true : false}
                        errorMassage={props.err.password}
                    />
                </View>
                <View style={{ width: '100%' }}>
                    <Input
                        label="Konfirmasi Password"
                        placeholder="Masukan kembali password Anda"
                        value={props.data.confirmPass}
                        secureTextEntry={true}
                        IconName='lock'
                        onChangeText={e => props.onInputChange(e, 'confirmPass')}
                        errorVisible={props.err.confirmPass ? true : false}
                        errorMassage={props.err.confirmPass}
                    />
                </View>
            </View>
            <View style={styles.button}>
                <Btn 
                    Icon={{name:"clipboard-text", size: 12, color: "#2A9FC4"}}
                    title="Daftar Tutor" 
                    fontSize={12}
                    onPress={props.signUp}
                    style={{ width: '100%' }}
                    disabled={props.btnDisable}
                    isLoading={props.btnLoading}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        // alignItems: 'center',
        // paddingVertical: Dimensions.get('window').height > 600 ? 10 : 5
        paddingTop: 10
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Dimensions.get('window').height > 600 ? 20 : 10,
        alignItems: "center"
    },
});

export default TutorForm;