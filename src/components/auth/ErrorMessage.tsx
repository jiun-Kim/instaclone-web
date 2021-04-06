import React from "react";
import styled from "styled-components"

const SErrorMessage = styled.span`
    font-size:12px;
    font-weight:600;
    color:tomato;
    margin:5px 0;
`;

const ErrorMessage:React.FunctionComponent<{message?:string}> = ({message}) => {
    return message ? <SErrorMessage>{message}</SErrorMessage> : null
};

export default ErrorMessage