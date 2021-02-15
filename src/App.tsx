import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import { SnackbarProvider } from 'notistack';

const NotificationHome = () => {
  return (
    <SnackbarProvider>
      <Home />
    </SnackbarProvider>
  );
};

const App = () => {
  return (
    <div style={{ height: 'auto' }}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={NotificationHome} />
      </Router>
    </div>
  );
};
export default App;
