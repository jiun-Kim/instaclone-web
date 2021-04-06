import React from "react"
import styled from "styled-components";
import DarkModeComponent from "../DarkMode";

const Container = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
    height:100vh;
    width:100%;
`;

const Wrapper = styled.div`
    width:100%;
    max-width:350px;
`;

const CContainer:React.FunctionComponent = ({children}) =>{
    return (
        <Container>
            <Wrapper>
                {children}
                <DarkModeComponent />
            </Wrapper>
        </Container>
    )
}

export default CContainer   