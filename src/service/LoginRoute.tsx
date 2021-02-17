import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { UserInfo } from 'types';
import { v1 as uuid } from 'uuid';

interface LoginRouteProps extends RouteProps {
  component: React.FC;
  user?: UserInfo;
}

const id = uuid();
const LoginRoute = (props: LoginRouteProps) => {
  console.log(JSON.stringify(props));

  if (props.user && props.user.isLoggedIn) {
    console.log('inside rooms render');
    return <Redirect to={`/room/${id}`} />;
  } else {
    console.log('what da fuck');
    return (
      <Route
        path={props.path}
        exact={props.exact}
        component={props.component}
      />
    );
  }
};
export default LoginRoute;
