import React from 'react';

import classes from './Counter.module.css';
import abacusIcon from '../../../../assets/icons/abacusIcon.png';
import Draggable from '../../../hoc/Draggable/Draggable';

const Counter = ({objetive}) =>{
  
  const showInput = ()=>{
    console.log("está entrando carajo")
  }

  return (
    <>
      <Draggable type={'CounterObj'} id={objetive._id}>
        <img alt='' style={{ width: "100%", height: "auto"}} src={abacusIcon}/>
      </Draggable>
      <div className={classes.Bubble} onClick={showInput}>
          {objetive.value}
      </div>
    </>

  )
}

export default Counter;