import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { LoggedInProvider } from './context/LoggedInContext';

ReactDOM.render(
  <React.StrictMode>
    <LoggedInProvider>
      <App />
    </LoggedInProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
