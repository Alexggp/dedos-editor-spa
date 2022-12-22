import React from 'react';

import classes from './ObjetivesContainer.module.css';
import Counter from '../../../objetives/Counter/Counter';

const ObjetivesContainer = ({
  objetive
}) => {

  const getObjetiveComponents = () =>{
    switch (objetive.type) {
      case "Counter":   
        return <Counter objetive={objetive}/>
      default:
        return <></>  
    }
  } 

  
  return(
    <>
      {objetive ? 
        <div className={classes.Objetive}  onMouseDown={(e) => e.stopPropagation()}>
          {getObjetiveComponents()}
        </div>
        : <></>
      }
    </>
  )
}


export default ObjetivesContainer;