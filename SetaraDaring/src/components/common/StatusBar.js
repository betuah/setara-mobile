import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

const StatusBarPlaceHolder = props => {
    const { colors } = useTheme()
    
    return (
        <View style={{
            width: "100%",
            height: props.barHeight ? props.barHeight : STATUS_BAR_HEIGHT,
            backgroundColor: props.bgColor ? props.bgColor : colors.primary
        }}>
            <StatusBar
                barStyle="light-content"
            />
        </View>
    );
}

export default StatusBarPlaceHolder