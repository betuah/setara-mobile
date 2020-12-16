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
                flexDirection: 'row',
                backgroundColor: !data.read && colors.softBlue
            }}>
                <View style={{
                    flex: 2,
                    alignItems: 'center'
                }}>
                    <Icon 
                        name={icon} 
                        size={28} 
                        color={colors.bgPrimary}
                    />
                </View>
                <View style={{
                    flex: 10,
                    flexDirection: 'column'
                }}>
                    <Text
                        fontWeight={{...fonts.medium}}
                        size={11}
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
                        size={13}
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
                    paddingRight: 10,
                    alignItems: 'flex-end'
                }}>
                    <Text 
                        fontWeight={fonts.regular} 
                        size={9} color={colors.textGreyLight}
                    >
                        {`${moment(data.createdTime).format('DD MMM YYYY')}`}
                    </Text>
                        <View style={{
                            marginTop: 10,
                            backgroundColor: colors.bgPrimary,
                            padding: 5,
                            borderRadius: 5,
                            justifyContent: 'center'
                        }}>
                            <Text 
                                fontWeight={fonts.regular} 
                                size={11} color={colors.textWhite}
                            >
                                BARU
                            </Text>
                        </View>
                </View>
            </View>
        </TouchableOpacity>
        <Divider style={{height: 1, backgroundColor: colors.bgPrimary}} />
        </>
    )
}

export default NotifComponent;