import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';
import {createStackNavigator, HeaderBackButton} from '@react-navigation/stack';
import { Btn, Text } from '../components/common/UtilsComponent';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import * as libraryActions from '../store/actions/libraryActions';

import LibraryScreen from '../screen/apps/LibraryScreen';
import Header from '../components/common/Header';

const Stack = createStackNavigator();

const LibaryNav = (props) => {
    const {colors} = useTheme()
    const { refresh } = useSelector(state => state.library)
    const dispatch = useDispatch()
    const doRefresh = () => {
        dispatch(libraryActions.doRefresh(!refresh))
    }

    const ScreenOptionStyle = {
        headerShown: true,
        header: ({ scene, previous, navigation }) => (
            <Header 
                data={{
                    title: 'PUSTAKA', 
                }} 
                scene={scene} 
                previous={previous} 
                navigation={navigation} 
                titleStyle={{
                    fontSize: 20,
                }}
                Action={{Icon: 'refresh', Size: 25}}
                ActionOnPress={() => doRefresh(!refresh)}
            />
        ),
    }

    // const ScreenOptionStyle = {
    //     headerShown: true,
    //     headerTitle: () => (
    //         <View style={{
    //             flex: 1,
    //             flexDirection: 'row',
    //             justifyContent: 'center',
    //             alignItems: 'center'
    //         }}>
    //             <Icon name='library' size={20} color={colors.white} />
    //             <Text color={colors.white} size={20} weight='bold'> PUSTAKA</Text>
    //         </View>
    //     ),
    //     headerTintColor: colors.white,
    //     headerTitleStyle: {
    //         fontWeight: 'bold',
    //         alignSelf: 'center'
    //     },
    //     headerStyle: {
    //         backgroundColor: colors.header,
    //     },
    //     headerLeft: () => (
    //         <Btn 
    //             mode="text"
    //             Icon={{name:"chevron-left", size: 35, color: colors.white}}
    //             onPress={() => doRefresh(!refresh)}
    //         />
    //     )
    // }

    return (
        <Stack.Navigator 
            initialRouteName="Libary"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Library" component={LibraryScreen} />
        </Stack.Navigator>
    )
};

export default LibaryNav;
