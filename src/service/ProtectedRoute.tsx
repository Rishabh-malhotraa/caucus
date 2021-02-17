import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UserContext } from 'service/UserContext';
import { UserContextTypes, UserInfo } from 'types';

interface ProtectedRouteProps extends RouteProps {
  user?: UserInfo;
  component: React.FC;
}

const ProtectedRoute = (props: ProtectedRouteProps) => {
  const { user } = props;
  console.log(user);
  console.log(props);
  return user?.isLoggedIn ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/" />
  );
};
export default ProtectedRoute;
