import axios from 'axios';

import config from '../../config/index';
import { userActions } from '../reducers/user';

export const login = (user) => {
  return async (dispatch) => {
    try {
      const payload = {
        password: user.password,
        email: user.email
      }
      const response = await axios.post(`${config.server.url}/user/signin`,payload);

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      const newUser = {
        token: response.data.token,
        user: response.data.user_data
      }
      dispatch(userActions.set(newUser));

    } catch (error) {
      console.log(error)
    }
  };
};


export const signup = (user) => {
  return async (dispatch) => {
    try {
      const payload = {
        password: user.password,
        email: user.email,
        name: user.name
      }
      const created = await axios.post(`${config.server.url}/user/signup`,payload);
      if (created.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${created.status}`);
      }
      
      const logged = await axios.post(`${config.server.url}/user/signin`,user);
      if (logged.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${logged.status}`);
      }
      dispatch(userActions.set(logged.data));

    } catch (error) {
      console.log(error)
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(userActions.unset());
  };
};