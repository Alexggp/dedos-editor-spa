import React from 'react';
import { Rnd } from 'react-rnd'; // resizable and draggable class
import { connect } from 'react-redux';

import classes from './ResizableAndDraggable.module.css';

const mapStateToProps = (state) => {
  return {
    trashIsActive: state.trashIsActiveReducer.isActive
  }
}


const ResizableAndDraggable = (props) => {

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
        minWidth= {240}
        minHeight={160}
        resizeHandleClasses= {HandleClasses}
        resizeHandleStyles= {HandleStyles}
        enableResizing= {Enable}
        dragHandleClassName={props.dragHandleClassName}
        bounds={props.bounds}
        disableDragging={props.notMove}
        onDrag={e=> e.stopPropagation()}
        onDragStop={(e, d) =>{
          if (props.trashIsActive){
            props.delete();
          } else {
            props.moved({x:d.x,y:d.y});
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


export default connect(mapStateToProps, null)(ResizableAndDraggable);