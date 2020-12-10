import React, { useEffect, useState } from 'react';
import {  View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/common/UtilsComponent';
import { Card, useTheme, TouchableRipple } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ListClassScreen = props => {
    const { colors, fonts } = useTheme()
    const [roleColor, setRoleColor] = useState('#F88585')

    useEffect(() => {
        switch (props.data.role) {
            case '1':
                setRoleColor('#FF976B')
                break;
            case '2':
                setRoleColor('#E0BE99')
                break;
            case '3':
                setRoleColor('#97BBEA')
                break;
            default:
                setRoleColor('#F88585')
                break;
        }
    }, [roleColor])

    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.data)}
            onLongPress={() => props.onLongPress(props.data)}
            activeOpacity={0.6}
        >
            <Card style={{
                backgroundColor: roleColor,
                borderRadius: 20,
                marginVertical: 9,
                marginHorizontal: 18,
                elevation: 2,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.5,
                shadowRadius: 2,
            }}>
                <Card.Content style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        position: 'absolute',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        padding: 10,
                    }}>
                        <Image 
                            source={require('../../../assets/images/triangle.png')}
                            resizeMode='cover'
                        />
                    </View>
                    <View style={{
                        flex: 6,
                    }}>
                        <View style={{
                            paddingBottom: 4,
                            borderBottomWidth: 2, 
                            borderBottomColor: 
                            colors.textWhite
                        }}>
                            <Text color={colors.textWhite} fontWeight={fonts.semiBold} size={13}>{props.data.nama}</Text>
                        </View>
                        <View style={{
                            paddingTop: 4
                        }}>
                            <Text color={colors.textWhite} fontWeight={fonts.italic} size={11}>{props.data.status}</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}>
                        <Icon name='school' size={35} color={colors.textWhite} />
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default ListClassScreen;