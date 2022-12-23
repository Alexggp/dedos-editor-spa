import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './Trash.module.css';


import Droppable from '../../../hoc/Droppable/Droppable';

import { trashActions } from '../../../../store/reducers/trash';
import { deleteObjetive } from '../../../../store/actions/objetives';



const Trash = () => {
  const dispatch = useDispatch();
  
  const removeItem = (item) =>{
    dispatch(deleteObjetive(item.id))
  }

  return (
    <Droppable
      type="Trash"
      accept={['SelectionObj', 'CounterObj', 'TimerObj', 'PairingObj']}
      dropped={removeItem}>
      <div className={classes.Trash}
        onMouseEnter={() => { dispatch(trashActions.toggle(true)) }}
        onMouseLeave={() => { dispatch(trashActions.toggle(false)) }}
      />
    </Droppable>
  )

}

export default Trash;