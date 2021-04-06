import { gql, useMutation } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import styled from "styled-components";
import CBottomBox from "../components/auth/ButtomBox";
import CButton from "../components/auth/Button";
import CContainer from "../components/auth/Container";
import ErrorMessage from "../components/auth/ErrorMessage";
import FormBox from "../components/auth/FormBox";
import CInput from "../components/auth/Input";
import { HelmetTitle } from "../components/shared";
import routes from "../routes";
import {
  createAccount,
  createAccountVariables,
} from "../__generated__/createAccount";

const SubTitle = styled.span`
  font-weight: 600;
  color: rgb(142, 142, 142);
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
`;

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $firstName: String!
    $lastName: String
    $username: String!
    $email: String!
    $password: String!
  ) {
    createAccount(
      firstName: $firstName
      lastName: $lastName
      username: $username
      email: $email
      password: $password
    ) {
      ok
      error
    }
  }
`;

interface IForm {
  firstName: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  signError: string;
}

const SignUp = () => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    errors,
    formState,
  } = useForm<IForm>({
    mode: "onChange",
  });
  const history = useHistory();

  const onCompleted = (data: any) => {
    const { username, password } = getValues();
    const {
      createAccount: { ok, error },
    } = data;
    if (!ok) {
      return setError("signError", { message: error });
    }
    history.push(routes.home, {
      message: "Account created. Please log In",
      username,
      password,
    });
  };
  const [createAccount, { loading }] = useMutation<
    createAccount,
    createAccountVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onValid = () => {
    const { firstName, lastName, username, email, password } = getValues();
    createAccount({
      variables: {
        firstName,
        lastName,
        username,
        email,
        password,
      },
    });
  };
  return (
    <CContainer>
      <HelmetTitle title="Sign up" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <SubTitle>Sign up to see photos and videos from your friends.</SubTitle>
        <form onSubmit={handleSubmit(onValid)}>
          <CInput
            ref={register({
              required: "First name is required!",
            })}
            name="firstName"
            type="text"
            placeholder="First name"
          />
          <ErrorMessage message={errors.firstName?.message} />
          <CInput
            ref={register}
            name="lastName"
            type="text"
            placeholder="Last name"
          />
          <CInput
            ref={register({
              required: "Username is required!",
              minLength: {
                value: 5,
                message: "Username should be longer than 5 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Username"
          />
          <ErrorMessage message={errors.username?.message} />
          <CInput
            ref={register({
              required: "Email is required!",
            })}
            name="email"
            type="email"
            placeholder="Email"
          />
          <ErrorMessage message={errors.email?.message} />
          <CInput
            ref={register({
              required: "Password is required!",
            })}
            name="password"
            type="password"
            placeholder="Password"
          />
          <ErrorMessage message={errors.password?.message} />
          <CButton
            type="submit"
            value={loading ? "Loading..." : "Sign up"}
            disabled={!formState.isValid || loading}
          />
        </form>
      </FormBox>
      <CBottomBox cta="Have an account?" link={routes.home} linkText="Log in" />
    </CContainer>
  );
};
export default SignUp;
