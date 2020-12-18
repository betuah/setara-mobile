import React from 'react';
import { useTheme } from 'react-native-paper';
import { StatusBar } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../components/common/Header';

import ProfileScreen from '../screen/apps/ProfileScreen/ProfileScreen';
import ProfileEditScreen from '../screen/apps/ProfileScreen/ProfileEditScreen';

const Stack = createStackNavigator();

const ProfileNav = ({ route, navigation}) => {
    const {colors, fonts} = useTheme()

    const MainProfileOption = {
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
            <>
            <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
            <Header 
                data={{
                    title: 'P R O F I L   S A Y A', 
                }} 
                scene={scene} 
                previous={previous} 
                navigation={navigation} 
                titleStyle={{fontSize: 16, ...fonts.bold, paddingTop: 3,}}
                contentStyle={{alignItems: 'center', justifyContent: 'center'}}
                style={{
                    backgroundColor: colors.primary,
                    elevation: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0,
                    shadowRadius: 0,
                }}
                action={{
                    icon: 'tune',
                    size: 22,
                }}
                actionOnPress={() => navigation.navigate('EditProfile')}
                leftIcon={{
                    icon: 'account',
                    size: 22,
                }}
            />
            </>
        ),
    }

    const EditProfileOption = {
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
            <Header 
                data={{
                    title: 'U B A H   P R O F I L', 
                }} 
                scene={scene} 
                previous={previous} 
                navigation={navigation} 
                titleStyle={{fontSize: 16, ...fonts.semoBold, paddingTop: 3,}}
                contentStyle={{alignItems: 'center', justifyContent: 'center'}}
            />
        ),
    }

    return (
        <Stack.Navigator 
            initialRouteName="MainTab"
        >
            <Stack.Screen 
                name="MainTab" 
                component={ProfileScreen} 
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