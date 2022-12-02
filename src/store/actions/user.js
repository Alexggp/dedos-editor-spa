import axios from 'axios';

import config from '../../config/index';
import { userActions } from '../reducers/user';

export const login = (user) => {
  return async (dispatch) => {

    try {
      const response = await axios.post(`${config.server.url}/user/signin`,user);

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(userActions.set(response.data));

    } catch (error) {
      console.log(error)
    }
  };
};


export const signup = (user) => {
  return async (dispatch) => {

    try {
      const created = await axios.post(`${config.server.url}/user/signip`,user);
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
