import React, { Fragment } from 'react';
import { Text, View } from 'react-native';
import { TextInput, HelperText, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../constants/colors';

const Texts = props => {
    return (
        <Text 
            onPress={props.onPress}
            style={
                { 
                    fontFamily: 'Raleway-Regular',
                    fontSize: props.size ? props.size : 15,
                    color: props.color ? props.color : colors.light,
                    ...props.style
                }
            }
        >
            {props.text}
        </Text>
    );
}

const Input = props => {
    const hasErrors = () => {
        return !text.includes('@');
    };

    return (
        
            <TextInput
                {...props}
                mode="flat"
                selectionColor={colors.light}
                underlineColor={colors.light}
                left={
                    <TextInput.Icon 
                        {...props.Icon}
                        name={props.IconName}
                        color={colors.light} 
                        size={20}
                    />
                }
                style={{
                    backgroundColor: 'transparent',
                    fontSize: 15,
                    ...props.style
                }}
                theme={{ 
                    colors: { 
                    text: colors.white,
                    placeholder: colors.light,
                    error: 'red',
                    primary: colors.light
                    } 
                }}
            />
    );
}

const Btn = props => {
    return (
        <Button 
            onPress={props.onPress}
            style={{ borderRadius: 20, ...props.style }}
            color={colors.white} 
            mode={props.mode ? props.mode : 'contained'}
            contentStyle={props.contentStyle}
        >
            { props.Icon && <Icon {...props.Icon} /> }
            <View style={{ width: props.space ? props.space : 5 }} />
            <Texts 
                style={{
                    fontWeight: "bold", 
                    color: colors.primary,
                    ...props.style
                }}
                text={props.title}
            />
        </Button>
    )
}

export { Texts, Input, Btn };