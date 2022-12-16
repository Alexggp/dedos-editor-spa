import React from 'react';
import classes from './Header.module.css';
import dartboardIcon from '../../../../../assets/icons/dartboardIcon.png';
import Draggable from '../../../../hoc/Draggable/Draggable';

const Header = ({
  title, 
  addButton, 
  movable,
  pinButtonHandler,
  selection
}) => {

  let pinButtonClass = classes.PinButton;

  if (!movable) {
    pinButtonClass = classes.PinButtonPressed;
  }
  
  return(
    <div className={classes.Container} >
      <div className={pinButtonClass} onMouseDown={(e) => e.stopPropagation()} onClick={pinButtonHandler}></div>
      {selection ? 
        <div className={classes.Selection}  onMouseDown={(e) => e.stopPropagation()}>
          <Draggable type={'TokenSelection'}>
            <img alt='' src={dartboardIcon}/>
          </Draggable>
        </div>
        : <></>
      }
    
      {title} 
      {addButton}
    </div>
  )

}


export default Header;