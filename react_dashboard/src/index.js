import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App.js'
import { ApiProvider } from './context/ApiProvider.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApiProvider>
      <App/>
    </ApiProvider>
  </React.StrictMode>
);