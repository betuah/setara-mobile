import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View } from 'react-native';
import { useTheme, Card, List, Divider, Button } from 'react-native-paper';
import { Text, Btn, Input } from '../common/UtilsComponent';
import { ScrollView } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons'; 

const ListMapel = ({colors, fonts, id, title, onPress}) => (
    <>
        <List.Item 
            onPress={() => onPress(id)}
            style={{
                margin: 0,
            }}
            title={title}
            titleNumberOfLines={3}
            titleStyle={{
                ...fonts.semiBold, 
                justifyContent: 'center',
                color: colors.textPrimary,
                fontSize: 14,
                marginLeft: 0,
            }}
            left={props => 
                <List.Icon 
                    {...props} 
                    color={colors.textSecondary} 
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 0,
                        marginHorizontal: 0,
                    }} 
                    icon='notebook' 
                />
            } 
            right={props => 
                <List.Icon 
                    {...props} 
                    color={colors.accent} 
                    icon='chevron-right' 
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginVertical: 0,
                        marginHorizontal: 0,
                    }} 
                />
            }
        />
        <Divider 
            inset={true} 
            style={{
                height: 1.5,
                backgroundColor: colors.bgPrimary,
                marginLeft: 55
            }}
        />
    </>
)

const Mapel_Modal = props => {
    const { colors, fonts } = useTheme()
    const [ search, setSearch ] = useState('')

    const onSearch = value => {
        setSearch(value)
    }

    const onDismiss = () => {
        setSearch('')
        props.onDismiss('mapel')
    }

    const InputDefaultStyle = {
        selectionColor: colors.bgPrimary,
        underlineColor: colors.bgPrimary,
        fontSize: 14,
        IconColor: colors.bgPrimary,
        IconSize: 23,
        theme: {
            colors: { 
                text: colors.bgPrimary,
                placeholder: colors.bgPrimary,
                error: colors.accent,
                primary: colors.bgPrimary
            },
        }
    }

    return (
        <Modal 
            isVisible={props.visible}
            onBackdropPress={() => onDismiss()}
            onSwipeComplete={() => onDismiss()}
            swipeDirection={['down']}
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
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 10,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                    <Divider 
                        style={{
                            borderRadius: 10,
                            marginTop: 5,
                            marginBottom: 5,
                            height: 5,
                            width: 50,
                            backgroundColor: colors.textLightAccent,
                        }}
                    />
                    <View
                        style={{
                            position: 'absolute',
                            right: 0,
                            top: 10,
                            bottom: 0,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                            padding: 15,
                            zIndex: 100,
                        }}
                    >
                        <TouchableOpacity onPress={() => onDismiss()}>
                        <Icon name='close' size={20} color={colors.textLight} />
                        </TouchableOpacity>
                    </View>
                    <Text size={18} fontWeight={fonts.bold} color={colors.textWhite}>MATA PELAJARAN</Text>
                </View>
                <View style={{
                    paddingLeft: 18,
                    paddingRight: 23,
                    paddingBottom: 15,
                    backgroundColor: colors.bgLight,
                    flexDirection: 'row',
                    elevation: 1,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='search' size={23} color={colors.bgPrimary} />
                    </View>
                    <View style={{flex: 10, justifyContent: 'center'}}>
                        <Input
                            label="Cari"
                            placeholder="Masukan nama pelajaran"
                            value={search}
                            color={colors.accent}
                            defaultStyle={InputDefaultStyle}
                            onChangeText={e => onSearch(e)}
                        />
                    </View>
                </View>
                {/* <Divider style={{height: 2}} /> */}
                <ScrollView contentContainerStyle={{
                    paddingBottom: 20,
                    backgroundColor: colors.bgLight,
                }}>
                    { props.data.filter(item => {
                        return item.nama.toLowerCase().includes(search.toLowerCase())
                    }).map((item, index) => <ListMapel key={index} title={item.nama} id={item.id} onPress={props.itemPress} colors={colors} fonts={fonts} /> )}
                </ScrollView>
            </Card>
        </Modal>
    )
}

export default Mapel_Modal;