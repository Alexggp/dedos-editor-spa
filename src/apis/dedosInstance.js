import axios from 'axios';
import config from '../config';
import { store } from '../store';
import { globalErrorActions } from '../store/reducers/globalError';
import { userActions } from '../store/reducers/user';

const dedosInstance = axios.create({
  baseURL: config.server.url
})


// Request interceptor
dedosInstance.interceptors.request.use((config) => {
  const token = store.getState().user.token;
  if (token) config.headers.Authorization =  token;
  return config;
});

// Response interceptor
dedosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && error.response.data) {
    store.dispatch(globalErrorActions.set({
      error:  error.response.status,
      message: error.response.data.message
    }));
    if(error.response.status === 401){
      store.dispatch(userActions.unset());
    }
    return Promise.reject(error.response.data);
  }
  store.dispatch(globalErrorActions.set({
    error: error.response.status || 500,
    message: error.response.statusText || error.message
  }));
  return Promise.reject(error.message);
});

export default dedosInstance;