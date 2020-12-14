import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Text } from '../../components/common/UtilsComponent';
import { Fold } from 'react-native-animated-spinkit';
import { WebView } from 'react-native-webview';
import { 
    View,
} from 'react-native';

const LibraryScreen = ({ navigation }) => {
    let WebViewRef;
    const {colors} = useTheme()
    const {refresh} = useSelector(state => state.library)

    useEffect(() => {
        WebViewRef && WebViewRef.goBack();
        navigation.setOptions({
            tabBarVisible: true
        })
    }, [refresh])

    return (
        <>
        <StatusBar backgroundColor={colors.primary} barStyle='light-content' />
        <WebView
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            source={{ uri: 'https://emodul.kemdikbud.go.id/' }} 
            startInLoadingState={true}
            allowsBackForwardNavigationGestures
            renderError={() => 
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text
                        color={colors.grey}
                        size={18}
                        weight='bold'
                        style={{marginTop: 20}}
                    >Error...</Text>
                </View>
            }
                
            renderLoading={() => {
                return (
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Fold  size={48} color={colors.primary}></Fold>
                    </View>
                )
            }}
        />
        </>
    )
}

export default LibraryScreen;