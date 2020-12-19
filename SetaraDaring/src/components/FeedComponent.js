import React, { useState } from 'react';
import { Divider, useTheme } from 'react-native-paper';
import { useWindowDimensions, View, TouchableOpacity } from 'react-native';
import { Text } from './common/UtilsComponent';
import { Avatar, Card, Menu } from 'react-native-paper';
import HTML from 'react-native-render-html';
import Icon from 'react-native-vector-icons/Ionicons';
import moment from 'moment/min/moment-with-locales';
moment.locale('id')

const FeedComponent = props => {
    const { colors, fonts } = useTheme()
    const [visible, setVisible] = useState(false);

    const openMenu = () => setVisible(true);

    const closeMenu = () => setVisible(false);

    return (
        <Card style={{
            marginHorizontal: 10,
            marginVertical: 5,
            borderRadius: 10,
            elevation: 2,
            shadowOffset: { width: 1, height: 2 },
            shadowOpacity: 0.3,
            shadowRadius: 2,
        }}>
            <Card.Content>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start'
                    }}>
                        <Avatar.Image size={40} source={{ uri: props.foto_creator }} />
                    </View>
                    
                    <View style={{
                        flex: 10,
                        paddingLeft: 10,
                        flexDirection: 'column'
                    }}>
                        <Text weight='bold' color={colors.primary} size={14}>
                            {props.nama_creator}
                        </Text>
                        {
                            !props.postScreen ?
                            <TouchableOpacity onPress={() => props.onClassPress(props.id_kelas)} activeOpacity={0.6}>
                                <Text weight='bold' color={colors.orange} size={12}>
                                    {props.nama_kelas} 
                                </Text>
                            </TouchableOpacity>
                            :
                                <Text weight='bold' color={colors.orange} size={12}>
                                    {props.nama_kelas} 
                                </Text>
                        }
                        <Text color={colors.textGrey} size={10}>
                            {`${moment(props.date_created).startOf('day').fromNow()}`}
                        </Text>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                        }}>
                        <Menu
                            visible={visible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity 
                                    onPress={openMenu}
                                    activeOpacity={0.6}
                                >
                                    <Icon name='ellipsis-horizontal' size={20} color={colors.textGrey} />
                                </TouchableOpacity>
                            }
                        >
                            <Menu.Item onPress={() => { closeMenu(); props.onDetailPress(props._id, props.date_created)}} title="Detail Posting" titleStyle={{fontSize: 12,}} />
                            {
                                !props.postScreen && <Menu.Item onPress={() => { closeMenu(); props.onClassPress(props.id_kelas)}} title="Posting Kelas" titleStyle={{fontSize: 12,}} />
                            }
                        </Menu>
                    </View>
                </View>
                <Divider style={{height: 1,}} />
                <View style={{
                    marginTop: 10,
                }}>
                    <HTML 
                        html={props.isi_postingan} 
                        baseFontStyle={{color: colors.textDark, ...fonts.regular, fontSize: 11}} 
                        contentWidth={useWindowDimensions().width * 0.90}
                        imagesMaxWidth={useWindowDimensions().width * 0.93}
                        enableExperimentalPercentWidt={true}
                        staticContentMaxWidth={useWindowDimensions().width * 0.93}
                        onLinkPress={(event, url) => Linking.openURL(`${env.file_domain}/${url}`)}
                        alterChildren = {node => {
                            if (node.attribs.src) {
                                const firtsPath = node.attribs.src.split('/')
                                if (firtsPath[0] === 'assets') node.attribs.src = `${env.file_domain}/${node.attribs.src}`
                            }

                            if (node.name === 'iframe') {
                                delete node.attribs.width;
                            }
                            return node.children;
                        }}
                    />
                </View>
            </Card.Content>
        </Card>
    )
}

export default FeedComponent;