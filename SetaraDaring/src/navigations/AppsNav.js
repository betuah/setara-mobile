import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screen/apps/HomeScreen';

import LibraryNav from './LibraryNav';
import NotifNav from './NotifNav';
import ProfileNav from './ProfileNav';
import ClassNav from './ClassNav';

const Tab = createMaterialBottomTabNavigator();

const AppsNav = () => {
    const { colors } = useTheme();
    const notifState = useSelector(state => state.notif.notif)
    const notif = notifState.map(item => item.read).filter(item => item === false)

    useEffect(() => {
        
    }, [notif])

    return (
        <Tab.Navigator
            initialRouteName="Beranda"
            shifting={true}
            activeColor={colors.secondary}
            inactiveColor={colors.secondary}
            barStyle={{ 
                backgroundColor: colors.background,
                borderTopColor: colors.secondary, 
                borderTopWidth: 2 
            }}
        >
            <Tab.Screen 
                name="Pustaka" 
                component={LibraryNav} 
                options={{
                    tabBarLabel: 'Pustaka',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? "library" : "library-outline" } color={color} size={26} />
                    )
                }}
            />
            <Tab.Screen 
                name="Kelas" 
                component={ClassNav}
                options={{
                    tabBarLabel: 'Kelas',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? "school" : "school-outline" } color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Beranda" 
                component={HomeScreen} 
                options={{
                    tabBarLabel: 'Beranda',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? "book" : "book-outline" } color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Notifikasi" 
                component={NotifNav}
                options={{
                    tabBarBadge: notif.length === 0 ? null : notif.length,
                    tabBarLabel: 'Notifikasi',
                    tabBarIcon: ({ color, focused }) => (
                        <View>
                            <Icon name={focused ? "notifications" : "notifications-outline" } color={color} size={26} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen 
                name="Profil" 
                component={ProfileNav} 
                options={{
                    tabBarLabel: 'Profil',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon name={focused ? "person" : "person-outline" } color={color} size={26} />
                    ),
                }}    
            />
        </Tab.Navigator>
    )
};

export default AppsNav;
