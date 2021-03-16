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
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if(userAuth){
        dispatch(
          login({
          uid: userAuth.uid,
          email: userAuth.email,
          })
        );
      }else{
        dispatch(logout);
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
