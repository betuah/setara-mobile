import React from 'react';
import { Image, ImageBackground, Platform, ScrollView, StatusBar, View } from 'react-native';
import { Divider, useTheme } from 'react-native-paper';
import { Text } from '../../../components/common/UtilsComponent';
import Icon from 'react-native-vector-icons/Ionicons';

const AboutScreen = () => {
    const { colors, fonts } = useTheme()

    return (
        <>
            <StatusBar barStyle='light-content' backgroundColor={colors.primary} />
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    backgroundColor: colors.bgPrimary,
                    elevation: 3,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 2,
                    marginBottom: Platform.OS === 'ios' ? 3 : 0,
                }}>
                    <ImageBackground 
                        source={require('../../../assets/images/icon_pattern.png')}
                        style={{
                            paddingVertical: 40,
                            paddingHorizontal: 15,
                            alignItems: 'center'
                        }}
                        resizeMode="cover"
                    >
                        <Image
                            style={{
                                width: 200,
                                height: 70,
                            }}
                            source={require('../../../assets/images/setaraDaring_splashLogo.png')}
                            resizeMode='contain'
                        />
                    </ImageBackground>
                </View>
                <View>
                    <ImageBackground 
                        source={require('../../../assets/images/bgScreenSoftBlue.png')}
                        style={{paddingVertical: 15, paddingHorizontal: 10,}}
                        resizeMode="cover"
                    >
                        <View style={{
                            backgroundColor: colors.bgWhite,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 3,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}>
                            <Text
                                style={{marginBottom: 5,}}
                                fontWeight={{...fonts.semiBold}}
                                color={colors.textPrimary}
                                size={14}
                            >
                                S e t a r a D a r i n g
                            </Text>
                            <Divider />
                            <View style={{
                                paddingVertical: 10,
                            }}>
                                <Text
                                    style={{
                                        textAlign: 'justify'
                                    }}
                                    fontWeight={{...fonts.regular}}
                                    color={colors.grey}
                                    size={12}
                                >
                                    SetaraDaring merupakan aplikasi versi mobile untuk aplikasi http://setara.kemdikbud.go.id yang dikeluarkan oleh Kementerian Pendidikan dan Kebudayaan Indonesia melalui Direktorat Pendidikan Masyarakat dan Pendidikan Khusus serta bekerjasama dengan SEAMOLEC. Aplikasi ini dapat digunakan untuk satuan pendidikan nonformal yang ingin melaksanakan pembelajaran setara daring dengan menggunakan smartphone android.
                                </Text>
                            </View>
                        </View>
                        <View style={{
                            backgroundColor: colors.bgWhite,
                            marginTop: 10,
                            paddingHorizontal:70,
                            borderRadius: 10,
                            elevation: 3,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}>
                            <Image
                                source={require('../../../assets/images/pmpk-logo.png')}
                                resizeMode='contain'
                                style={{
                                    width: '100%',
                                }}
                            />
                        </View>
                        <View style={{
                            backgroundColor: colors.bgWhite,
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 3,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}>
                            <Text
                                style={{marginBottom: 5,}}
                                fontWeight={{...fonts.semiBold}}
                                color={colors.textPrimary}
                                size={14}
                            >
                                C a t a t a n   P e r u b a h a n
                            </Text>
                            <Divider />
                            <View style={{
                                paddingTop: 30,
                                paddingVertical: 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    backgroundColor: colors.bgPrimary,
                                    borderRadius: 5,
                                    paddingHorizontal: 5,
                                }}>
                                    <Text
                                        style={{
                                            textAlign: 'justify'
                                        }}
                                        fontWeight={{...fonts.bold}}
                                        color={colors.textWhite}
                                        size={14}
                                    >
                                        SetaraDaring v1.1
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                marginVertical: 15,
                                paddingHorizontal: 10,
                            }}>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Fitur Ubah Password (Pengajar dan Pelajar)
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Tentang Applikasi
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Fitur Saran dan Masukan
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Fitur Laporan Permasalahan
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Perubahan backgound pada screen kelas
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Perbaikan permasalahan tidak dapat scroll pada fitur detail Kelas
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Perbaikan pada saat update perubahan profil yang tidak terupdate.
                                    </Text>
                                </View>
                                <View style={{
                                    flexDirection: 'row'
                                }}>
                                    <View style={{
                                        justifyContent: 'center',
                                        marginRight: 5,
                                    }}>
                                        <Icon name='checkmark' size={18} color={colors.primary} />
                                    </View>
                                    
                                    <Text 
                                        fontWeight={{...fonts.regular}}
                                        size={12}
                                        color={colors.textGrey}
                                    >
                                        Menambahkan tinggi Pop Up Anggota Kelas pada bagian lihat anggota detail kelas.
                                    </Text>
                                </View>
                            </View>
                        </View>                        
                        <View style={{
                            backgroundColor: colors.bgWhite,
                            marginTop: 10,
                            padding: 10,
                            borderRadius: 10,
                            elevation: 3,
                            shadowOffset: { width: 1, height: 2 },
                            shadowOpacity: 0.3,
                            shadowRadius: 2,
                        }}>
                            <Text
                                style={{marginBottom: 5,}}
                                fontWeight={{...fonts.semiBold}}
                                color={colors.textPrimary}
                                size={14}
                            >
                                D e v e l o p e r   T e a m
                            </Text>
                            <Divider />
                            <View style={{
                                paddingVertical: 10,
                            }}>
                                <View style={{
                                    paddingBottom: 20,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>
                                    <Image
                                        style={{
                                            width: 70,
                                            height: 80,
                                        }}
                                        source={require('../../../assets/images/seamolec-logo.png')}
                                        resizeMode='cover'
                                    />
                                </View>
                                <Divider />
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                }}>
                                    <View style={{
                                        marginRight: 10,
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name='at-circle' size={25} color={colors.primary} />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                textAlign: 'justify'
                                            }}
                                            fontWeight={{...fonts.medium}}
                                            color={colors.grey}
                                            size={12}
                                        >
                                            Betuah Anugerah
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'justify'
                                            }}
                                            fontWeight={{...fonts.regular}}
                                            color={colors.grey}
                                            size={11}
                                        >
                                            betuah@seamolec.org
                                        </Text>
                                    </View>
                                </View>
                                <Divider />
                                <View style={{
                                    flexDirection: 'row',
                                    marginVertical: 5,
                                }}>
                                    <View style={{
                                        marginRight: 10,
                                        justifyContent: 'center'
                                    }}>
                                        <Icon name='at-circle' size={25} color={colors.primary} />
                                    </View>
                                    <View>
                                        <Text
                                            style={{
                                                textAlign: 'justify'
                                            }}
                                            fontWeight={{...fonts.medium}}
                                            color={colors.grey}
                                            size={12}
                                        >
                                            Ihsan Fauzi
                                        </Text>
                                        <Text
                                            style={{
                                                textAlign: 'justify'
                                            }}
                                            fontWeight={{...fonts.regular}}
                                            color={colors.grey}
                                            size={11}
                                        >
                                            ihsanfauzi@seamolec.org
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </ScrollView>
        </>
    )
}

export default AboutScreen;