import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
// import * as serviceWorker from './serviceWorker';

const startApp = function() {
  alert("startApp");
  ReactDOM.render(<App />, document.getElementById('root'));
  // serviceWorker.register();
};

if(window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.register();
