//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/navbar/NavHeader';
import Home from './components/homePage/Home';
import Login from './components/login/Login';
function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path='/' component ={Home} />
        <Route path='/login' component = {Login} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
