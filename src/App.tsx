import React, { useContext, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import ProtectedRoute from "service/ProtectedRoute";
import LoginRoute from "service/LoginRoute";
import GuestNameProvider from "./service/GuestNameContext";
import SettingsProvider from "./service/SettingsContext";
import CodeExecutionInfoProvider from "./service/CodeExecutionInfo";
import TabsProvider from "./service/TabsContext";
import UserContextProvider, { UserContext } from "service/UserContext";
import RoomIDProvider from "service/RoomIdContext";
import axios, { AxiosResponse } from "axios";
import { OauthResponse, UserContextTypes } from "types";
import { SERVER_URL } from "config.keys";
import { SnackbarProvider } from "notistack";
import Loader from "pages/LoadingAnimation/Loader";
import StartupAnimation from "pages/LoadingAnimation/StartupAnimation";

const Dashboard = lazy(() => import("./pages/Room/Room"));
const NavigateRoom = lazy(() => import("./pages/NavigateRooms/NavigateRooms"));
const LoginPage = lazy(() => import("./pages/Login/Login"));

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
      localStorage.setItem("name", JSON.stringify(data.user?.name));
      localStorage.setItem("image_link", JSON.stringify(data.user?.image_link));
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
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route path="/room/:id" component={Dashboard} />
            <ProtectedRoute exact user={user} path="/home" NavigationRoom={NavigateRoom} />
            <LoginRoute exact path="/" component={LoginPage} user={user} />
            <Route path="/startup-animation" component={StartupAnimation} />
            <Route path="/loader" component={Loader} />
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
};

const contextWrappedApp = () => {
  return (
    <UserContextProvider>
      <GuestNameProvider>
        <SettingsProvider>
          <RoomIDProvider>
            <SnackbarProvider>
              <TabsProvider>
                <CodeExecutionInfoProvider>
                  <App />
                </CodeExecutionInfoProvider>
              </TabsProvider>
            </SnackbarProvider>
          </RoomIDProvider>
        </SettingsProvider>
      </GuestNameProvider>
    </UserContextProvider>
  );
};

export default contextWrappedApp;
