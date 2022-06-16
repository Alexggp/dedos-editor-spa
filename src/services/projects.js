import axios from 'axios';

import config from '../config/index';

const getProjectById = (projectId)=>{
  return new Promise ((resolve, reject) =>{
   
    axios.get(`${config.server.url}/projects/${projectId}`)
      .then(response => {
        console.log(response.data)
        return resolve(response.data);         
      })
      .catch(err => reject(err));
  });
}


export {getProjectById}