import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screen/LoginScreen';
import SignUpScreen from '../screen/SignUpScreen';

const Stack = createStackNavigator();
const ScreenOptionStyle = {
    headerShown: false
}

const AuthNav = () => {
    return (
        <Stack.Navigator 
            initialRouteName="Login"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    )
};

export default AuthNav;