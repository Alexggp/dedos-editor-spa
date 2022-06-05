import React from 'react';

import Token from '../TokenMin/TokenMin';
import classes from './ImageMin.module.css';



const Image = (props) => {

  let images;
  if (props.token.content.urlList) {
    images = props.token.content.urlList.map((imgSrc, index)=>(
      <div className={classes.ImageBox} key={index}>
        <img className={classes.Image} src={imgSrc} alt='' />
      </div>
    ))
  }


  return(

      <Token
        type={'IMAGE'}
        token={props.token}
        title={'Imagen'}>
          
        <div className={classes.ImageContainer} >
          {images}
        </div>

      </Token>
  )

}

export default Image;