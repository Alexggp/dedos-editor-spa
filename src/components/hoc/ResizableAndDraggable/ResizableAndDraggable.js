import React from 'react';
import { Rnd } from 'react-rnd'; // resizable and draggable class
import { connect } from 'react-redux';
import {moveItem, resizeItem} from '../../../store/reducers/activities';

import classes from './ResizableAndDraggable.module.css';

const mapStateToProps = (state) => {
  return {
    trashIsActive: state.trashIsActiveReducer.isActive,
    currentActivity: state.currentActivityReducer.index
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


  const hasMoved = (x, y)=>{
    console.log(props.itemId)
    props.moveItem(props.currentActivity, props.itemId, {x: x, y:y});
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
            hasMoved(d.x,d.y);
          }
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          props.resized(ref.style.width, ref.style.height);
        }}
      >
      {props.children}
      </Rnd>
  )

}


export default connect(mapStateToProps, {moveItem, resizeItem})(ResizableAndDraggable);