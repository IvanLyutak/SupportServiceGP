import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AppNotification from './AppNotification'
import reportWebVitals from './reportWebVitals';
import NotificationProvider from './components/notifications/NotificationProvider';

ReactDOM.render(
  <React.StrictMode>
    <App/>
    <NotificationProvider>
      <AppNotification />
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
