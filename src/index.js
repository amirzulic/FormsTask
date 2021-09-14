import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAzjp32YGf803BsQa9lnSCXs8ZUKy-3UNo",
    authDomain: "dws6-85974.firebaseapp.com",
    projectId: "dws6-85974",
    storageBucket: "dws6-85974.appspot.com",
    messagingSenderId: "832892985741",
    appId: "1:832892985741:web:734e803b9e09fd1eca9dc4",
    measurementId: "G-NGDJGJR3BS"
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
