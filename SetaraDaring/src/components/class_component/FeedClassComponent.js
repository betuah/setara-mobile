import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../common/UtilsComponent';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Card, Paragraph, useTheme } from 'react-native-paper';
import moment from 'moment';
import HTML from 'react-native-render-html';

const FeedClassComponent = props => {
    const { colors, fonts } = useTheme()

    return (
        <Card style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: 15,
            marginTop: 15,
            marginBottom: 15,
            marginLeft: 18,
            elevation: 3,
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
            width: 350,
            paddingHorizontal: 15,
            paddingVertical: 10
        }}>
            <View style={{
                flexDirection: 'column'
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                        <Image 
                            style={{
                                width: 40,
                                height: 40,
                                borderRadius: 50,
                                borderColor: colors.bgWhite,
                            }}
                            source={{ uri: props.data.picture }}   
                        />
                    </View>
                    <View style={{
                        paddingLeft: 15,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Text style={{textAlign: 'center'}} fontWeight={fonts.semiBold} size={16} color={colors.textWhite}>{`${props.data.name}`}</Text>
                        <Text style={{textAlign: 'center'}} fontWeight={fonts.medium} size={12} color={colors.textWhite}>{`${props.data.status} - ${moment(props.data.createdTime).startOf('day').fromNow()}`}</Text>
                    </View>
                </View>
                <HTML html={props.data.post} baseFontStyle={{color: colors.textWhite, ...fonts.regular}} />
            </View>
        </Card>
    )
}

export default FeedClassComponent;