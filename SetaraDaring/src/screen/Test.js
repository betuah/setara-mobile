import React, { Fragment } from 'react';
import colors from '../constants/colors';
import { 
    View, 
    Text,
    StyleSheet, 
    SafeAreaView, 
    Dimensions,
    StatusBar, 
} from 'react-native';

const Test = ({ navigation }) => {
    return (
        <Fragment>
            <StatusBar barStyle="default" />
            <SafeAreaView style={{ flex: 0, backgroundColor: 'red' }} />
            <SafeAreaView style={{ flex: 1, backgroundColor: 'blue' }}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>Welcome to React Native!</Text>
                    <Text style={styles.instructions}>To get started, edit App.js</Text>
                </View>
            </SafeAreaView>
        </Fragment>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: colors.primary
    },
    LogoBrand: {
        paddingTop: Dimensions.get('window').height > 600 ? 40 : 20,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    button: {
        flex: 1,
        flexDirection: 'column',
        paddingVertical: 20,
        alignItems: "center"
    },
    signup: {
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    },
    form: {
        alignItems: 'center',
        paddingVertical: 10
    },
    body: {
        flex: 10
    },
    footer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkBlue,
        position: 'relative'
    }
});

export default Test;