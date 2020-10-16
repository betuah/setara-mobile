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
                <Input
                    label="Nama Lengkap"
                    placeholder="Nama lengkap Anda"
                    value={props.data.name}
                    IconName='card-account-details'
                    style={{ width: '100%' }}
                    onChangeText={e => props.onInputChange(e, 'name')}
                />
                <Input
                    label="Username"
                    placeholder="Dapat berupa email, username atau NIK"
                    value={props.data.uname}
                    IconName='account-box'
                    style={{ width: '100%' }}
                    onChangeText={e => props.onInputChange(e, 'uname')}
                />
                <Input
                    label="Email"
                    placeholder="Masukan Email aktif Anda"
                    value={props.data.email}
                    IconName='email'
                    style={{ width: '100%' }}
                    onChangeText={e => props.onInputChange(e, 'Email')}
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
                />
            </View>
            <View style={styles.button}>
                <Btn 
                    Icon={{name:"clipboard-text", size: 15, color: "#2A9FC4"}}
                    title="Daftar Tutor" 
                    onPress={props.signUp}
                    style={{ width: '100%' }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        alignItems: 'center',
        paddingVertical: Dimensions.get('window').height > 600 ? 10 : 5
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: Dimensions.get('window').height > 600 ? 10 : 5,
        alignItems: "center"
    },
});

export default TutorForm;