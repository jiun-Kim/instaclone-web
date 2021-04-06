import React from "react";
import styled from "styled-components";
import Header from "./Header"

const Content = styled.main`
    margin:0 auto;
    margin-top:45px;
    max-width:1000px;
    width:100%; 
`;

const Layout:React.FunctionComponent = ({children}) =>{
    return (
        <>
            <Header />
            <Content>{children}</Content>
        </>
    )
}

export default Layout