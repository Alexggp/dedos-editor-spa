import React from 'react';


import classes from './AreaMin.module.css';


const AreaMin = (props) => {
 
  const style = {
    backgroundImage: `url('${props.area.background || ''}')`,
    width: props.area.size.w / 10,
    height: props.area.size.h / 10,
    top: props.area.offset.y / 10,
    left: props.area.offset.x / 10,
    
  }

  const areaClasses = [classes.Area];
  if (props.area.type==='Game'){
    areaClasses.push(classes.GameArea);
  }

  return(
    <div className={areaClasses.join(' ')} style={style}>
      {props.children}
    </div>
  )
}


export default AreaMin;