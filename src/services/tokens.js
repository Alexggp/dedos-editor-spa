import axios from 'axios';

import config from '../config/index';

const updateTokenService = (token)=>{
  return new Promise ((resolve, reject) =>{
   
    axios.put(`${config.server.url}/tokens/${token._id}`,token)
      .then(response => {
        console.log(response.data)
        return resolve(response.data);         
      })
      .catch(err => reject(err));
  });
}


export {updateTokenService}