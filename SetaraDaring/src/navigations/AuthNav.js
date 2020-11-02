import React, {useEffect, useState} from 'react';
import Toast from 'react-native-toast-message';
import colors from '../constants/colors';
import { useSelector, useDispatch } from 'react-redux';
import * as authActions from '../store/actions/authAction';

import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from '../screen/SplashScreen';
import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';
import HomeScreen from '../screen/apps/HomeScreen';

import AppsNav from './AppsNav';

const Stack = createStackNavigator();
const ScreenOptionStyle = {
    headerShown: false
}

const AuthNav = () => {
    const authData = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const [splash, setSplash] = useState(true)

    const isUserSignIn = async() => {
        setTimeout(() => {
            dispatch(authActions.isUserSignIn()).then(() => {
                setSplash(false)
            }).catch(err => {
                setSplash(false)
            })
        }, 2000);
    }

    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.darkBlue2);
            changeNavigationBarColor(colors.darkBlue2, true);
        }
        if (!authData.token) isUserSignIn()
    }, [splash]);

    const SplashNavScreen = () => {
        return (
            <Stack.Navigator screenOptions={ScreenOptionStyle}>
                <Stack.Screen name="Splash" component={SplashScreen} />
            </Stack.Navigator>
        )
    }

    const AuthNavScreen = () => {
        return (
            <Stack.Navigator screenOptions={ScreenOptionStyle}>
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
            </Stack.Navigator>
        )
    }

    const AppsScreen = () => {
        return (
            <Stack.Navigator screenOptions={ScreenOptionStyle}>
                <Stack.Screen name="Home" component={HomeScreen} />
            </Stack.Navigator>
        )
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                {
                    splash ? <SplashNavScreen /> : (
                        authData.token ? <AppsNav /> : <AuthNavScreen />
                    )
                }
            </NavigationContainer>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaProvider>
    );
};

export default AuthNav;
