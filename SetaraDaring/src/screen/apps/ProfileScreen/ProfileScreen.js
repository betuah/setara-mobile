import React, { useCallback, useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, useTheme } from 'react-native-paper';
import { Text } from '../../../components/common/UtilsComponent';
import { Chase } from 'react-native-animated-spinkit';
import Icon from 'react-native-vector-icons/Ionicons';
import * as profileAction from '../../../store/actions/profileActions';
import { 
    View, 
    StyleSheet,
    ScrollView,
    Image,
    RefreshControl, 
} from 'react-native';

const ProfileScreen = (props) => {
    const { colors } = useTheme()
    const [ refreshing, setRefreshing ] = useState(false)
    const [ error, setError ] = useState(true);
    const [ profile, setProfile ] = useState(null)
    const profileState = useSelector(state => state.profile)
    const dispatch = useDispatch()

    useEffect(() => {
        if (profileState.profile) setProfile(profileState.profile)
    }, [profileState])

    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            const fetch = async () => {
                try {
                    if (isActive) {
                        if (profile === null) {
                            await dispatch(profileAction.initData())
                            setProfile(profileState.profile)
                            setError(false)
                            setRefreshing(false)
                        }
                    }
                } catch (error) {
                    setError(true)
                    setRefreshing(false)
                }
            }

            fetch();

            if (profile) props.navigation.navigate('Profil', {isEditable: true})

            return () => {
                isActive = false
            }

        }, [profileState.profile, profile, error])
    );

    const onRefresh = () => {
        setProfile(null)
    }

    if (error === true) 
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.loadingBackground
            }}>
                <Text style={{textAlign: 'center'}} size={16}>Maaf Terjadi Kesalahan, Scroll Ke bawah ya untuk menyegarakan Tampilan.</Text>
            </View>
        )

    if (profile === null && error === false) 
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.loadingBackground
            }}>
                <Chase size={48} color={colors.secondary}></Chase>
            </View>
        )

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        >
            <View style={styles.account}>
                <Card style={{
                    ...styles.accountContent,
                    elevation: 4
                }}>
                    <View style={{
                        backgroundColor: colors.cyan,
                        paddingVertical: 15,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <Image 
                            style={{
                                width: 120,
                                height: 120,
                                borderWidth: 3,
                                borderRadius: 100,
                                borderColor: colors.lightBlue
                            }}
                            source={{ uri: profile.foto }}   
                        />
                        <Text size={20} weight='bold' style={{color: colors.white, paddingTop: 10}}>{profile.nama.toUpperCase()}</Text>
                    </View>
                </Card>
                
                <Text style={{
                    marginHorizontal: 15, 
                    paddingVertical: 10, 
                    color: colors.secondary,
                    borderBottomWidth: 1, 
                    textAlign: 'center',
                    borderBottomColor: colors.secondary
                }}>
                    BIODATA
                </Text>

                <Card style={{
                    marginHorizontal: 10,
                    marginVertical: 15,
                    paddingTop: 10,
                    borderRadius: 5,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    borderTopColor: colors.secondary,
                    borderTopWidth: 3
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.textDark
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{width: 30}}><Icon name='mail' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Email</Text></View>
                        </View>
                        <View style={{flex: 4, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.email ? profile.email : '-'}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.textDark
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{width: 30}}><Icon name='male-female' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Gender</Text></View>
                        </View>
                        <View style={{flex: 4, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.jk ? profile.jk : '-'}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.textDark
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{width: 30}}><Icon name='school' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Sekolah</Text></View>
                        </View>
                        <View style={{flex: 4, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.sekolah ? profile.sekolah : '-'}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{width: 30}}><Icon name='map' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Alamat</Text></View>
                        </View>
                        <View style={{flex: 4, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.kota && profile.provinsi ? `${profile.kota && profile.kota},${profile.provinsi && profile.provinsi}` : '-'}</Text>
                        </View>
                    </View>
                </Card>
                <Text 
                    color={colors.secondary}
                    style={{
                        marginHorizontal: 15, 
                        paddingVertical: 10, 
                        borderBottomWidth: 1, 
                        textAlign: 'center',
                        borderBottomColor: colors.secondary,
                    }}
                >
                    SOCIAL MEDIA
                </Text>
                <Card style={{
                    marginHorizontal: 10,
                    marginVertical: 15,
                    paddingTop: 10,
                    borderRadius: 5,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 3 },
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    borderTopColor: colors.secondary,
                    borderTopWidth: 3
                }}>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.textDark
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{width: 30}}><Icon name='globe' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Website</Text></View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.website ? profile.website : '-'}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.textDark
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{width: 30}}><Icon name='logo-facebook' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Facebook</Text></View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.facebook ? profile.facebook : '-'}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingVertical: 10,
                        borderBottomWidth: 1,
                        borderBottomColor: colors.textDark
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                            <View style={{width: 30}}><Icon name='logo-linkedin' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>LinkedIn</Text></View>
                        </View>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.linkedin ? profile.linkedin : '-'}</Text>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        marginHorizontal: 15,
                        paddingHorizontal: 10,
                        paddingTop: 10,
                        paddingBottom: 20,
                    }}>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
                        <View style={{width: 30}}><Icon name='logo-twitter' color={colors.secondary} size={20} /></View>
                            <View><Text size={16} color={colors.textDark}>Twitter</Text></View>
                        </View>
                        <View style={{flex: 4, alignItems: 'flex-end'}}>
                            <Text size={16} weight='bold' color={colors.secondary}>{profile.twitter ? profile.twitter : '-'}</Text>
                        </View>
                    </View>
                </Card>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    account: {
        flex: 1,
        flexDirection: 'column',
    },
    accountHeader: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 5,
        borderBottomWidth: 1,
    },
    socialMedia: {
        flex: 1,
    }
});

export default ProfileScreen;