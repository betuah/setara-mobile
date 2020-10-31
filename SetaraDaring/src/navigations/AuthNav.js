import React, {useEffect} from 'react';
import {Text,View} from 'react-native';

import Toast from 'react-native-toast-message';

import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen'
import colors from '../constants/colors';

const Stack = createStackNavigator();

const AuthNav = () => {
    useEffect(() => {
        StatusBar.setBarStyle('light-content');
        if (Platform.OS === 'android') {
            StatusBar.setBackgroundColor(colors.darkBlue2);
            changeNavigationBarColor(colors.darkBlue2, true);
        }
    });

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{headerShown: false}}
                >
                    <Stack.Screen name="Login" component={LoginScreen} />
                    <Stack.Screen name="SignUp" component={SignUpScreen} />
                </Stack.Navigator>
            </NavigationContainer>
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaProvider>
    );
};

export default AuthNav;
