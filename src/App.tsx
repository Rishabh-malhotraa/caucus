import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/Login';

const App = () => {
  return (
    <div style={{ height: 'auto' }}>
      <Router>
        <Route exact path="/" component={LoginPage} />
        <Route exact path="/dashboard" component={Home} />
      </Router>
    </div>
  );
};
export default App;
