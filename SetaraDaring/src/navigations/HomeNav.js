import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import { useTheme } from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

import HomeScreen from '../screen/apps/HomeScreen/HomeScreen';
import PostClassScreen from '../screen/apps/HomeScreen/PostClassScreen';
import DetailPostScreen from '../screen/apps/HomeScreen/DetailPostScreen';
import Header from '../components/common/Header';

const Stack = createStackNavigator();

const HomeNav = (props) => {
    const {colors, fonts} = useTheme()

    const ScreenOptionStyle = {
        headerShown: false,
    }

    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen 
                name="PostClass" 
                component={PostClassScreen} 
                options={{
                    headerShown: true,
                    header: ({ scene, previous, navigation, route }) => (
                        <Header 
                            data={{
                                title: 'P O S T I N G  K E L A S', 
                                subtitle: scene.route.params.className
                            }} 
                            scene={scene} 
                            previous={previous} 
                            navigation={navigation}
                            contentStyle={{alignItems: 'center', justifyContent: 'center'}}
                            titleStyle={{
                                fontSize: 16,
                                ...fonts.bold
                            }}
                            action={{icon: 'google-classroom', size: 22}}
                            actionOnPress={() => console.log('')}
                        />
                    )
                }}
            />
            <Stack.Screen 
                name="DetailPost" 
                component={DetailPostScreen} 
                options={{
                    headerShown: true,
                    header: ({ scene, previous, navigation, route }) => (
                        <Header 
                            data={{
                                title: 'D E T A I L  P O S T I N G', 
                                subtitle: `${moment(scene.route.params.date_created).startOf('day').fromNow()}`
                            }} 
                            scene={scene} 
                            previous={previous} 
                            navigation={navigation}
                            contentStyle={{alignItems: 'center', justifyContent: 'center'}}
                            titleStyle={{
                                fontSize: 16,
                                ...fonts.bold
                            }}
                            action={{icon: 'tooltip-text', size: 22}}
                            actionOnPress={() => console.log('')}
                        />
                    )
                }}
            />
        </Stack.Navigator>
    )
};

export default HomeNav;
