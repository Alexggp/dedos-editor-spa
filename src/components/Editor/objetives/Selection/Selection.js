import React from 'react';
import dartboardIcon from '../../../../assets/icons/dartboardIcon.png';
import Draggable from '../../../../hoc/Draggable/Draggable';

const Selection = ({objetive}) =>{
  return (
    <Draggable type={'SelectionObj'} id={objetive._id}>
      <img alt='' style={{ width: "100%", height: "auto"}} src={dartboardIcon}/>
    </Draggable>
  )
}

export default Selection;