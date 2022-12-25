import React from 'react';
import { useDispatch } from 'react-redux';

import classes from './Trash.module.css';
import Droppable from '../../../../hoc/Droppable/Droppable';
import { trashActions } from '../../../../store/reducers/trash';
import { deleteObjetive } from '../../../../store/actions/objetives';
import usePairing from '../../../../hooks/usePairing';

const Trash = () => {
  const dispatch = useDispatch();
  const {pairingId, cancelPairing} = usePairing();
  
  const removeItem = (item) =>{
    dispatch(deleteObjetive(item.id))
  }

  const handleClick = ()=>{
    if(pairingId){
      dispatch(deleteObjetive(pairingId))
      cancelPairing(false);
    }
  }

  return (
    <Droppable
      type="Trash"
      accept={['SelectionObj', 'CounterObj', 'TimerObj', 'PairingObj']}
      dropped={removeItem}>
      <div className={classes.Trash}
        onClick={handleClick}
        onMouseEnter={() => { dispatch(trashActions.toggle(true)) }}
        onMouseLeave={() => { dispatch(trashActions.toggle(false)) }}
      />
    </Droppable>
  )

}

export default Trash;