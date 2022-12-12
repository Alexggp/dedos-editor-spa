import dedosInstance from '../../apiInstances/dedosInstance';
import { userActions } from '../reducers/user';

export const login = (user) => {
  return async (dispatch) => {
    try {
      const payload = {
        password: user.password,
        email: user.email
      }
      const response = await dedosInstance.post(`/user/signin`,payload);

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      const newUser = {
        token: response.data.token,
        user: response.data.user_data
      }
      dispatch(userActions.set(newUser));

    } catch (error) {
      // console.log(error)
      return;
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
      const created = await dedosInstance.post(`/user/signup`,payload);
      if (created.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${created.status}`);
      }
      
      const logged = await dedosInstance.post(`/user/signin`,user);
      if (logged.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${logged.status}`);
      }
      const newUser = {
        token: logged.data.token,
        user: logged.data.user_data
      }
      dispatch(userActions.set(newUser));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch(userActions.unset());
  };
};