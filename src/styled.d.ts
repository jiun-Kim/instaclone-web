import 'styled-components';

declare module 'styled-components' {
    export interface DefaultTheme {
        borderColor: string
        accent: string
        bgColor: string
        fontColor: string
        buttonColor: string
        formColor: string
    }
}