import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookSquare,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import routes from "../routes";
import CContainer from "../components/auth/Container";
import FormBox from "../components/auth/FormBox";
import CInput from "../components/auth/Input";
import CButton from "../components/auth/Button";
import CBottomBox from "../components/auth/ButtomBox";
import { HelmetTitle, Notificate } from "../components/shared";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import ErrorMessage from "../components/auth/ErrorMessage";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { login, loginVariables } from "../__generated__/login";

const Separator = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0;
  color: rgb(124, 124, 124);
  align-items: center;
  text-transform: uppercase;
  div {
    width: 100%;
    height: 1px;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0 10px;
    font-weight: 600;
    font-size: 12px;
  }
`;

const FaceBookLogIn = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  color: #385184;
  font-weight: 600;
  a {
    color: #385184;
    margin-left: 10px;
  }
`;

interface IForm {
  username: string;
  password: string;
  loginError: string;
}
interface ILocation {
  message?: string;
  username?: string;
  password?: string;
}

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;
const LogIn = () => {
  const location = useLocation<ILocation>();
  const {
    register,
    errors,
    handleSubmit,
    getValues,
    formState,
    setError,
    clearErrors,
  } = useForm<IForm>({
    mode: "onChange",
    defaultValues: {
      username: location?.state?.username || "",
      password: location?.state?.password || "",
    },
  });
  const onCompleted = (data: any) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("loginError", { message: error });
    }
    if (token) {
      logUserIn(token);
    }
  };
  const [login, { loading }] = useMutation<login, loginVariables>(
    LOGIN_MUTATION,
    { onCompleted }
  );

  const onValid = () => {
    const { username, password } = getValues();
    login({
      variables: {
        username,
        password,
      },
    });
  };
  const clearError = () => {
    clearErrors("loginError");
  };
  return (
    <CContainer>
      <HelmetTitle title="LogIn" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
        </div>
        <Notificate message={location?.state?.message} />
        <form onSubmit={handleSubmit(onValid)}>
          <CInput
            onChange={clearError}
            ref={register({
              required: "Username is required!",
              minLength: {
                value: 5,
                message: "Usersname should be longer than 5 chars.",
              },
            })}
            name="username"
            type="text"
            placeholder="Phone number, username, or email"
            hasError={Boolean(errors.username?.message)}
          />
          <ErrorMessage message={errors.username?.message} />
          <CInput
            onChange={clearError}
            ref={register({ required: "Password is required!" })}
            name="password"
            type="password"
            placeholder="Password"
            hasError={Boolean(errors.password?.message)}
          />
          <ErrorMessage message={errors.password?.message} />
          <CButton
            type="submit"
            value={loading ? "Loading..." : "Log in"}
            disabled={!formState.isValid || loading}
          />
          <ErrorMessage message={errors.loginError?.message} />
        </form>
        <Separator>
          <div></div>
          <span>or</span>
          <div></div>
        </Separator>
        <FaceBookLogIn>
          <FontAwesomeIcon icon={faFacebookSquare}></FontAwesomeIcon>
          <Link to="#">Log in with Facebook</Link>
        </FaceBookLogIn>
      </FormBox>
      <CBottomBox
        cta="Don't have an account?"
        link={routes.signUp}
        linkText="Sign up"
      />
    </CContainer>
  );
};

export default LogIn;
