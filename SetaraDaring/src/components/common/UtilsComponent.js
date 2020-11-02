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
                    fontWeight: props.fontWeight ? props.fontWeight : "normal",
                    fontFamily: props.fontFamily ? props.fontFamily : 'Raleway-Regular',
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
    return (
        <Fragment>
            <TextInput
                {...props}
                value={props.value}
                onChange={props.onChange}
                mode="flat"
                keyboardType={props.keyboardType}
                selectionColor={colors.light}
                underlineColor={colors.light}
                left={
                    <TextInput.Icon 
                        {...props.Icon}
                        name={props.IconName}
                        color={props.IconColor ? props.IconColor : colors.light} 
                        size={props.IconSize ? props.IconSize : 20}
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
                        error: colors.light,
                        primary: colors.light
                    } 
                }}
            />
            {
                props.errorVisible 
                &&
                <HelperText style={props.errorStyle} type="error" visible={props.errorVisible}>
                    {props.errorMassage}
                </HelperText> 
            }
            
        </Fragment>
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
            disabled={props.disabled ? true : false}
            animated={true}
            loading={props.isLoading}
        >
            { props.isLoading ? 
                    <Fragment>
                        <View style={{ width: props.space ? props.space : 5 }} />
                        <Texts 
                            style={{
                                fontWeight: "bold", 
                                color: colors.primary,
                                ...props.style
                            }}
                            text={'LOADING . . .'}
                        />
                    </Fragment>
                : 
                    <Fragment>
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
                    </Fragment>
            }
        </Button>
    )
}

export { Texts, Input, Btn };