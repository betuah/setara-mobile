import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme, Appbar } from 'react-native-paper';
import { Text } from '../common/UtilsComponent';
import { StatusBar } from 'react-native';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

const Header = ({ data, scene, previous, navigation, style, contentStyle, titleStyle, subtitleStyle, Action, ActionOnPress }) => {
    const { fonts, colors } = useTheme()

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={colors.primary} />
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
                <Appbar.Content
                    title={data.title.toUpperCase()}
                    color={colors.textWhite}
                    subtitle={data.createdDate ? `${moment(data.createdDate).format('D MMM Y')} - ${moment(data.createdDate).startOf('day').fromNow()}` : (data.subtitle ? data.subtitle : null)}
                    titleStyle={{
                        ...fonts.semiBold,
                        fontSize: 14,
                        ...titleStyle,
                    }}
                    subtitleStyle={{
                        ...fonts.regular,
                        fontSize: 10,
                        ...subtitleStyle
                    }}
                    style={{
                        ...contentStyle
                    }}
                />
                { Action &&
                    <Appbar.Action 
                        size={Action && Action.Size ? Action.Size : 20}
                        color={Action && Action.Color ? Action.Color : colors.textWhite}
                        icon={Action && Action.Icon ? Action.Icon : "dots-vertical"} 
                        onPress={ActionOnPress} 
                        style={{...Action.Style && Action.style}}
                    />
                }
            </Appbar.Header>
        </SafeAreaView>
    )
}

export default Header