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

  const hasMoved = (x, y)=>{
    props.moved(props.itemIndex, {x: x, y:y});
  }

  const hasResized = (w, h)=>{
    props.resized(props.itemIndex, {w: w, h:h});
  }

  return(

      <ResizableAndDraggable 
        dragHandleClassName={classes.Zone}
        bounds={'parent'}
        offset={props.offset}
        moved = {hasMoved}
        resized = {hasResized}
        zIndex = {100}
        size={props.size}>
          <div className={classes.Zone} >
            <div className={classes.OptionsButton} onMouseDown={stopPropagation} onClick={optionsButtonHandler}></div>
            <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addButtonHandler}></div>

            <p>offset: {props.offset.x},{props.offset.y}</p>
            <p>size: {props.size.w}, {props.size.h}</p>

          </div>
      </ResizableAndDraggable>
  )

}


export default Zone;