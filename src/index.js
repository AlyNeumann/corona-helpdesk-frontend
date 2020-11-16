import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import { subscribeUser } from './subscription';
import './Fonts/RobotoCondensed-Bold.ttf';
import './Fonts/RobotoCondensed-Light.ttf';
import './Fonts/RobotoCondensed-Regular.ttf';
import './Fonts/RobotoCondensed-LightItalic.ttf';
import './Fonts/RobotoMono-Light.ttf';
import './Fonts/RobotoMono-Bold.ttf';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.register();

// subscribeUser();
