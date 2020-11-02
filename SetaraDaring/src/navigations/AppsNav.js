import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import HomeScreen from '../screen/apps/HomeScreen';


const Tab = createMaterialBottomTabNavigator();
const ScreenOptionStyle = {
    headerShown: false
}

const AppsNav = () => {
    
    return (
        <Tab.Navigator
            initialRouteName="Home"
            activeColor="#f0edf6"
            inactiveColor="#3e2465"
            barStyle={{ backgroundColor: '#694fad' }}
        >
            <Tab.Screen 
                name="Feed" component={HomeScreen} 
                options={{
                    tabBarLabel: 'Feed',
                    tabBarIcon: ({ color }) => (
                        <Icon name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="Kelas" component={HomeScreen} />
            <Tab.Screen name="Chat" component={HomeScreen} />
            <Tab.Screen name="Profil" component={HomeScreen} />
        </Tab.Navigator>
    )
};

export default AppsNav;
