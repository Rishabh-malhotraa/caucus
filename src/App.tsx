import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import ProtectedRoute from "service/ProtectedRoute";
import LoginRoute from "service/LoginRoute";
import Dashboard from "pages/Room/Room";
import Loader from "pages/Loader/Loader";
import NavigateRoom from "pages/NavigateRooms/NavigateRooms";
import GuestNameProvider from "./service/GuestNameContext";
import SettingsProvider from "./service/SettingsContext";
import TabsProvider from "./service/TabsContext";
import UserContextProvider, { UserContext } from "service/UserContext";
import axios, { AxiosResponse } from "axios";
import { OauthResponse, UserContextTypes } from "types";
import { SERVER_URL } from "config";
import { SnackbarProvider } from "notistack";

export const isAuthenticated = async () => {
  const { data }: AxiosResponse<OauthResponse> = await axios({
    method: "GET",
    url: `${SERVER_URL}/api/auth`,
    responseType: "json",
    withCredentials: true,
  });
  return {
    isLoggedIn: data.isLoggedIn,
    data,
  };
};

const App = () => {
  const { user, saveUserInfo } = useContext(UserContext) as UserContextTypes;
  useEffect(() => {
    async function isAuthenticatedWrapper() {
      const { isLoggedIn, data } = await isAuthenticated();

      localStorage.setItem("isLoggedIn", JSON.stringify(data.isLoggedIn));
      saveUserInfo(data, isLoggedIn);
      if (isLoggedIn === false) {
        return <Redirect to="/"></Redirect>;
      }
    }
    isAuthenticatedWrapper();
  }, []);

  return (
    <div style={{ height: "auto" }}>
      <Router>
        <Switch>
          <Route path="/loader" component={Loader} />
          <Route path="/room/:id" component={Dashboard} />
          <ProtectedRoute exact user={user} path="/home" NavigationRoom={NavigateRoom} />
          <LoginRoute exact path="/" component={LoginPage} user={user} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};

const contextWrappedApp = () => {
  return (
    <UserContextProvider>
      <GuestNameProvider>
        <SettingsProvider>
          <SnackbarProvider>
            <TabsProvider>
              <App />
            </TabsProvider>
          </SnackbarProvider>
        </SettingsProvider>
      </GuestNameProvider>
    </UserContextProvider>
  );
};

export default contextWrappedApp;
