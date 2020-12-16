import React from 'react';
import { Dimensions, View, TouchableOpacity, Image } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { Text } from '../components/common/UtilsComponent';
import moment from 'moment/min/moment-with-locales';

const NotifComponent = ({data}) => {
    const { colors, fonts } = useTheme();
    let icon = ''

    switch (data.category) {
        case 1:
            icon = 'notifications'
            break;
        
        case 2:
            icon = 'chatbubbles'
            break;
        
        case 3:
            icon = 'document-text'
            break;
        
        case 4:
            icon = 'medal'
            break;
    }

    return (
        <>
        <TouchableOpacity 
            onPress={() => console.log('ea')}
            activeOpacity={0.7}
        >
            <View style={{
                flex: 1,
                paddingVertical: 15,
                paddingHorizontal: 15,
                flexDirection: 'row',
                backgroundColor: !data.read && colors.softBlue
            }}>
                <View style={{
                    flex: 10,
                    flexDirection: 'column'
                }}>
                    <View style={{
                        flexDirection: 'row'
                    }}>
                        <View style={{
                            marginRight: 3,
                            justifyContent: 'center'
                        }}>
                            <Icon
                                name={'star'} 
                                size={9} 
                                color={colors.bgPrimary}
                            />
                        </View>
                        <Text
                            fontWeight={{...fonts.regular}}
                            size={11}
                            color={colors.dark}
                        >
                            {data.label}
                        </Text>
                        
                    </View>
                    
                    <Text
                        fontWeight={{...fonts.semiBold}}
                        size={14}
                        color={colors.primary}
                    >
                        {data.notifTitle}
                    </Text>
                    {
                        data.image && 
                        <Image 
                            style={{
                                height: 100,
                                width: '100%',
                                borderRadius: 10,
                            }}
                            source={{ uri: data.image}}
                            resizeMode='cover'
                        />
                    }
                    <Text
                        fontWeight={{...fonts.regular}}
                        size={12}
                        color={colors.textPrimary}
                    >
                        {data.notifContent + 'asdasdasd asdas dqwd qwd qsdas dqwd qwd sdasd awdqwd sadasd qwd qdas awdqwd qwd asdqwd qdw'}
                    </Text>
                    <Text 
                        fontWeight={fonts.regular} 
                        size={10} color={colors.textGreyLight}
                    >
                        {`${moment(data.createdTime).startOf('day').fromNow()}`}
                    </Text>
                </View>
                <View style={{
                    flex: 2,
                    paddingLeft: 5,
                    alignItems: 'flex-end'
                }}>
                    <View style={{
                        justifyContent: 'flex-start'
                    }}>
                        <Text 
                            fontWeight={fonts.regular} 
                            size={9} color={colors.textGreyLight}
                        >
                            {`${moment(data.createdTime).format('DD MMM YYYY')}`}
                        </Text>
                    </View>
                    <View style={{
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Icon 
                            name={icon} 
                            size={30} 
                            color={colors.bgPrimary}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
        <Divider style={{height: 1, backgroundColor: colors.bgPrimary}} />
        </>
    )
}

export default NotifComponent;