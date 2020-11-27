import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { configureFonts, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import colors from './colors'

const fontConfig = {
    default: {
        regular: {
            fontFamily: 'Poppins-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Poppins-Medium',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Poppins-light',
            fontWeight: 'normal',
        },
        italic: {
            fontFamily: 'Poppins-Italic',
            fontWeight: 'normal'
        },
        thin: {
            fontFamily: 'Poppins-Thin',
            fontWeight: 'normal',
        },
        semiBold: {
            fontFamily: 'Poppins-SemiBold',
            fontWeight: 'normal',
        },
        semiBoldItalic: {
            fontFamily: 'Poppins-SemiBoldItalic',
            fontWeight: 'normal',
        },
        bold: {
            fontFamily: 'Poppins-Bold',
            fontWeight: 'normal',
        },
    },
    nunito: {
        regular: {
            fontFamily: 'Nunito-Regular',
            fontWeight: 'normal',
        },
        medium: {
            fontFamily: 'Nunito-Medium',
            fontWeight: 'normal',
        },
        mediumItalic: {
            fontFamily: 'Nunito-MediumItalic',
            fontWeight: 'normal',
        },
        light: {
            fontFamily: 'Nunito-light',
            fontWeight: 'normal',
        },
        italic: {
            fontFamily: 'Nunito-Italic',
            fontWeight: 'normal'
        },
        thin: {
            fontFamily: 'Nunito-thin',
            fontWeight: 'normal',
        },
        semiBold: {
            fontFamily: 'Nunito-semiBold',
            fontWeight: 'normal',
        },
        bold: {
            fontFamily: 'Nunito-Bold',
            fontWeight: 'normal',
        },
        boldItalic: {
            fontFamily: 'Poppins-BoldItalic',
            fontWeight: 'normal',
        },
    },
};

fontConfig.ios = fontConfig.default;
fontConfig.android = fontConfig.default;

export const CombinedDefaultTheme = {
    ...PaperDefaultTheme,
    ...NavigationDefaultTheme,
    colors: {
        utama: '#0090FF',
        kedua: '#68E1FD',
        acc: '#F88585',
        
        bgLight: '#9FD5FF',
        bg: '#00CFFF',

        //rgb(1,171,233)
        // bgPrimary: '#F88585',
        // bgSecondary: '#F88585',
        // bgAccent: '#FFBBAB',
        bgPrimary: '#00CFFF',
        bgSecondary: '#84C2FD',
        // bgSecondary: 'rgb(1,171,233)',
        bgAccent: '#ABDBFF',
        bgWhite: '#FFFFFF',
        bgLight: '#f2feff',
        bgDark: '#473F47',
        textWhite: '#FFFFFF',
        textPrimary: '#FC682D',
        textSecondary: '#F88585',
        textDark: '#473F47',
        textLight: '#9FD5FF',
        textLightAccent: '#C9E7FF',
        textAccent: '#0090FF',
        textBgPrimary: '',
        textLink: '#F88585',

        primary: colors.tosca,
        secondary: colors.blue,
        accent: colors.darkPink,
        background: colors.white,
        card: colors.white,
        text: colors.darkBlue2,
        textLight: colors.white,
        textDark: PaperDefaultTheme.colors.backdrop,
        border: NavigationDefaultTheme.colors.darkBlue2,
        notification: NavigationDefaultTheme.colors.notification,
        surface: PaperDefaultTheme.colors.surface,
        disabled: PaperDefaultTheme.colors.disabled,
        placeholder: PaperDefaultTheme.colors.placeholder,
        backdrop : PaperDefaultTheme.colors.backdrop,
        loadingBackground: '#d5f1f7',
        dark: colors.dark,
        light: colors.light,
        darkBlue: colors.darkBlue,
        white: colors.white,
        lightBlue: colors.lightBlue,
        purple: colors.purple,
        cyan: colors.cyan,
        darkOrange: colors.darkOrange,
        header: colors.blue
    },
    fonts: configureFonts(fontConfig)
};

export const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
        secondary: colors.lightBlue,
        textDark: colors.white,
        cyan: colors.cyan,
        white: colors.white,
        light: colors.light,
        lightBlue: colors.lightBlue,
    },
    fonts: configureFonts(fontConfig),
};