import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Zone.module.css';
import {changeItemProps} from '../../../../store/reducers/exercises';

const Zone = (props) => {
  
  const addBackgroundHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.background = 'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png';
    props.changeItemProps(props.exerciseIndex, props.itemIndex, propsClone)
  }

  const optionsButtonHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.gameZone = props.props.gameZone ? false: true;
    props.changeItemProps(props.exerciseIndex, props.itemIndex, propsClone)
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

  const zoneClasses = [classes.Zone];
  if (props.props.gameZone){
    zoneClasses.push(classes.GameZone);
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
          <div className={zoneClasses.join(' ')} style={style}>
            <div className={classes.OptionsButton} onMouseDown={stopPropagation} onClick={optionsButtonHandler}></div>
            <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addBackgroundHandler}></div>
          </div>
      </ResizableAndDraggable>
  )

}


export default connect(null, {changeItemProps})(Zone);