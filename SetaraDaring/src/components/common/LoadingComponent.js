import React from 'react';
import { View, ImageBackground, StatusBar} from 'react-native';
import {useTheme} from 'react-native-paper';
import LottieView from 'lottie-react-native';

const LoadingComponent = () => {
    const { fonts, colors } = useTheme()

    return (
        <View style={{
            flex: 1,
        }}>
            <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
            <ImageBackground 
                source={require('../../assets/images/bgScreenSoftBlue.png')}
                style={{flex: 1,}}
                resizeMode="cover"
            >
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LottieView 
                        source={require('../../assets/lottie/28893-book-loading.json')} 
                        autoPlay
                        style={{
                            width: '40%',
                            alignItems: 'center',
                        }}
                    />
                </View>
            </ImageBackground>
        </View>
    )
}

export default LoadingComponent