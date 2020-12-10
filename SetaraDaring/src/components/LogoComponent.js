import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LogoBrand = props => {
    return !props.miniLogo ? (
        <View style={{...styles.logo, ...props.style}}>
            <View style={styles.logo_box}>
                <Text style={styles.font_logo}>seTARA</Text>
            </View>
            <Text style={styles.font_logo}> daring</Text>
        </View>
        ) : (
            <View style={{...styles.logo, ...props.style}}>
                <View style={styles.logo_box_mini}>
                    <Text style={styles.font_logo_mini}>seTARA</Text>
                </View>
                <Text style={styles.font_logo_mini}> daring</Text>
            </View>
        )
};

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    font_logo: {
        fontFamily: 'FrefokaOne-Regular',
        fontSize: 30,
        fontWeight: 'bold',
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
        fontFamily: 'FrefokaOne-Regular',
        fontSize: 23,
        fontWeight: 'bold',
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