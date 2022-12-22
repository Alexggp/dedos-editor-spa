import React from 'react';

import classes from './TokenMin.module.css';



const Token = (props) => {
  const style = {
    width: props.token.size.w / 10,
    height: props.token.size.h / 10,
    top: props.token.offset.y / 10,
    left: props.token.offset.x / 10,
    zIndex: props.token.zIndex
  }
  const tokenClasses = [classes.Token, classes[`Token_type_${props.type}`]].join(' ');

  return(
    <div className={tokenClasses} style={style}>
      <div className={classes.Header} >
        {props.title} 
      </div>
      <div className={classes.Body} >
        {props.children}
      </div>
    </div>
 )}

export default Token;