import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Header from '../components/common/Header';

import ClassScreen from '../screen/apps/ClassScreen/ClassScreen';
import ClassDetailsScreen from '../screen/apps/ClassScreen/ClassDetailScreen';
import MateriScreen from '../screen/apps/ClassScreen/MateriScreen';
import TugasScreen from '../screen/apps/ClassScreen/TugasScreen';

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
                            style={{
                                elevation: 0,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0,
                                shadowRadius: 0,
                            }}
                        />
                    ),
                })}
            />
            <Stack.Screen 
                name="Tugas" 
                component={TugasScreen}
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
                            subtittle={'eaea'}
                            style={{
                                elevation: 0,
                                shadowOffset: { width: 0, height: 0 },
                                shadowOpacity: 0,
                                shadowRadius: 0,
                            }}
                        />
                    ),
                })}
            />
        </Stack.Navigator>
    )
};

export default ClassNav;