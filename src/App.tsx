import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import ProtectedRoute from 'service/ProtectedRoute';
import LoginRoute from 'service/LoginRoute';
import Dashboard from 'pages/Room/Room';
import NavigateRoom from 'pages/NavigateRooms/NavigateRooms';
import GuestNameProvider, {
  GuestNameContext,
} from './service/GuestNameContext';
import UserContextProvider, { UserContext } from 'service/UserContext';
import axios, { AxiosResponse } from 'axios';
import { GuestNameContextTypes, OauthResponse, UserContextTypes } from 'types';
// import { v1 as uuid } from 'uuid';
import Loader from 'pages/Loader/Loader';

export const isAuthenticated = async (name: string) => {
  const { data }: AxiosResponse<OauthResponse> = await axios({
    method: 'GET',
    url: '/api/auth',
    responseType: 'json',
    withCredentials: true,
  });
  // if you have logged in as a guest or you have signed in
  return {
    isLoggedIn: data.isLoggedIn || name ? true : false,
    data,
  };
};

const App = () => {
  const { name } = useContext(GuestNameContext) as GuestNameContextTypes;
  const { user, saveUserInfo } = useContext(UserContext) as UserContextTypes;
  useEffect(() => {
    async function isAuthenticatedWrapper() {
      const { isLoggedIn, data } = await isAuthenticated(name);
      localStorage.setItem('isLoggedIn', JSON.stringify(data.isLoggedIn));
      saveUserInfo(data, isLoggedIn);
      if (!isLoggedIn) {
        return <Redirect to="/"></Redirect>;
      }
    }
    isAuthenticatedWrapper();
  }, []);

  return (
    <div style={{ height: 'auto' }}>
      <Router>
        <Switch>
          <Route path="/room/:id" component={Dashboard} />
          <ProtectedRoute
            user={user}
            path="/home"
            NavigationRoom={NavigateRoom}
          />
          <LoginRoute exact path="/" component={LoginPage} user={user} />
          <Route exact path="/loader" component={Loader} />
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
        <App />
      </GuestNameProvider>
    </UserContextProvider>
  );
};

export default contextWrappedApp;
