import React from 'react';
import { View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Card, useTheme } from 'react-native-paper';
import { Text } from '../common/UtilsComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const MapelComponent = props => {
    const { colors, fonts } = useTheme()
    const bgCard = ['#F88585','#E0BE99','#FF976B','#97BBEA','#FFBBAB']

    return (
        <TouchableOpacity
            onPress={() => console.log('ea')}
        >
            <Card style={{
                backgroundColor: bgCard[Math.floor(Math.random() * 5)],
                borderRadius: 15,
                marginVertical: 7,
                marginHorizontal: 5,
                elevation: 3,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                minWidth: 240,
                paddingHorizontal: 15,
                paddingVertical: 5,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'flex-end'
                    }}>
                        <Image 
                            source={require('../../assets/images/triangle-1.png')}
                            style={{width: '100%',height: '100%'}}
                            resizeMode='contain'
                        />
                    </View>
                    <View style={{
                        flex: 4,
                    }}>
                        <View style={{
                            paddingBottom: 4,
                            borderBottomWidth: 2, 
                            borderBottomColor: colors.textWhite
                        }}>
                            <Icon name='school' size={40} color={colors.textWhite} />
                        </View>
                        <View style={{
                            paddingTop: 4
                        }}>
                            <Text color={colors.textWhite} fontWeight={fonts.semiBold} size={14}>{props.title}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    )
}

export default MapelComponent;