import React from "react"
import styled from "styled-components";

const Button = styled.input`
    width:100%;
    margin-top:14px;
    padding:10px 7px;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:${props=>props.theme.accent};
    color:${props=>props.theme.buttonColor};
    border-radius:3px;
    box-sizing:border-box;
    opacity:${props=>props.disabled ? "0.4" : "1"};
`;

interface ISubmitProps{
    type:string,
    value:string
    disabled?:boolean
}

const CButton:React.FunctionComponent<ISubmitProps> = (props) =>{
    return (
        <Button {...props}/>
    )
}

export default CButton