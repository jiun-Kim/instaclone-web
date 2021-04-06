import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

const BottomBox =styled(BaseBox)`
    margin-top:10px;
    padding:22px 10px;
    text-align:center;
    a{
        margin-left:5px;
        font-weight:600;
        color:${props=>props.theme.accent};
    }
`;

interface IBottomBox {
    cta:string,
    link:any,
    linkText:string
}

const CBottomBox:React.FunctionComponent<IBottomBox> = ({cta, link, linkText}) => {
    return(
        <BottomBox>
            <span>{cta}</span>
            <Link to={link}>{linkText}</Link>
        </BottomBox>
    )
}

export default CBottomBox