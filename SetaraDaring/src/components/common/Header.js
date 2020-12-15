import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Appbar } from 'react-native-paper';
import { Text } from '../common/UtilsComponent';
import { StatusBar } from 'react-native';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

const Header = ({ data, scene, previous, navigation, style, contentStyle, titleStyle, subtitleStyle, action, actionOnPress, leftIcon, leftIconOnPress }) => {
    const { fonts, colors } = useTheme()

    return (
        <SafeAreaView>
            <Appbar.Header
                style={{
                    backgroundColor: colors.primary,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    ...style,
                }}
            >
                { previous ? (
                    <Appbar.BackAction
                        onPress={() => navigation.goBack()}
                        color={colors.bgWhite}
                    />
                ) : null}
                { leftIcon &&
                    <Appbar.Action 
                        size={leftIcon && leftIcon.size ? leftIcon.size : 20}
                        color={leftIcon && leftIcon.color ? leftIcon.color : colors.textWhite}
                        icon={leftIcon && leftIcon.icon ? leftIcon.icon : "dots-vertical"} 
                        onPress={leftIconOnPress} 
                        style={{...leftIcon.style && leftIcon.style}}
                    />
                }
                <Appbar.Content
                    title={data.title.toUpperCase()}
                    color={colors.textWhite}
                    subtitle={data.createdDate ? `${moment(data.createdDate).startOf('day').fromNow()}` : (data.subtitle ? data.subtitle : null)}
                    titleStyle={{
                        ...fonts.semiBold,
                        fontSize: 14,
                        ...titleStyle,
                    }}
                    subtitleStyle={{
                        ...fonts.regular,
                        fontSize: 11,
                        ...subtitleStyle
                    }}
                    style={{
                        ...contentStyle
                    }}
                />
                { action &&
                    <Appbar.Action 
                        size={action && action.size ? action.size : 20}
                        color={action && action.color ? action.color : colors.textWhite}
                        icon={action && action.icon ? action.icon : "dots-vertical"} 
                        onPress={() => actionOnPress()} 
                        style={{...action.style && action.style}}
                    />
                }
            </Appbar.Header>
        </SafeAreaView>
    )
}

export default Header