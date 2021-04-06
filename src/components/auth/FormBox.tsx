import React from "react"
import styled from "styled-components";
import { BaseBox } from "../shared";

const TopBox = styled(BaseBox)`
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
        padding: 35px 40px 25px 40px;
    form{
        width:100%;
        margin-top:25px;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
    }
`;

const FormBox:React.FunctionComponent = ({children}) =>{
    return (
        <TopBox>{children}</TopBox>
    )
}

export default FormBox