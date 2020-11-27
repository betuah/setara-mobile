import React from 'react';
import {  View, Image, TouchableOpacity } from 'react-native';
import { Text } from '../../../components/common/UtilsComponent';
import { Card, useTheme, } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const ListClassScreen = props => {
    const { colors, fonts } = useTheme()
    const bgCard = ['#F88585','#E0BE99','#FF976B','#97BBEA','#FFBBAB']

    return (
        <TouchableOpacity
            onPress={() => props.onPress(props.data)}
            onLongPress={() => props.onLongPress(props.data)}
        >
            <Card style={{
                backgroundColor: bgCard[Math.floor(Math.random() * 5)],
                borderRadius: 20,
                marginVertical: 9,
                marginHorizontal: 18,
                elevation: 3,
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
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
                        flex: 4,
                    }}>
                        <View style={{
                            paddingBottom: 4,
                            borderBottomWidth: 2, 
                            borderBottomColor: 
                            colors.textWhite
                        }}>
                            <Text color={colors.textWhite} fontWeight={fonts.semiBold} size={14}>{props.data.nama}</Text>
                        </View>
                        <View style={{
                            paddingTop: 4
                        }}>
                            <Text color={colors.textWhite} fontWeight={fonts.italic} size={12}>{props.data.status}</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                    }}>
                        <Icon name='school' size={50} color={colors.textWhite} />
                    </View>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    )
}

export default ListClassScreen;