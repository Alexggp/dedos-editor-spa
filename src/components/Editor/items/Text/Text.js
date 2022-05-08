import React from 'react';
import { connect } from 'react-redux';


import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';
import classes from './Text.module.css';
import {changeItemProps} from '../../../../store/reducers/exercises';

const Text = (props) => {


  const pinButtonHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.pin = props.props.pin ? false: true;
    props.changeItemProps(props.exerciseIndex, props.itemIndex, propsClone)
  }

  const optionsButtonHandler = (e) =>{
    console.log('Options Button Pressed');
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }

  const changeText = (e) => {
    const propsClone = {...props.props}
    propsClone.text = e.target.value;
    props.changeItemProps(props.exerciseIndex, props.itemIndex, propsClone)
  }

  const hasMoved = (x, y)=>{
    props.moved(props.itemIndex, {x: x, y:y});
  }

  const hasResized = (w, h)=>{
    props.resized(props.itemIndex, {w: w, h:h});
  }

  let pinButtonClass = classes.PinButton;

  if (props.props.pin) {
    pinButtonClass = classes.PinButtonPressed;
  }
  
  return(

      <ResizableAndDraggable
        dragHandleClassName={classes.Header}
        bounds={'parent'}
        offset={props.offset}
        moved = {hasMoved}
        resized = {hasResized}
        delete = {props.delete}
        zIndex = {200}
        size={props.size}>
          <div className={classes.Text} >
            <div className={classes.Header} >
              <div className={pinButtonClass} onMouseDown={stopPropagation} onClick={pinButtonHandler}></div>
                Texto
            </div>
            <div className={classes.Body} >
              <textarea placeholder="<Excriba aquí el texto>" onChange={changeText}/>
              <div className={classes.OptionsButton} onClick={optionsButtonHandler}></div>
            </div>
          </div>
      </ResizableAndDraggable>
  )

}


export default connect(null, {changeItemProps})(Text);