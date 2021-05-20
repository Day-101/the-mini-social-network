import React from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import ModifyProfile from './pages/ModifyProfile';
import UserProfile from './pages/UserProfile';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import './sass/style.scss';

const App = () => {
 
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/profile/modify">
          <ModifyProfile />
        </Route>
        <Route path="/users/:slug">
          <UserProfile />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/signin" exact>
          <SignIn />
        </Route>
      </Switch>
    </Router>
)};

export default App;