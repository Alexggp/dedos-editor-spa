import React from 'react';
import pairIcon from '../../../../assets/icons/pairIcon.png';
import Draggable from '../../../../hoc/Draggable/Draggable';

const Pairing = ({objetive}) =>{
  return (
    <Draggable type={'PairingObj'} id={objetive._id}>
      <img alt='' style={{ width: "100%", height: "auto"}} src={pairIcon}/>
    </Draggable>
  )
}

export default Pairing;