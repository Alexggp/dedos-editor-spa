import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './store/';
import { PersistGate } from 'redux-persist/integration/react';
import { globalErrorActions } from './store/reducers/globalError';

// Request interceptor
axios.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) config.headers.Authorization =  token;
  return config;
});

// Response interceptor
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.data) {
    store.dispatch(globalErrorActions.set({
      error: error.response.data.status || error.response.status,
      message: error.response.data.message
    }));
    return Promise.reject(error.response.data);
  }
  store.dispatch(globalErrorActions.set({
    error: error.response.status || 500,
    message: error.response.statusText || error.message
  }));
  return Promise.reject(error.message);
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
