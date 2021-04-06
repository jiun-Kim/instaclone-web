import React from "react";
import styled from "styled-components";

const Container = styled.div<{ lg: boolean }>`
  width: ${(props) => (props.lg ? "30px" : "23px")};
  height: ${(props) => (props.lg ? "30px" : "23px")};
  border-radius: 50%;
  background-color: black;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

const Avatar: React.FunctionComponent<{ url: any; lg: boolean }> = ({
  url = "",
  lg = false,
}) => {
  return <Container lg={lg}>{url !== "" ? <Img src={url} /> : null}</Container>;
};

export default Avatar;
