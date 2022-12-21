import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateObjetive } from '../../../../store/actions/objetives';
import classes from './Counter.module.css';
import abacusIcon from '../../../../assets/icons/abacusIcon.png';
import closeIcon from '../../../../assets/icons/removeIcon.png';
import Draggable from '../../../hoc/Draggable/Draggable';
import Modal from '../../../hoc/Modal/Modal';

const Counter = ({objetive}) =>{
  const dispatch = useDispatch();
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState(objetive.value);

  const closeHandler = () => {
    dispatch(updateObjetive({
      objetiveId: objetive._id,
      data: {value: inputValue}
    }))
    setShowInput(false);
  }

  const changeInputHandler = (e) => {
    if (e.target.value > 0) setInputValue(e.target.value)
  }

  return (
    <>
      <Draggable type={'CounterObj'} id={objetive._id}>
        <img alt='' style={{ width: "100%", height: "auto"}} src={abacusIcon}/>
      </Draggable>
      <div className={classes.Bubble} onClick={()=>setShowInput(true)}>
          {objetive.value}
      </div>
      <Modal open={showInput} close={closeHandler}>
        <img alt='' className={classes.CloseModal} src={closeIcon} onClick={closeHandler}/>
        <label htmlFor={'CounterInput'}> Contador:  </label>
        <input 
          type='number'
          name={'CounterInput'}
          onChange={changeInputHandler}
          value = {inputValue}/>
      </Modal>
    </>

  )
}

export default Counter;