import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Route, BrowserRouter} from 'react-router-dom';
import Login from './components/Login'
import {CookiesProvider} from 'react-cookie';

// import {Route, Switch } from "react-router-dom";



function Router() {
   
  return(
    <CookiesProvider>
    <BrowserRouter>
    {/* <App /> */}
    <Route exact path = "/" component = {Login}/>
    {/* <Route exact path = "/" component = {About}/> */}
    <Route exact path = "/articles" component = {App}/>
    
   


    </BrowserRouter>
    </CookiesProvider>
  )

}


ReactDOM.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
