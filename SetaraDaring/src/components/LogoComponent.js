import React from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { Text } from './common/UtilsComponent';

const LogoBrand = props => {
    const { colors, fonts } = useTheme()

    return (        
        <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
        }}>
            <View style={{
                backgroundColor: '#3AC9D6',
                paddingHorizontal: 10,
                borderRadius: 10,
            }}>
                <Text
                    fontWeight={{...fonts.bold}}
                    color={colors.textWhite}
                    size={props.miniLogo ? 18 : 28}
                >
                    seTARA
                </Text>
            </View>
            <View style={{
                paddingHorizontal: 10,
            }}>
                <Text
                    fontWeight={{...fonts.bold}}
                    color={colors.textWhite}
                    size={props.miniLogo ? 18 : 28}
                >
                    daring
                </Text>
            </View>
        </View>
    )
};

export default LogoBrand;