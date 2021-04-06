import React from "react";
import styled from "styled-components";

const Input = styled.input<IInputProps>`
  width: 100%;
  margin-top: 7px;
  background-color: #fafafa;
  color: ${(props) => props.theme.formColor};
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  border-radius: 3px;
  box-sizing: border-box;
  font-size: 12px;
  padding: 10px 7px;
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

interface IInputProps {
  type: string;
  placeholder: string;
  value?: string;
  name?: string;
  hasError?: boolean;
  ref?:
    | ((instance: HTMLInputElement | null) => void)
    | React.RefObject<HTMLInputElement>
    | null
    | undefined;
  onChange?: () => void;
}

const CInput: React.FunctionComponent<IInputProps> = React.forwardRef(
  (props, ref) => {
    return props && ref ? <Input ref={ref} {...props} /> : null;
  }
);

export default CInput;
