import React from 'react';
import { useTheme } from 'react-native-paper';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import { Btn } from '../components/common/UtilsComponent';

import ProfileScreen from '../screen/apps/ProfileScreen/ProfileScreen';
import SettingScreen from '../screen/apps/ProfileScreen/SettingScreen';
import ProfileEditScreen from '../screen/apps/ProfileScreen/ProfileEditScreen';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const TabNav = props => {
    const {colors} = useTheme()

    return (
        <Tab.Navigator
            initialRouteName='Akun'
            tabBarOptions={{
                upperCaseLabel: false,
                activeTintColor: colors.white,
                inactiveTintColor: colors.light,
                showIcon: true,
                labelStyle: { 
                    fontSize: 15, 
                    fontWeight: 'bold',
                },
                indicatorStyle : {
                    backgroundColor: colors.lightBlue,
                    padding: 1,
                    borderRadius: 1
                },
                tabStyle: {
                    flexDirection: 'row'
                },
                style : {
                    backgroundColor: colors.header, 
                    justifyContent: 'flex-end',
                }
            }}
        >
            <Tab.Screen 
                name="Akun" 
                component={ProfileScreen} 
                options={{
                    tabBarLabel: 'Akun',
                    tabBarIcon:({ color, focused }) => (
                        <Icon name={focused ? "person" : "person-outline" } color={color} size={20} />
                    )
                }}
            />
            <Tab.Screen 
                name="Pengaturan" 
                component={SettingScreen} 
                options={{
                    tabBarLabel: 'Pengaturan',
                    tabBarIcon:({ color, focused }) => (
                        <Icon name={focused ? "settings" : "settings-outline" } color={color} size={20} />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const ProfileNav = ({ route, navigation}) => {
    const {colors} = useTheme()

    const MainProfileOption = {
        headerTitle: 'AKUN KAMU',
        headerShown: true,
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
            alignSelf: 'center'
        },
        headerStyle: {
            backgroundColor: colors.header,
            elevation: 0,
            shadowOpacity: 0,
        },
        headerRight: () => {
            const headerLeftInfo = route.params ? route.params.isEditable : false;
            
            if (headerLeftInfo) {
                return (
                    <Btn
                        onPress={() => navigation.navigate('EditProfile')}
                        mode='text'
                        style={{marginRight: 5}}
                        Icon={{
                            name: 'circle-edit-outline',
                            size: 25
                        }}
                        fontStyle={{color: colors.white}}
                    />
                )
            }
        },
    }

    const EditProfileOption = {
        headerTitle: 'UBAH PROFILE',
        headerShown: true,
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: 'normal',
            alignSelf: 'center'
        },
        headerStyle: {
            backgroundColor: colors.header,
        }
    }

    return (
        <Stack.Navigator 
            initialRouteName="MainTab"
        >
            <Stack.Screen 
                name="MainTab" 
                component={TabNav} 
                options={MainProfileOption}    
            />
            <Stack.Screen 
                name="EditProfile" 
                component={ProfileEditScreen}
                options={EditProfileOption}
            />
        </Stack.Navigator>
    );
}

export default ProfileNav;