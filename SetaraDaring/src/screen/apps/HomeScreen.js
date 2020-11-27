import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from 'react-native-paper';
import { Text } from '../../components/common/UtilsComponent';
import LottieView from 'lottie-react-native';
import { useSafeAreaInsets  } from 'react-native-safe-area-context';
import { 
    View, 
    StyleSheet, 
    TouchableWithoutFeedback, 
    Keyboard,
    Dimensions, 
    StatusBar, 
    FlatList,
    ImageBackground,
    RefreshControl
} from 'react-native';
import FeedComponent from '../../components/FeedComponent';
import * as homeAct from '../../store/actions/homeActions';
import { Chase } from 'react-native-animated-spinkit';

const LoginScreen = ({ navigation }) => {
    const { colors } = useTheme()
    const authData = useSelector(state => state.auth)
    const homeState = useSelector(state => state.home)
    const [ refreshing, setRefreshing ] = useState(false)
    const [ error, setError ] = useState(true);
    const [ screenLoading, setScreenLoading ] = useState(true);
    const dispatch = useDispatch()
    const feed = homeState.feed
    const insets = useSafeAreaInsets();
    const name = authData.fullName

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible:false
        })

        setScreenLoading(false)

        navigation.addListener('focus', async () => {
            try {
                await dispatch(homeAct.initData())
                setError(false)
                setRefreshing(false)
            } catch (error) {
                setError(true)
                setRefreshing(false)
            }
        });
    }, [homeState, error, screenLoading])

    const onRefresh = async () => {
        try {
            await dispatch(homeAct.initData())
            setError(false)
            setRefreshing(false)
        } catch (error) {
            setError(true)
            setRefreshing(false)
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
            <ImageBackground 
                source={require('../../assets/images/cat.png')}
                style={{width:"100%",height:"100%"}}
            >
            <View style={styles.screen}>
                <StatusBar 
                    translucent 
                    backgroundColor="transparent" 
                    barStyle='light-content'
                />
                    <View style={styles.header}>
                        <View style={{...styles.headerContent, paddingTop: insets.top + 10,}}>
                            <Text color={colors.light} size={16}>{`Selamat Belajar`}</Text>
                            <Text color={colors.light} size={18} weight='bold'>{`${name}`}</Text>
                        </View>
                        <View style={{
                            flex: 1,
                            justifyContent: 'flex-end',
                            paddingTop: insets.top + 10,
                            paddingRight: 20,
                        }}>
                            <LottieView 
                                source={require('../../assets/lottie/30305-back-to-school.json')} 
                                autoPlay
                                style={{width: '90%'}}
                            />
                        </View>
                    </View>
                    <View style={{...styles.content, backgroundColor: colors.light}}>
                        <FlatList
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                            style={{
                                marginTop: 10
                            }}
                            keyExtractor={(item) => item.id.toString()}
                            data={feed}
                            renderItem={itemData => <FeedComponent {...itemData.item} />}
                            ListEmptyComponent={() => 
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '30%'
                                }}>
                                    <LottieView 
                                        source={require('../../assets/lottie/33173-smartphone-addicition.json')} 
                                        autoPlay
                                        style={{
                                            width: '40%',
                                            alignItems: 'center',
                                        }}
                                    />
                                    <Text style={{textAlign: 'center'}} color={colors.primary}>Tidak Ada Postingan</Text>
                                </View>
                            }
                        />
                    </View>
            </View>
            </ImageBackground>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    LogoBrand: {
        flex: 1
    },
    header: {
        flex: 3,
        flexDirection: 'row'
    },
    headerContent: {
        flex: 1,
        flexDirection: 'column',
        paddingLeft: 25,
        paddingBottom: 15,
        justifyContent: 'flex-end' 
    },
    content: {
        flex: 7,
        marginTop: 10,
        height: '100%'
    },
    LogoBrand: {
        paddingTop: Dimensions.get('window').height > 600 ? 40 : 20,
        paddingBottom: Dimensions.get('window').height > 600 ? 20 : 10
    }
});

export default LoginScreen;