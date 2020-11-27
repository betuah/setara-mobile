import React from 'react';
import { Dimensions, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import { List, Caption } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment';

const NotifComponent = props => {
    const { colors } = useTheme();

    return (
        <TouchableOpacity onPress={() => props.showModal(props.data)}>
            <List.Item
                title={props.data.notifTitle}
                description={props.data.notifContent}
                style={!props.data.read ? {
                    width: Dimensions.get('window').width, 
                    borderBottomWidth: 1,
                    borderColor: colors.secondary,
                    backgroundColor: colors.light
                } : {
                    width: Dimensions.get('window').width, 
                    borderBottomWidth: 1,
                    borderColor: colors.secondary,
                }}
                right={data => {
                    return (
                        <View style={{
                            flex: 1,
                            alignItems: 'flex-end'
                        }}>
                            <Caption>{moment(props.data.createdTime).format('h:mm a D/mm/yy')}</Caption>
                            <Caption>{`${moment(props.data.createdTime).startOf('day').fromNow()}`}</Caption>
                        </View>
                    )
                }}
            />
        </TouchableOpacity>
    )
}

export default NotifComponent;