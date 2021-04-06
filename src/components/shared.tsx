import React from "react";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

export const BaseBox = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
  width: 100%;
`;

export const HelmetTitle: React.FunctionComponent<{ title: string }> = ({
  title,
}) => {
  return (
    <Helmet>
      <title>{title} | Instaclone</title>
    </Helmet>
  );
};

interface INotify {
  message?: string;
}
const NotifiText = styled.div<INotify>`
  color: #2ecc71;
  margin-top: 20px;
`;

export const Notificate: React.FunctionComponent<INotify> = ({ message }) => {
  return message === "" ? null : <NotifiText>{message}</NotifiText>;
};

export const FatText = styled.span`
  font-weight: 600;
`;
