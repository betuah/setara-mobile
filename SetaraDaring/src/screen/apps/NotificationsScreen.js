import React, { useEffect, useState } from 'react';
import { StatusBar, FlatList } from 'react-native';
import { View, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import NotifComponent from '../../components/NotifComponent';
import EmptyComponent from '../../components/EmptyComponent';
import { Modal, Portal, Title, Paragraph, Card, Divider, Caption } from 'react-native-paper';
import moment from 'moment/min/moment-with-locales';
import * as notifActions from '../../store/actions/notifActions'

const NotificationsScreen = ({ navigation }) => {
    moment.locale('id')
    const { notif } = useSelector(state =>  state.notif)
    const [modal, setModal] = useState(false)
    const [modalData, setModalData] = useState({})
    const dispatch = useDispatch()

    const showModal = data => {
        setModalData(data)
        setModal(true)
        dispatch(notifActions.read(data))
    }
    const hideModal = () => setModal(false)

    useEffect(() => {
        navigation.setOptions({
            tabBarVisible:false
        })
    }, [notif])

    return (
        <View style={styles.screen}>
            <StatusBar translucent backgroundColor="transparent" barStyle='dark-content' />
            <Portal>
                <Modal visible={modal} onDismiss={hideModal} contentContainerStyle={styles.modal}>
                    <Card>
                        <Card.Content>
                            <Title style={{textAlign: 'center'}}>{modalData.notifTitle}</Title>
                            <Divider />
                            <Paragraph>{modalData.notifContent}</Paragraph>
                            <Caption style={{paddingTop: 10, textAlign: 'right'}}>{`${moment(modalData.createdTime).startOf('day').fromNow()}`}</Caption>
                        </Card.Content>
                    </Card>
                </Modal>
            </Portal>
            <FlatList
                keyExtractor={(item, index) => item.id}
                data={notif}
                renderItem={itemData => <NotifComponent showModal={showModal} data={itemData.item} />}
                ListEmptyComponent={() => (
                    <EmptyComponent />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal: {
        margin: 50,
    }
});

export default NotificationsScreen;