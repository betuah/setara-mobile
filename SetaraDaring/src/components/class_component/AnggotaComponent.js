import React from 'react';
import { View, Image } from 'react-native';
import { Text } from '../common/UtilsComponent';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Card, useTheme } from 'react-native-paper';

const AnggotaComponent = props => {
    const { colors, fonts } = useTheme()

    // console.log(props)

    return (
        <TouchableWithoutFeedback>
            <Card style={{
                elevation: 0,
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0,
                shadowRadius: 0,
                borderRadius: 10,
                marginHorizontal: 5,
                marginBottom: 15,
                width: 240,
                backgroundColor: colors.bgSecondary,
                padding: 13,
            }}>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                    }}>
                        <Image 
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 50,
                                borderColor: colors.bgWhite,
                            }}
                            source={{ uri: props.data.picture }}   
                        />
                    </View>
                    <View style={{
                        flex: 3,
                        paddingLeft: 5,
                        alignItems: 'flex-start',
                        justifyContent: 'center',
                    }}>
                        <Text style={{textAlign: 'justify'}} fontWeight={fonts.semiBold} size={14} color={colors.textWhite}>{`${props.data.name.length > 18 ? `${props.data.name.slice(0, 15)}...` : props.data.name}`}</Text>
                        <Text style={{textAlign: 'justify'}} fontWeight={fonts.regular} size={11} color={colors.textWhite}>{`${props.data.school.length > 18 ? `${props.data.school.slice(0, 23)}...` : props.data.school}`}</Text>
                    </View>
                </View>
            </Card>
        </TouchableWithoutFeedback>
    )
}

export default AnggotaComponent;