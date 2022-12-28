import dedosInstance from '../../apis/dedosInstance';
import { text, image } from '../classes';
import { tokensActions } from '../reducers/tokens';
import { objetivesActions } from '../reducers/objetives';
import { store } from '..';

export const updateToken = (token) => {
  return async (dispatch) => {
    try {
      const response = await dedosInstance.put(`/tokens/${token._id}`,token)

      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status}`);
      }
      dispatch(tokensActions.update(token));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const deleteToken = (tokenId) => {
  return async (dispatch) => {

    try {
      const response = await dedosInstance.delete(`/tokens/${tokenId}`)
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      dispatch(tokensActions.delete(tokenId));

      const objetivesList = store.getState().objetives.objetivesList;
      const obj = objetivesList.find(obj => obj.origin === tokenId || obj.target === tokenId);
      // Deleting attached objetives
      if (obj) {
        dispatch(objetivesActions.delete(obj._id));
      };
    } catch (error) {
      // console.log(error)
      return;
    }
  };
};

export const createToken = ({projectId, type, activityId, offset}) => {
  return async (dispatch) => {

    let newToken;
    if(type==='txt'){
      newToken = text(projectId, activityId, offset);
    } else {
      newToken = image(projectId, activityId, offset);
    }
    try {
      const response = await dedosInstance.post(`/tokens`, newToken);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      }
      newToken._id = response.data._id;
      dispatch(tokensActions.create(newToken));

    } catch (error) {
      // console.log(error)
      return;
    }
  };
};