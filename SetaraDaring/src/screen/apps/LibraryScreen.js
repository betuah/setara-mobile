import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text } from '../../components/common/UtilsComponent';
import { Fold } from 'react-native-animated-spinkit';
import colors from '../../constants/colors';
import { WebView } from 'react-native-webview';
import { 
    View,
} from 'react-native';

const LibraryScreen = ({ navigation }) => {
    let WebViewRef;
    const {refresh} = useSelector(state => state.library)

    useEffect(() => {
        WebViewRef && WebViewRef.goBack();
        navigation.setOptions({
            tabBarVisible: true
        })
    }, [refresh])

    return (
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
                        color={colors.darkOrange}
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
                        <Fold  size={48} color={colors.darkOrange}></Fold>
                        <Text
                            color={colors.darkOrange}
                            size={18}
                            weight='bold'
                            style={{marginTop: 20}}
                        >Loading...</Text>
                    </View>
                )
            }}
        />
    )
}

export default LibraryScreen;