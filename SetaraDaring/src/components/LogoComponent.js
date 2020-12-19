import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from 'react-native-paper';

const LogoBrand = props => {
    const { colors, fonts } = useTheme()

    return !props.miniLogo ? (        
        <View style={{...styles.logo, ...props.style}}>
            <View style={styles.logo_box}>
                <Text style={{...styles.font_logo, ...fonts.bold}}>seTARA</Text>
            </View>
            <Text style={{...styles.font_logo, ...fonts.bold}}> daring</Text>
        </View>
        ) : (
            <View style={{...styles.logo, ...props.style}}>
                <View style={styles.logo_box_mini}>
                    <Text style={{...styles.font_logo_mini, ...fonts.bold}}>seTARA</Text>
                </View>
                <Text style={{...styles.font_logo_mini, ...fonts.bold}}> daring</Text>
            </View>
        )
};

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    font_logo: {
        fontSize: 30,
        color: '#F2F2FF'
    },
    logo_box: {
        width: 60 * 2,
        height: 43,
        backgroundColor: '#3AC9D6',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    font_logo_mini: {
        fontSize: 23,
        color: '#F2F2FF'
    },
    logo_box_mini: {
        width: 45 * 2,
        height: 30,
        backgroundColor: '#3AC9D6',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default LogoBrand;