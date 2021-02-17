import React, { useContext, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import LoginPage from './pages/Login';
import ProtectedRoute from 'service/ProtectedRoute';
import LoginRoute from 'service/LoginRoute';
import CreateRooms, { NotificationWrappedHome } from 'pages/CreateRooms';
import GuestNameProvider, {
  GuestNameContext,
} from './service/GuestNameContext';
import UserContextProvider, { UserContext } from 'service/UserContext';
import axios, { AxiosResponse } from 'axios';
import { GuestNameContextTypes, OauthResponse, UserContextTypes } from 'types';
import { CONST_ROOM } from 'config';
import { v1 as uuid } from 'uuid';

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
  console.log(user);
  useEffect(() => {
    async function isAuthenticatedWrapper() {
      const { isLoggedIn, data } = await isAuthenticated(name);
      saveUserInfo(data, isLoggedIn);
    }
    isAuthenticatedWrapper();
  }, []);

  const room_id = user?.cookies ? uuid() : CONST_ROOM;
  return (
    <div style={{ height: 'auto' }}>
      <Router>
        <Switch>
          {/* <LoginRoute exact path="/login" component={LoginPage} user={user} /> */}
          <Route exact path="/" component={LoginPage} />
          <ProtectedRoute
            user={user}
            exact
            path="/room/:id"
            component={NotificationWrappedHome}
          />
          {/* {user && user.isLoggedIn ? (
          
          ) : (
            <Redirect from="/" to={'/login'} />
          )} */}
        </Switch>
        {/* <Redirect from="/" to={`/room/${room_id}`} /> */}
        {/* <Redirect from="/" to={`/login`} /> */}
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
