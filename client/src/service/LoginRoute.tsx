import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { UserInfoType } from "types";
interface LoginRouteProps extends RouteProps {
  component: React.FC;
  user?: UserInfoType;
}

const LoginRoute = (props: LoginRouteProps) => {
  const retriveKey = localStorage.getItem("isLoggedIn");
  const storageKey = retriveKey ? JSON.parse(retriveKey) : false;

  if (props.user?.isLoggedIn || storageKey === true) {
    return <Redirect to={`/home`} />;
  } else {
    return <Route path={props.path} exact={props.exact} component={props.component} />;
  }
};
export default LoginRoute;
