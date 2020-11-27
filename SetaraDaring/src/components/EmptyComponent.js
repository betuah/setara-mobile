import React from 'react';
import { Text } from './common/UtilsComponent';
import colors from '../constants/colors';
import LottieView from 'lottie-react-native';
import { View } from 'react-native';

const EmptyComponent = props => {
    return (
        <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '50%'
        }}>
            <LottieView 
                source={require('../assets/lottie/33173-smartphone-addicition.json')} 
                autoPlay
                style={{
                    width: '60%',
                    alignItems: 'center',
                }}
            />
            <Text style={{textAlign: 'center'}} color={colors.primary}>Tidak Ada Pemberitahuan</Text>
        </View>
    )
}

export default EmptyComponent;