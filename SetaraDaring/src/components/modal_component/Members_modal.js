import React from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { useTheme, Card, List, Divider, Avatar } from 'react-native-paper';
import { Text } from '../common/UtilsComponent';
import { FlatList } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const ListMembers = ({colors, fonts, name, role_name, school, picture}) => (
    <>
        <List.Item 
            title={name}
            titleStyle={{
                ...fonts.semiBold, 
                justifyContent: 'center',
                color: colors.textPrimary,
                fontSize: 14,
                marginLeft: 10,
            }}
            description={`${role_name} | ${school}`}
            descriptionStyle={{
                ...fonts.medium, 
                justifyContent: 'center',
                color: colors.textSecondary,
                fontSize: 10,
                marginLeft: 10,
            }}
            left={props => 
                <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    {
                        picture ?
                            <Avatar.Image 
                                size={40} 
                                source={{ uri: picture }}
                            />
                        :
                        <Avatar.Text size={16} label={name.split(" ").length === 1 ? name.split(" ")[0].slice(0, 1) : `${name.split(" ")[0].slice(0, 1)}${name.split(" ")[1].slice(0, 1)}`} />
                    }
                </View>
            } 
        />
        <Divider 
            inset={true} 
            style={{
                height: 1,
                backgroundColor: colors.bgPrimary,
                marginLeft: 60
            }}
        />
    </>
)

const Members_Modal = props => {
    const { colors, fonts } = useTheme()

    return (
            <Modal 
                isVisible={props.visible}
                onBackdropPress={() => props.onDismiss()}
                style={{
                    justifyContent: 'flex-end',
                    margin: 0
                }}
            >
                <Card style={{
                    backgroundColor: colors.bgPrimary,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                    maxHeight: Dimensions.get('window').height * 0.5,
                    elevation: 5,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingVertical: 8,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                    }}>
                        <View 
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 5,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                padding: 15,
                                zIndex: 100,
                            }}
                        >
                            <TouchableOpacity onPress={() => props.onDismiss()} activeOpacity={0.6}>
                                <Icon name='close' size={18} color={colors.textWhite} />
                            </TouchableOpacity>
                        </View>
                        <Text size={15} fontWeight={fonts.bold} color={colors.textWhite}>ANGGOTA KELAS</Text>
                        <Text size={11} fontWeight={fonts.regular} color={colors.textWhite}>Daftar anggota kelas.</Text>
                    </View>
                    <FlatList 
                        style={{
                            backgroundColor: colors.bgWhite,
                            paddingRight: 15,
                            paddingLeft: 5,
                            borderTopRightRadius: 15,
                            borderTopLeftRadius: 15,
                        }}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id.toString()}
                        data={props.data}
                        renderItem={itemData => <ListMembers key={itemData.item.id} {...itemData.item} colors={colors} fonts={fonts} />}
                        ListEmptyComponent={() => 
                                <View style={{
                                    flex: 1,
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginVertical: 20,
                                }}>
                                    <LottieView 
                                        source={require('../../assets/lottie/21270-student.json')} 
                                        autoPlay
                                        style={{
                                            width: '30%',
                                            alignItems: 'center',
                                        }}
                                    />
                                    <Text style={{textAlign: 'center'}} fontWeight={fonts.medium} color={colors.textPrimary}>Tidak ditemukan Anggota Kelas.</Text>
                                </View>
                            }
                    />
                </Card>
            </Modal>
    )
}

export default Members_Modal;