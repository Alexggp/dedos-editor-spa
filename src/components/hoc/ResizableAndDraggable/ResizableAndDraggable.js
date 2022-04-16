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
    bottomRight: {right: '2px', bottom: '2px'}
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
        resizeHandleClasses= {HandleClasses}
        resizeHandleStyles= {HandleStyles}
        enableResizing= {Enable}
      >
        {props.children}
      </Rnd>
  )

}


export default ResizableAndDraggable;