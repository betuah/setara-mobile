import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import {StatusBar} from 'react-native';

import { CombinedDefaultTheme, CombinedDarkTheme } from '../constants/theme';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import Toast from 'react-native-toast-message';
import colors from '../constants/colors';

import * as authActions from '../store/actions/authAction';

import SplashScreen from '../screen/SplashScreen';
import AuthNav from './AuthNav';
import AppsNav from './AppsNav';

const Stack = createStackNavigator();
const ScreenOptionStyle = {
    headerShown: false
}

const SplashNavScreen = () => {
    return (
        <Stack.Navigator screenOptions={ScreenOptionStyle}>
            <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
    )
}

const Navigations = () => {
    const authData      = useSelector(state => state.auth)
    const { darkMode }  = useSelector(state => state.theme)
    const dispatch      = useDispatch()

    const theme = darkMode ? CombinedDarkTheme : CombinedDefaultTheme;
    const [splash, setSplash] = useState(true)

    const isUserSignIn = async() => {
        dispatch(authActions.isUserSignIn()).then(() => {
            setSplash(false)
        }).catch(err => {
            setSplash(false)
        })
    }

    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.darkBlue2);
            // StatusBar.setTranslucent;
            StatusBar.setBarStyle("light-content");
            changeNavigationBarColor(colors.darkBlue2, true);
        }
        if (!authData.token) isUserSignIn()
    }, [splash, darkMode]);

    return (
        <SafeAreaProvider>
            <PaperProvider 
                theme={theme}
            >
                <NavigationContainer theme={theme}>
                    {
                        splash ? <SplashNavScreen /> : (
                            authData.token ? <AppsNav /> : <AuthNav />
                        )
                    }
                </NavigationContainer>
            </PaperProvider>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaProvider>
    );
};

export default Navigations;