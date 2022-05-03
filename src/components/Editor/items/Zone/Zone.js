import React from 'react';
import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Zone.module.css';

const Zone = (props) => {
  
  const addButtonHandler = (e) =>{
    console.log('Add Button Pressed');
  }

  const optionsButtonHandler = (e) =>{
    console.log('Options Button Pressed');
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  return(

      <ResizableAndDraggable 
        dragHandleClassName={classes.Zone}
        bounds={'parent'}
        offset={props.offset}
        size={props.size}>
          <div className={classes.Zone} >
            <div className={classes.OptionsButton} onMouseDown={stopPropagation} onClick={optionsButtonHandler}></div>
            <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addButtonHandler}></div>
          </div>
      </ResizableAndDraggable>
  )

}


export default Zone;