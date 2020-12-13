import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native';
import { configureFonts, DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';
import colorName from './colors'

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
        ...NavigationDefaultTheme.colors,
        ...PaperDefaultTheme.colors,
        utama: '#0090FF',
        kedua: '#68E1FD',
        acc: '#F88585',
        
        bgLight: '#9FD5FF',
        bg: '#00CFFF',

        // Warna 1
        // bgPrimary: '#F88585',
        // bgSecondary: '#F88585',
        // bgAccent: '#FFBBAB',

        // Warna 2
        // bgPrimary: '#F88585',
        // bgSecondary: '#F88585',
        // bgAccent: '#FFBBAB',
        
        // Warna 3
        // bgPrimary: '#00CFFF',
        // bgSecondary: '#A3E3FF',
        // bgAccent: '#E7F8FF',

        primary: '#40C3FD',
        accent: '#FF7676',
        background: '#E7F8FF',
        text: '#7A8590',
        loadingBackground: '#d5f1f7',

        red: '#FF7676', //'rgb(255,118,118)'
        softRed: 'F88585',
        green: '#53E69D',
        deepGreen: '#3BC5A6',
        darkGreen: '#32a852',
        grey: '#7A8590',//'rgb(122,133,144)'
        greyLight: '#B5C1D6',
        greyDeepLight: '#D4D7DD',
        cyan: '#70C5DB',
        purple2: '#76B1FF',
        purple: '#97BBEA',
        yellow: '#FFC076',
        orange: '#FF8962',
        orange2: '#FF976B',
        deepOrange: '#E6794B',
        skinny: '#F5DFD4',
        skinny2: '#FFF2E7',
        pink: colorName.darkPink,

        // Warna 3
        bgPrimary: '#00CFFF',
        bgSecondary: '#84C2FD',
        bgAccent: '#ABDBFF',

        bgWhite: '#FFFFFF',
        bgLight: '#f2feff',
        bgDark: '#473F47',
        bgDarkBlue: '#5588F5',
        bgLock: '#F88585',
        bgCardPrimary: '#F88585',
        bgCardSecondary: '#FFBBAB',
        bgDarkBlue: colorName.tosca,

        navMapelPrimary: '#FF8962',
        navMapelBg: '#FEFAF7',
        navMapelBorder: '#FF8962',
        // navMapelPrimary: '#32a852',

        textWhite: '#FFFFFF',
        textPrimary: '#FC682D',
        textSecondary: '#F88585',
        textDark: '#473F47',
        textLight: '#9FD5FF',
        textLightAccent: '#C9E7FF',
        textAccent: '#0090FF',
        textBgPrimary: '',
        textLink: '#F88585',
        textBlue: '#00CFFF',
        textBlueDark: colorName.blue,
        textGrey: '#7A8590',
        textGreyLight: '#B5C1D6',
    },
    fonts: configureFonts(fontConfig)
};

export const CombinedDarkTheme = {
    ...PaperDarkTheme,
    ...NavigationDarkTheme,
    colors: {
        ...PaperDarkTheme.colors,
        ...NavigationDarkTheme.colors,
    },
    fonts: configureFonts(fontConfig),
};