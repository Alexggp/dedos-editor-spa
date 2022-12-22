import React from 'react';

import classes from './Header.module.css';
import Selection from '../../../objetives/Selection/Selection';
import Counter from '../../../objetives/Counter/Counter';

const Header = ({
  title, 
  addButton, 
  movable,
  pinButtonHandler,
  objetive
}) => {

  let pinButtonClass = classes.PinButton;

  if (!movable) {
    pinButtonClass = classes.PinButtonPressed;
  }

  const getObjetiveComponents = () =>{
    switch (objetive.type) {
      case "Selection":
        return <Selection objetive={objetive}/>
      case "Counter":   
        return <Counter objetive={objetive}/>
      default:
        return <></>  
    }
  } 

  
  return(
    <div className={classes.Container} >
      <div className={pinButtonClass} onMouseDown={(e) => e.stopPropagation()} onClick={pinButtonHandler}></div>
      {objetive ? 
        <div className={classes.Objetive}  onMouseDown={(e) => e.stopPropagation()}>
          {getObjetiveComponents()}
        </div>
        : <></>
      }
      {title}
      {addButton}
    </div>
  )
}


export default Header;