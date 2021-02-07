import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import LoginPage from './pages/Login';
import socketClient from 'socket.io-client';

const server = 'http://localhost:5000';

const App = () => {
  const socket = socketClient(server);
  console.log(socket);
  socket.on('connection', () => {
    console.log(`I'm Connected with the backend`);
  });
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
