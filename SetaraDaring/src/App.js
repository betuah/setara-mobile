import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { Provider } from 'react-redux';

import LoginScreen from './screen/LoginScreen';
import SignUpScreen from './screen/SignUpScreen';
import Test from './screen/Test.js';
import colors from './constants/colors';


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.darkBlue2);
    }
    changeNavigationBarColor(colors.darkBlue2, true)
  })

  return(
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
