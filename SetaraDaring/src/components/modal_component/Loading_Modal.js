import React from 'react';
import { Modal, Portal } from 'react-native-paper';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

const LoadingModal = ({visible}) => {
    return(
        <Portal>
            <Modal dismissable={false} visible={visible}>
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <LottieView 
                        source={require('../../assets/lottie/35480-app-preloader.json')} 
                        autoPlay 
                        style={{width: '50%'}}
                    />
                </View>
            </Modal>
        </Portal>
    )
}

export default LoadingModal