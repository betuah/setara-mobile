import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import NotifUmum from '../screen/apps/NotifScreen/NotifUmumScreen';
import NotifDiscussion from '../screen/apps/NotifScreen/NotifDiscussionSreen';
import NotifClass from '../screen/apps/NotifScreen/NotifClassScreen';

import Header from '../components/common/Header';

import * as authAct from '../store/actions/authAction';
import * as notifAct from '../store/actions/notifActions';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const NotifTab = (props) => {
    const {colors,fonts} = useTheme()
    const dispatch = useDispatch()

    const notifState    = useSelector(state => state.notif.notif)
    const notifClass    = notifState.map(item => item).filter(item => { return (item.category === 3 || item.category === 4 ) && item.read})
    const notifDiscuss  = notifState.map(item => item).filter(item => item.category === 2 && item.read)
    const notifUmum     = notifState.map(item => item).filter(item => item.category === 1 && item.read)

    useFocusEffect(
        useCallback(() => {
            let isActive = true;
    
            const fetch = async () => {
                try {
                    if (isActive) {
                        await dispatch(notifAct.initData())
                    }
                } catch (error) {
                    if (isActive) {
                        if (error) {
                            if (error === 'ERR_GENERATE_TOKEN') {
                                dispatch(authAct.signOut(true))
                                Toast.show({
                                    type: 'error',
                                    text1: 'Maaf, Sesi kamu telah Habis!',
                                    text2: 'Silahkan masuk kembali.'
                                });
                            }
                        }
                    }
                }
            }
    
            fetch();
    
            return () => {
                isActive = false
            }
    
        }, [dispatch])
    );

    return (
        <Tab.Navigator 
            initialRouteName='Umum'
            removeClippedSubviews={true}
            tabBarOptions={{
                activeTintColor: colors.textWhite,
                inactiveTintColor: colors.textLightAccent,
                showIcon: true,
                style : {
                    backgroundColor: colors.primary
                },
                tabStyle : {
                    flexDirection: 'row'
                },
                labelStyle : {
                    ...fonts.medium,
                    fontSize: 12,
                },
                indicatorStyle: {
                    height: 2,
                    borderRadius: 50,
                    backgroundColor: colors.bgWhite
                },
            }}
        >
            <Tab.Screen 
                name="Umum" 
                component={NotifUmum}
                options={{
                    title: notifUmum.length > 0 ? `UMUM ( ${notifUmum.length} )` : 'UMUM',
                    tabBarIcon: ({focused, color}) => (
                        <Icon 
                            name={focused ? 'notifications' : 'notifications-outline'} 
                            size={18} 
                            color={focused ? colors.textWhite : colors.textLightAccent} 
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="Diskusi" 
                component={NotifDiscussion}
                options={{
                    title: notifDiscuss.length > 0 ? `DISKUSI ( ${notifDiscuss.length} )` : 'DISKUSI',
                    tabBarIcon: ({focused, color}) => (
                        <Icon 
                            name={focused ? 'chatbubbles' : 'chatbubbles-outline'} 
                            size={18} 
                            color={focused ? colors.textWhite : colors.textLightAccent} 
                        />
                    )
                }}
            />
            <Tab.Screen 
                name="TugasEvaluasi" 
                component={NotifClass}
                options={{
                    title: notifClass.length > 0 ? `KELAS ( ${notifClass.length} )` : 'KELAS',
                    tabBarIcon: ({focused, color}) => (
                        <Icon 
                            name={focused ? 'school' : 'school-outline'} 
                            size={18} 
                            color={focused ? colors.textWhite : colors.textLightAccent} 
                        />
                    )
                }}
            />
        </Tab.Navigator>
    )
}

const NotifNav = (props) => {
    const {colors,fonts} = useTheme()
    const ScreenOptionStyle = {
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
            <>
            <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
            <Header 
                data={{
                    title: 'N O T I F I K A S I', 
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
            />
            </>
        ),
    }

    return (
        <Stack.Navigator 
            initialRouteName="Notif"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Notif" component={NotifTab} />
        </Stack.Navigator>
    )
};

export default NotifNav;