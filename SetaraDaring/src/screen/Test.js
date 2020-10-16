import React, { useEffect, useState } from 'react';
import { Input, Btn, Texts } from '../components/common/UtilsComponent';
import LogoBrand from '../components/LogoComponent';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import { 
    View, 
    Text,
    StyleSheet, 
    SafeAreaView, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    ScrollView,
    StatusBar,
} from 'react-native';

const Test = ({ navigation }) => {
    return (
        <View>  
        <StatusBar  
            backgroundColor = "#b3e6ff"  
            barStyle = "dark-content"   
        />  
            <View>
                <Text>Hello word</Text>
            </View>
        </View>  
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary
    },
    LogoBrand: {
        paddingTop: Dimensions.get('window').height > 600 ? 40 : 20,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        alignItems: "center"
    },
    signup: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    form: {
        alignItems: 'center',
        paddingVertical: 10
    },
    body: {
        flex: 10
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        position: 'relative'
    }
});

export default Test;