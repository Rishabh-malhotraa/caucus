import { BrowserRouter as Router, Route } from 'react-router-dom';
import React from 'react';
import Home from './pages/Home';
import Editor from 'component/CodeEditor';

const App = () => {
  return (
    <div>
      <Router>
        <Route exact path="/" component={Home} />
      </Router>
    </div>
  );
};
export default App;
