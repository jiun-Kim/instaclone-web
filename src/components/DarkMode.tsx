import { useReactiveVar } from "@apollo/client";
import {darkModeVar, disableDarkMode, enableDarkMode} from "../apollo"
import styled from "styled-components"

const Container = styled.footer`
    display:flex;
    justify-content:center;
`;
const ToggleBox = styled.button`
    border:none;
    border-bottom:1px solid ${props=>props.theme.borderColor};
    background-color:${props=>props.theme.bgColor};
    &:focus{
        outline:none;
    }
`;
const Text = styled.span`
    color:${props=>props.theme.fontColor};
`;

const DarkModeComponent:React.FunctionComponent = () =>{
    const darkMode = useReactiveVar(darkModeVar)
    return (
        <Container>
          <ToggleBox onClick={darkMode ? disableDarkMode : enableDarkMode}>
               <Text>{darkMode ? "Light Mode": "Dark Mode"}</Text>
          </ToggleBox>
        </Container>
    )
}

export default DarkModeComponent