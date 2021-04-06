import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./screens/Home";
import LogIn from "./screens/Login";
import SignUp from "./screens/SignUp";
import GlobalStyle, { darkTheme, lightTheme } from "./styles";
import { client, darkModeVar, isLoggedInVar } from "./apollo";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/Layout";
import Profile from "./screens/Profile";

const App: React.FunctionComponent = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
          <Router>
            <GlobalStyle />
            <Switch>
              <Route path="/" exact>
                {isLoggedIn ? (
                  <Layout>
                    <Home />
                  </Layout>
                ) : (
                  <LogIn />
                )}
              </Route>
              <Route path="/users/:username">
                <Profile />
              </Route>
              {!isLoggedIn ? (
                <Route path="/sign-up">
                  <SignUp />
                </Route>
              ) : null}
            </Switch>
          </Router>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
};

export default App;
