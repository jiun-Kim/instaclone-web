import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import routes from "../routes";
import Avatar from "./Avatar";
import useUser from "./hooks/useUser";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.bgColor};
`;
const Wrapper = styled.div`
  max-width: 1000px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Column = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.div`
  margin-left: 15px;
`;
const Button = styled.button`
  background-color: ${(props) => props.theme.accent};
  border: none;
  border-radius: 3px;
  padding: 7px 15px;
  color: white;
  font-weight: 600;
  &:focus {
    outline: none;
  }
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  return (
    <Container>
      <Wrapper>
        <Column>
          <FontAwesomeIcon icon={faInstagram} size="2x" />
        </Column>
        <Column>
          {isLoggedIn ? (
            <IconsContainer>
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} size="lg" />
                </Link>
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} size="lg" />
              </Icon>
              <Icon>
                {data?.me?.avatar ? (
                  <Link to={`/users/${data?.me?.username}`}>
                    <Avatar url={data?.me?.avatar} lg={false} />
                  </Link>
                ) : (
                  <FontAwesomeIcon icon={faUser} size="lg" />
                )}
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Column>
      </Wrapper>
    </Container>
  );
};

export default Header;
