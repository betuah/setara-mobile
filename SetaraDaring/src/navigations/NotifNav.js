import React from 'react';
import { useTheme } from 'react-native-paper';
import {createStackNavigator} from '@react-navigation/stack';
import { View } from 'react-native';
import { Text } from '../components/common/UtilsComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import NotifScreen from '../screen/apps/NotificationsScreen';

const Stack = createStackNavigator();

const NotifNav = (props) => {
    const {colors} = useTheme()
    const ScreenOptionStyle = {
        headerTitle: () => (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Icon name='notifications' size={20} color={colors.white} />
                <Text color={colors.white} size={20} weight='bold'> NOTIFIKASI</Text>
            </View>
        ),
        headerShown: true,
        headerTintColor: colors.white,
        headerTitleStyle: {
            fontWeight: 'bold',
            alignSelf: 'center'
        },
        headerStyle: {
            backgroundColor: colors.header,
        },
    }

    return (
        <Stack.Navigator 
            initialRouteName="Notif"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Notif" component={NotifScreen} />
        </Stack.Navigator>
    )
};

export default NotifNav;