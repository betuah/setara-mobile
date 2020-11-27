import React from 'react';
import { useTheme } from 'react-native-paper';
import { View, TouchableHighlight, Image, StyleSheet } from 'react-native';
import { Text } from './common/UtilsComponent';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Card } from 'react-native-paper';

const FeedComponent = props => {
    const { colors } = useTheme()
    
    return (
        <Card style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderRadius: 10,
            elevation: 3,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.5,
            shadowRadius: 3,
            borderTopColor: colors.secondary,
            borderTopWidth: 3,
            borderBottomColor: colors.secondary,
            borderBottomWidth: 3,
        }}>
            <Card.Content>
                <TouchableHighlight>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row'
                    }}>
                        <Avatar.Image size={40} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} />
                        <View style={{
                            paddingLeft: 10,
                            flex: 1,
                            flexDirection: 'column'
                        }}>
                            <View style={{
                                flex: 1,
                                flexDirection: 'row'
                            }}>
                                <Text weight='bold' color={colors.secondary} size={16}>
                                    {props.creator}
                                </Text>
                                <Icon name='caret-forward' size={18} color={colors.secondary} />
                                <Text weight='bold' color={colors.secondary} size={16}>
                                    {props.kelas} 
                                </Text>
                            </View>
                            <Text color={colors.secondary} size={12}>
                                {props.timeAgo}  
                            </Text>
                        </View>
                    </View>
                </TouchableHighlight>
                <Text
                    style={{
                        paddingTop: 10
                    }}
                    color={colors.secondary} 
                    size={15}    
                >{props.post}</Text>
            </Card.Content>
        </Card>
    )
}

export default FeedComponent;