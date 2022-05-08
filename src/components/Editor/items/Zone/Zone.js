import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Zone.module.css';
import {changeItemProps} from '../../../../store/reducers/stages';

const Zone = (props) => {
  
  const addButtonHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.background = 'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png';
    props.changeItemProps(props.stageIndex, props.itemIndex, propsClone)
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

  const style = {
    backgroundImage: `url('${props.props.background || ''}')`
  }

  return(

      <ResizableAndDraggable 
        dragHandleClassName={classes.Zone}
        bounds={'parent'}
        offset={props.offset}
        moved = {hasMoved}
        resized = {hasResized}
        delete = {props.delete}
        zIndex = {100}
        size={props.size}>
          <div className={classes.Zone} style={style}>
            <div className={classes.OptionsButton} onMouseDown={stopPropagation} onClick={optionsButtonHandler}></div>
            <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addButtonHandler}></div>

            <p>offset: {props.offset.x},{props.offset.y}</p>
            <p>size: {props.size.w}, {props.size.h}</p>

          </div>
      </ResizableAndDraggable>
  )

}


export default connect(null, {changeItemProps})(Zone);