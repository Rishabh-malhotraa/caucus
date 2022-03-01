import React from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { UserInfoType } from "types";

interface ProtectedRouteProps extends RouteProps {
  user?: UserInfoType;
  NavigationRoom: React.FC;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ user, NavigationRoom, ...rest }) => {
  const retriveKey = localStorage.getItem("isLoggedIn");
  const storageKey = retriveKey ? JSON.parse(retriveKey) : false;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user?.isLoggedIn === true || storageKey === true) {
          return <NavigationRoom />;
        } else {
          return <Redirect to={{ pathname: "/", state: { from: props.location } }} />;
        }
      }}
    />
  );
};
export default ProtectedRoute;
