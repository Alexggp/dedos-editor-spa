import React, { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

import classes from './FileLoader.module.css';


export default function FileLoaer({children, itemId, onLoad}) {
  
  const [loading, setLoading] = useState(false)

  const loadImage = (file) => {
    if (!file) {
      return;
    }
    setLoading(true);
    //Uploading the file using
    fetch('https://httpbin.org/post', {
      method: 'POST',
      body: file,
      // 👇 Set headers manually for single file upload
      headers: {
        'content-type': file.type,
        'content-length': `${file.size}`, // 👈 Headers need to be a string
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png";
        onLoad(image);
      })
      .catch((err) => console.error(err))
      .finally(()=>setLoading(false));
  };

  const onChangeHandler = (e)=>{
    if (e.target.files) {
      loadImage(e.target.files[0]);
    }
  }

  return (
    <div className={classes.FileLoaer}>
      <input type="file" id={`file_${itemId}`} style={{display: "none"}} accept="image/png, image/gif, image/jpeg" onChange={onChangeHandler}/>
      <label htmlFor={`file_${itemId}`} onMouseDown={e=>e.stopPropagation()}>
      {loading ? <CircularProgress size={30} sx={{ color: 'white.500' }}/> : <div className={classes.InputButton}></div>}
      </label>
    </div>
  );
}