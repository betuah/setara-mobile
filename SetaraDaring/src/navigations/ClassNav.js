import React from 'react';
import { useTheme } from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';

import ClassScreen from '../screen/apps/ClassScreen/ClassScreen';
import ClassDetailsScreen from '../screen/apps/ClassScreen/ClassDetailScreen';

const Stack = createStackNavigator();

const ClassNav = (props) => {
    const {colors} = useTheme()
    const ScreenOptionStyle = {
        headerShown: false,
    }

    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Home" component={ClassScreen} />
            <Stack.Screen name="DetailKelas" component={ClassDetailsScreen} />
        </Stack.Navigator>
    )
};

export default ClassNav;