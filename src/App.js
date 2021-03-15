import React, { useEffect } from 'react';
import './styles/App.css';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Login from './components/Login';
import { auth } from './firebase';

function App() {
  const user = null;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        console.log(userAuth);
      }else{
        
      }
    });

    return unsubscribe;
  },[]);
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
