import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';

const startApp = function() {
  // alert("startApp");
  ReactDOM.render(<App />, document.getElementById('root'));
  // serviceWorker.register();
};

window.onload = function() {
  if (window.cordova) {
    console.log("cordova!");
    document.addEventListener('deviceready', startApp, false);
  } else {
    console.log("no cordova...");
    setTimeout(function() {
      startApp();
    }, 1000);
  }
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
