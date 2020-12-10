import React, { useState } from 'react';
import { Dimensions, TouchableOpacity, View, FlatList } from 'react-native';
import { useTheme, Card, List, Divider, Portal } from 'react-native-paper';
import { Text, Input } from '../common/UtilsComponent';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

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
                fontSize: 12,
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
                height: 1,
                backgroundColor: colors.bgPrimary,
                marginLeft: 55
            }}
        />
    </>
)

const Mapel_Modal = props => {
    const { colors, fonts } = useTheme()
    const [ search, setSearch ] = useState('')

    const data = props.data.filter(item => {
        return item.nama.toLowerCase().includes(search.toLowerCase())
    })

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
        fontSize: 12,
        IconColor: colors.bgPrimary,
        IconSize: 18,
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
        <Portal>
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
                maxHeight: Dimensions.get('window').height * 0.6,
            }}>
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',                    
                    paddingVertical: 5,
                    borderTopRightRadius: 20,
                    borderTopLeftRadius: 20,
                }}>
                    <Divider 
                        style={{
                            borderRadius: 10,
                            marginTop: 5,
                            marginBottom: 5,
                            height: 3,
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
                    <Text size={16} fontWeight={fonts.bold} color={colors.textWhite}>MATA PELAJARAN</Text>
                </View>
                <View style={{
                    paddingLeft: 18,
                    paddingRight: 23,
                    paddingBottom: 15,
                    backgroundColor: colors.bgLight,
                    flexDirection: 'row',
                    elevation: 1,
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.5,
                    shadowRadius: 1,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                }}>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <Icon name='search' size={18} color={colors.bgPrimary} />
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
                <FlatList 
                    style={{
                        paddingBottom: 20,
                        backgroundColor: colors.bgLight,
                    }}
                    keyExtractor={(item) => item.id.toString()}
                    data={data}
                    extraData={data}
                    renderItem={itemData => <ListMapel key={itemData.item.id} title={itemData.item.nama} id={itemData.item.id} onPress={props.itemPress} colors={colors} fonts={fonts} />}
                    ListEmptyComponent={() => 
                        <View style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical: 20,
                        }}>
                            <LottieView 
                                source={require('../../assets/lottie/33279-stack-of-books.json')} 
                                autoPlay
                                style={{
                                    width: '30%',
                                    alignItems: 'center',
                                }}
                            />
                            <Text style={{textAlign: 'center'}} fontWeight={fonts.medium} color={colors.textPrimary}>Mata Pelajaran tidak tersedia.</Text>
                        </View>
                    }
                />
            </Card>
        </Modal>
        </Portal>
    )
}

export default Mapel_Modal;