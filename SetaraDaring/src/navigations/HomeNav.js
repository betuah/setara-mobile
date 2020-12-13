import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';;

import HomeScreen from '../screen/apps/HomeScreen';
import Header from '../components/common/Header';

const Stack = createStackNavigator();

const HomeNav = (props) => {
    const {colors} = useTheme()
    const { refresh } = useSelector(state => state.library)
    const dispatch = useDispatch()

    const ScreenOptionStyle = {
        headerShown: false,
        header: ({ scene, previous, navigation }) => (
            <Header 
                data={{
                    title: 'B E R A N D A', 
                }} 
                scene={scene} 
                previous={previous} 
                navigation={navigation} 
                titleStyle={{fontSize: 16}}
                contentStyle={{alignItems: 'center', justifyContent: 'center'}}
                style={{
                    elevation: 0,
                    shadowOffset: { width: 0, height: 0 },
                    shadowOpacity: 0,
                    shadowRadius: 0,
                }}
            />
        ),
    }

    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    )
};

export default HomeNav;
