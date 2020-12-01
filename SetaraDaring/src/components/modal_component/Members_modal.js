import React from 'react';
import { Dimensions, View } from 'react-native';
import { useTheme, Card, List, Divider, Avatar } from 'react-native-paper';
import { Text } from '../common/UtilsComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; 

const ListMembers = ({colors, fonts, name, role_name, school, picture}) => (
    <>
        <List.Item 
            title={name}
            titleStyle={{
                ...fonts.semiBold, 
                justifyContent: 'center',
                color: colors.textPrimary,
                fontSize: 16,
                marginLeft: 10,
            }}
            description={`${role_name} | ${school}`}
            descriptionStyle={{
                ...fonts.medium, 
                justifyContent: 'center',
                color: colors.textSecondary,
                fontSize: 12,
                marginLeft: 10,
            }}
            left={props => 
                <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Avatar.Image 
                        size={40} 
                        source={{ uri: picture}}
                    />
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

    const onDismiss = () => {
        props.onDismiss('members')
    }

    return (
            <Modal 
                isVisible={props.visible}
                onBackdropPress={() => onDismiss()}
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
                        paddingVertical: 14,
                        borderTopRightRadius: 20,
                        borderTopLeftRadius: 20,
                    }}>
                        <View 
                            style={{
                                position: 'absolute',
                                right: 0,
                                top: 0,
                                bottom: 0,
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                                padding: 15,
                            }}
                        >
                            <TouchableOpacity onPress={() => onDismiss()}>
                                <Icon name='close' size={20} color={colors.textLight} />
                            </TouchableOpacity>
                        </View>
                        <Text size={18} fontWeight={fonts.bold} color={colors.textWhite}>ANGGOTA KELAS</Text>
                    </View>
                    <ScrollView contentContainerStyle={{
                        backgroundColor: colors.bgWhite,
                        paddingRight: 15,
                        paddingLeft: 5,
                    }}>
                        { props.data.map(item => <ListMembers key={item.id} {...item} colors={colors} fonts={fonts} />) }
                    </ScrollView>
                </Card>
            </Modal>
    )
}

export default Members_Modal;