import React from 'react';
import './styles/App.css';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/Login';

function App() {
  const user = null;
  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login />
        ) : (
        <Switch>
          <Route exact path='/'>
          <Home />
          </Route>
        </Switch>
        )}
        
      </Router>
    </div>
  );
}

export default App;
