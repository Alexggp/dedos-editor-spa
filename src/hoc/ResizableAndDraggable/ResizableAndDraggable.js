import React from 'react';
import { Rnd } from 'react-rnd'; // resizable and draggable class
import { useSelector } from 'react-redux';
import {useXarrow} from 'react-xarrows';

import classes from './ResizableAndDraggable.module.css';

const ResizableAndDraggable = (props) => {
  const updateXarrow = useXarrow();
  const trashIsActive = useSelector(state => state.trash.isActive);

  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: props.zIndex
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
          x: props.offset.x,
          y: props.offset.y,
          width: props.size.w,
          height: props.size.h
        }}
        minWidth= {280}
        minHeight={190}
        resizeHandleClasses= {HandleClasses}
        resizeHandleStyles= {HandleStyles}
        enableResizing= {Enable}
        dragHandleClassName={props.dragHandleClassName}
        bounds={props.bounds}
        disableDragging={props.notMove}
        onDrag={e=> {
          e.stopPropagation()
          updateXarrow()
        }}
        onDragStart={props.updateZIndex}
        onDragStop={(e, offset) =>{
          updateXarrow();
          if (trashIsActive){
            props.delete();
          } else {
            // This offset ir referenced by the draggable parent, not by the window
            props.moved({x:offset.x,y:offset.y});
          }
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          props.resized({w: ref.style.width, h: ref.style.height});
        }}
      >
      {props.children}
      </Rnd>
  )

}


export default ResizableAndDraggable;