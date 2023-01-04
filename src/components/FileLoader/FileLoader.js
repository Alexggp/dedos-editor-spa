import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import dedosInstance from '../../apis/dedosInstance';

import classes from './FileLoader.module.css';


export default function FileLoaer({ children, itemId, onLoad }) {

  const [loading, setLoading] = useState(false)

  const loadImage = async (file) => {
    if (!file) {
      return;
    }
    setLoading(true);
    //Uploading the file 
    try {
      const config = {
        //Set headers manually for single file upload
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`, //Headers need to be a string
        }
      };
      const response = await dedosInstance.post(`/files`, file, config);
      if (response.status !== 200) {
        throw new Error(`Unexpected API call response with status: ${response.status} - ${response.statusText}`);
      } else {
        onLoad(response.data.url);
        setLoading(false);
      }


    } catch (error) {
      setLoading(false);
      return;
    }

  };

  const onChangeHandler = (e) => {
    if (e.target.files) {
      loadImage(e.target.files[0]);
    }
  }

  return (
    <div className={classes.FileLoaer}>
      <input type="file" id={`file_${itemId}`} style={{ display: "none" }} accept="image/png, image/gif, image/jpeg" onChange={onChangeHandler} />
      <label htmlFor={`file_${itemId}`} onMouseDown={e => e.stopPropagation()}>
        {loading ? <CircularProgress size={30} sx={{ color: 'white.500' }} /> : <div className={classes.InputButton}></div>}
      </label>
    </div>
  );
}