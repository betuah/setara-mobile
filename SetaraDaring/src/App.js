import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import { Provider } from 'react-redux';

import LoginScreen from './screen/LoginScreen';
import SignUpScreen from './screen/SignUpScreen';
import Test from './screen/Test.js';


const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    // StatusBar.setBarStyle("light-content");
    // if (Platform.OS === "android") {
      // StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      // StatusBar.setTranslucent(true);
    // }
    // changeNavigationBarColor('transparent', true)
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
