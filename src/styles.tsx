import { createGlobalStyle, DefaultTheme } from "styled-components";
import reset from "styled-reset";

export const lightTheme: DefaultTheme = {
  fontColor: "rgb(38, 38, 38)",
  buttonColor: "#FAFAFA",
  formColor: "black",
  bgColor: "#FAFAFA",
  accent: "#0095F6",
  borderColor: "rgb(219, 219, 219)",
};
export const darkTheme: DefaultTheme = {
  fontColor: "#FAFAFA",
  buttonColor: "#FAFAFA",
  formColor: "black",
  bgColor: "rgb(38, 38, 38)",
  accent: "#0095F6",
  borderColor: "rgb(219, 219, 219)",
};

const GlobalStyle = createGlobalStyle`
    ${reset}
    *{
       box-sizing:border-box;
    }
    body{
        background-color:${(props) => props.theme.bgColor};
        font-family: 'Open Sans', sans-serif;
        font-size:14px;
        color:${(props) => props.theme.fontColor}
    }
    input {
        all:unset;
    }
    a{
        text-decoration:none;
        color:inherit;
    }
`;

export default GlobalStyle;
