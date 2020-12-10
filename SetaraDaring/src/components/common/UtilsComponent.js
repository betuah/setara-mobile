import React, { Fragment } from 'react';
import { Text as NativeText, View } from 'react-native';
import { TextInput, HelperText, Button, Text as PaperText } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonic from 'react-native-vector-icons/Ionicons';
import colors from '../../constants/colors';

const Text = props => {
    return (
        <PaperText
            theme={props.theme}
            onPress={props.onPress}
            style={{
                fontFamily: props.fontFamily,
                fontWeight: props.weight,
                fontSize: props.size ? props.size : 15,
                color: props.color ? props.color : colors.primary,
                ...props.fontWeight,
                ...props.style
            }}
        >
            {props.children}
        </PaperText>
    )
}

const Input = props => {
    return (
        <Fragment>
            <TextInput
                {...props}
                value={props.value}
                onChange={props.onChange}
                mode={props.mode ? props.mode : 'flat'}
                keyboardType={props.keyboardType}
                selectionColor={props.defaultStyle ? props.defaultStyle.selectionColor : colors.light}
                underlineColor={props.defaultStyle ? props.defaultStyle.underlineColor : colors.light}
                left={
                    props.IconName &&
                    <TextInput.Icon 
                        {...props.Icon}
                        name={props.IconName}
                        color={props.defaultStyle ? props.defaultStyle.IconColor : (props.IconColor ? props.IconColor : colors.light)} 
                        size={props.defaultStyle ? props.defaultStyle.IconSize : (props.IconSize ? props.IconSize : 20) }
                    />
                }
                style={{
                    backgroundColor: 'transparent',
                    fontSize: props.defaultStyle ? props.defaultStyle.fontSize : (props.fontSize ? props.fontSize : 12),
                    ...props.style
                }}
                theme={{
                    colors: { 
                        text: colors.white,
                        placeholder: colors.light,
                        error: colors.light,
                        primary: colors.light
                    },
                    ...props.theme,
                    ...props.defaultStyle && props.defaultStyle.theme
                }}
            />
            {
                props.errorVisible 
                &&
                <HelperText style={{...props.errorStyle, color: colors.white}} type="error" visible={props.errorVisible}>
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
            color={props.color ? props.color: colors.white} 
            mode={props.mode ? props.mode : 'contained'}
            contentStyle={props.contentStyle}
            disabled={props.disabled ? true : false}
            animated={true}
            loading={props.isLoading}
        >
            { props.isLoading ? 
                    <Fragment>
                        <View style={{ width: 8, height: 1 }} />
                        <Text 
                            weight='bold'
                            size={props.fontSize}
                            color={props.loadingColor ? props.loadingColor : colors.primary}
                            style={{
                                ...props.style
                            }}
                        >LOADING . . .</Text>
                    </Fragment>
                : 
                    <Fragment>
                        { props.Icon && (props.IconType === 'ionic' ? 
                            <Fragment>
                                <IconIonic name={props.IconName} size={props.IconSize} color={props.IconColor} {...props.Icon} />
                                <View style={{ width: 5, height: 1 }} />
                            </Fragment> 
                            : 
                            <Fragment>
                                <Icon name={props.IconName} size={props.IconSize} color={props.IconColor} {...props.Icon} />
                                <View style={{ width: 5, height: 1 }} />
                            </Fragment>
                            ) }
                        { props.title && 
                            <Text 
                                fontWeight={props.fontWeight}
                                weight={props.fontStyle ? props.fontStyle.weight : 'bold'}
                                color={props.fontStyle ? props.fontStyle.color : (props.fontColor ? props.fontColor : colors.primary)}
                                size={props.fontStyle ? props.fontStyle.size : props.fontSize}
                                style={{...props.fontStyle}}
                            >
                                {props.title}
                            </Text>
                        }
                    </Fragment>
            }
        </Button>
    )
}

export { Text, Input, Btn };