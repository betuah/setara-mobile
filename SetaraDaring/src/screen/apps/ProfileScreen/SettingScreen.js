import React, { useEffect, useState } from 'react';
import { useTheme, List, Card } from 'react-native-paper';
import { 
    TouchableWithoutFeedback, 
    Keyboard,
    ScrollView,
    View
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as themeAct from '../../../store/actions/themeAction';
import * as authAct from '../../../store/actions/authAction';
import Toast from 'react-native-toast-message';
import { Chase } from 'react-native-animated-spinkit';

const SettingScreen = props => {
    const { colors } = useTheme()
    const { darkMode } = useSelector(state => state.theme)
    const { token } = useSelector(state => state.auth)
    const [ isLoading, setLoading ] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        props.navigation.addListener('focus', () => {
            props.navigation.navigate('Profil', {isEditable: false})
        })
    }, [darkMode, token])

    const comingSoon = () => {
        Toast.show({
            type: 'info',
            text1: 'Comming Soon.',
            text2: 'Mohon maaf, Fitur ini sedang dalam pengembangan.',
        });
    }

    const isDarkModeSwtich = () => {
        try {
            dispatch(themeAct.setDarkMode(!darkMode))
        } catch (error) {
            console.log(error)
        }
    }

    const signOut = async () => {
        try {
            setLoading(true)
            await dispatch(authAct.signOut(token))
        } catch (err) {
            setLoading(false)
            Toast.show({
                type: 'error',
                text1: 'Gagal Keluar SetaraDaring!',
                text2: err
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <Card style={{
                marginHorizontal: 10,
                marginVertical: 15,
                elevation: 3,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                borderRadius: 10,
                borderTopWidth: 3,
                borderBottomWidth: 3,
                borderColor: colors.secondary
            }}>
                <ScrollView>
                    <List.Item
                        onPress={isDarkModeSwtich}
                        style={{
                            borderBottomWidth: 1, 
                            borderBottomColor: colors.secondary
                        }}
                        title="Mode Layar Hitam"
                        titleStyle={{color: colors.secondary, fontWeight: 'bold'}}
                        left={props => <List.Icon {...props} color={colors.secondary} icon='theme-light-dark' />}
                        right={props => <List.Icon {...props} color={colors.accent} icon={darkMode ? 'weather-night' : 'white-balance-sunny'} /> }
                    />
                    <List.Item
                        onPress={() => console.log(null)}
                        style={{
                            borderBottomWidth: 1, 
                            borderBottomColor: colors.secondary
                        }}
                        title="Ubah Password"
                        titleStyle={{color: colors.secondary, fontWeight: 'bold'}}
                        left={props => <List.Icon {...props} color={colors.secondary} icon="lock" />}
                    />
                    <List.Item
                        onPress={comingSoon}
                        style={{
                            borderBottomWidth: 1, 
                            borderBottomColor: colors.secondary
                        }}
                        title="Sidik Jari"
                        titleStyle={{color: colors.secondary, fontWeight: 'bold'}}
                        left={props => <List.Icon {...props} color={colors.secondary} icon="fingerprint" />}
                    />
                    <List.Item
                        onPress={comingSoon}
                        style={{
                            borderBottomWidth: 1, 
                            borderBottomColor: colors.secondary
                        }}
                        title="PIN"
                        titleStyle={{color: colors.secondary, fontWeight: 'bold'}}
                        left={props => <List.Icon {...props} color={colors.secondary} icon="lock-pattern" />}
                    />
                    <List.Item
                        onPress={signOut}
                        disabled={isLoading}
                        titleStyle={{color: isLoading ? colors.backdrop : colors.accent, fontWeight: 'bold'}}
                        title={isLoading ? 'Loading...' : 'Keluar'}
                        style={isLoading && {backgroundColor: colors.loadingBackground}}
                        left={props => <List.Icon {...props} color={isLoading ? colors.backdrop : colors.accent} icon="logout" />}
                        right={props => {
                            if (isLoading) {
                                return (
                                    <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <Chase size={25} color={colors.accent} />
                                    </View>
                                )
                            }
                        }}
                    />
                </ScrollView>
            </Card>
        </TouchableWithoutFeedback>
    )
}

export default SettingScreen;