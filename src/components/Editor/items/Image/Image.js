import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Image.module.css';
import {changeItemProps} from '../../../../store/reducers/exercises';

const Image = (props) => {


  const pinButtonHandler = (e) =>{
    const propsClone = {...props.props}
    propsClone.pin = props.props.pin ? false: true;
    props.changeItemProps(props.exerciseIndex, props.itemIndex, propsClone)
  }


  const addButtonHandler = (e) =>{
    const image="https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png";
    const images = [...(props.props.images || [])]
    const propsClone = {...props.props}
    images.push(image);
    propsClone.images = images;
    props.changeItemProps(props.exerciseIndex, props.itemIndex, propsClone)

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
  

  let images;

  if (props.props.images) {
    images = props.props.images.map((imgSrc, index)=>(
      <img src={imgSrc} alt='' key={index}/>
    ))
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
        zIndex = {300}
        notMove={props.props.pin}
        size={props.size}>
          <div className={classes.Image} >
            <div className={classes.Header} >
              <div className={pinButtonClass} onMouseDown={stopPropagation} onClick={pinButtonHandler}></div>
                Imagen 
              <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addButtonHandler}></div>
            </div>
            <div className={classes.Body} >
              <div className={classes.OptionsButton} onClick={optionsButtonHandler}></div>
              {images}
            </div>
          </div>
      </ResizableAndDraggable>
  )

}

export default connect(null, {changeItemProps})(Image);