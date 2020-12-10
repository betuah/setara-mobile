import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../components/common/Header';

import ClassScreen from '../screen/apps/ClassScreen/ClassScreen';
import ClassDetailsScreen from '../screen/apps/ClassScreen/ClassDetailScreen';
import MateriScreen from '../screen/apps/ClassScreen/MateriScreen';

const Stack = createStackNavigator();

const ClassNav = (props) => {
    const ScreenOptionStyle = {
        headerShown: false
    }

    return (
        <Stack.Navigator 
            initialRouteName="Home"
            screenOptions={ScreenOptionStyle}
        >
            <Stack.Screen name="Home" component={ClassScreen} />
            <Stack.Screen name="DetailKelas" component={ClassDetailsScreen} />
            <Stack.Screen 
                name="Materi" 
                component={MateriScreen}
                options={() => ({
                    headerShown: true,
                    header: ({ scene, previous, navigation }) => (
                        <Header 
                            data={{
                                title: scene.route.params.title, 
                                createdDate: scene.route.params.date_created
                            }} 
                            scene={scene} 
                            previous={previous} 
                            navigation={navigation} 
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    )
};

export default ClassNav;