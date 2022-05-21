import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Area.module.css';
import {changeItemProps} from '../../../../store/reducers/activities';

const Area = (props) => {
  
  const addBackgroundHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.background = 'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png';
    props.changeItemProps(props.activityIndex, props.itemIndex, propsClone)
  }

  const optionsButtonHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.gameArea = props.props.gameArea ? false: true;
    props.changeItemProps(props.activityIndex, props.itemIndex, propsClone)
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
    backgroundImage: `url('${props.area.background || ''}')`
  }

  const areaClasses = [classes.Area];
  if (props.area.type==='Game'){
    areaClasses.push(classes.GameArea);
  }


  return(

      <ResizableAndDraggable 
        dragHandleClassName={classes.Area}
        bounds={'parent'}
        offset={props.area.offset}
        moved = {hasMoved}
        resized = {hasResized}
        delete = {props.delete}
        zIndex = {100}
        size={props.area.size}>
          <div className={areaClasses.join(' ')} style={style}>
            <div className={classes.OptionsButton} onMouseDown={stopPropagation} onClick={optionsButtonHandler}></div>
            <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addBackgroundHandler}></div>
            {props.children}
          </div>
      </ResizableAndDraggable>
  )

}


export default connect(null, {changeItemProps})(Area);