import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import 'styles/index.scss';
import 'helper/i18n';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
import * as serviceWorker from './serviceWorker';
import configs from 'config';

ReactDOM.render(
  <GoogleOAuthProvider clientId={configs.GOOGLE_CLIENT_ID || ''}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
