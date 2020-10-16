import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const LogoBrand = props => {
    return (
        <View style={{...styles.logo, ...props.style}}>
            <View style={styles.logo_box}>
                <Text style={styles.font_logo}>seTARA</Text>
            </View>
            <Text style={styles.font_logo}> daring</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    logo: {
        flexDirection: 'row',
        justifyContent: "center"
    },
    font_logo: {
        fontFamily: 'FrefokaOne-Regular',
        fontSize: 35,
        fontWeight: 'bold',
        color: '#F2F2FF'
    },
    logo_box: {
        width: 70 * 2,
        height: 50,
        backgroundColor: '#3AC9D6',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default LogoBrand;