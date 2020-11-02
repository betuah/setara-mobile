import React, { useEffect } from 'react';
import {  StatusBar } from 'react-native';
import { Input, Btn, Texts } from '../../components/common/UtilsComponent';
import colors from '../../constants/colors';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
} from 'react-native';

const LoginScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.setOptions({
            tabBarVisible:false
        })

        // console.log(navigation.setOptions)
    }, [])

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <SafeAreaView style={styles.screen}>
                <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
                <View style={styles.LogoBrand}>
                    <Texts 
                        text="Welcome Home" 
                        color={colors.primary}
                        size={30}
                        fontWeight='bold'
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    },
    LogoBrand: {
        paddingTop: Dimensions.get('window').height > 600 ? 40 : 20,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    }
});

export default LoginScreen;