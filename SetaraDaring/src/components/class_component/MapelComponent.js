import React from 'react';
import { View, Image } from 'react-native';
import { Card, useTheme, TouchableRipple } from 'react-native-paper';
import { Text } from '../common/UtilsComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const MapelComponent = props => {
    const { colors, fonts } = useTheme()

    return (
        <TouchableRipple
            onPress={() => props.onPress(props.id)}
        >
            <Card style={{
                backgroundColor: colors.bgCardPrimary,
                borderRadius: 15,
                marginVertical: 7,
                marginHorizontal: 5,
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
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
                    }}>
                        <Image 
                            source={require('../../assets/images/icon_pattern.png')}
                            style={{width: '100%',height: '100%'}}
                            resizeMode='cover'
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
                            <Text color={colors.textWhite} fontWeight={fonts.semiBold} size={12}>{props.title}</Text>
                        </View>
                    </View>
                </View>
            </Card>
        </TouchableRipple>
    )
}

export default MapelComponent;