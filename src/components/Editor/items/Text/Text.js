import React from 'react';
import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Text.module.css';

const Text = (props) => {


  const pinButtonHandler = (e) =>{
    console.log('Pin Button Pressed');
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
        dragHandleClassName={classes.Header}
        bounds={'parent'}
        offset={props.offset}
        moved = {hasMoved}
        resized = {hasResized}
        zIndex = {200}
        size={props.size}>
          <div className={classes.Text} >
            <div className={classes.Header} >
              <div className={classes.PinButton} onMouseDown={stopPropagation} onClick={pinButtonHandler}></div>
                Texto
            </div>
            <div className={classes.Body} >
              <textarea placeholder="<Excriba aquí el texto>"/>
              <div className={classes.OptionsButton} onClick={optionsButtonHandler}></div>
            </div>
          </div>
      </ResizableAndDraggable>
  )

}


export default Text;