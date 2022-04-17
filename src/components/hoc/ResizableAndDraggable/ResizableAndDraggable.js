import React from 'react';
import { Rnd } from 'react-rnd'; // resizable and draggable class

import classes from './ResizableAndDraggable.module.css';

const ResizableAndDraggable = (props) => {

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  };


  const HandleClasses = {
    bottomRight: classes.ResizeButon
  }

  const HandleStyles = {
    bottomRight: {
        right: '4px', 
        bottom: '4px',
        width: '25px',
        height: '25px'
      }
  }

  const Enable = {
    bottomRight: true
  }
  return(

      <Rnd
        style={style}
        default={{
          x: 0,
          y: 0,
          width: 320,
          height: 200
        }}
        minWidth= {240}
        minHeight={160}
        resizeHandleClasses= {HandleClasses}
        resizeHandleStyles= {HandleStyles}
        enableResizing= {Enable}
        dragHandleClassName={props.dragHandleClassName}
        bounds={props.bounds}
      >
        {props.children}
      </Rnd>
  )

}


export default ResizableAndDraggable;