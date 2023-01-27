import React from 'react';

import Token from '../TokenMin/TokenMin';
import classes from './TextMin.module.css';

const TextMin = (props) => {
  
  return(
    <Token
      type={'TEXT'}
      token={props.token}
      title={'Texto'}>

      <div className={classes.TextContainer} >
        {props.token.content.text}
      </div>

    </Token>
  )

}


export default TextMin;