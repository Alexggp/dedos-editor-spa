import React from 'react';
import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Image.module.css';

const Image = (props) => {


  const pinButtonHandler = (e) =>{
    console.log('Pin Button Pressed');
  }

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
        dragHandleClassName={classes.Header}
        bounds={'parent'}
        offset={props.offset}
        size={props.size}>
          <div className={classes.Image} >
            <div className={classes.Header} >
              <div className={classes.PinButton} onMouseDown={stopPropagation} onClick={pinButtonHandler}></div>
                Imagen
              <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addButtonHandler}></div>
            </div>
            <div className={classes.Body} >
              <div className={classes.OptionsButton} onClick={optionsButtonHandler}></div>
            </div>
          </div>
      </ResizableAndDraggable>
  )

}


export default Image;