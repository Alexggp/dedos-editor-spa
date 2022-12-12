import dedosInstance from '../../apiInstances/dedosInstance';
import { text, image } from '../classes';
import { tokensActions } from '../reducers/tokens';

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