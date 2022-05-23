import React from 'react';
import { connect } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Area.module.css';
import {moveArea, resizeArea, deleteArea, typeArea, backgroundArea} from '../../../../store/reducers/areas';
import {deleteToken} from '../../../../store/reducers/tokens';


const Area = (props) => {
  
  const addBackgroundHandler = (e) =>{
    const backgroundUrl = 'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png';
    props.backgroundArea(props.area.id, backgroundUrl);
  }

  const typeButtonHandler = (e) =>{
    props.typeArea(props.area.id);
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }


  const hasMoved = ({x, y})=>{
    props.moveArea(props.area.id, {x: x, y: y});
  }
  const hasResized = ({w, h})=>{
    props.resizeArea(props.area.id, {w: w, h: h});
  }
  
  const deleteArea = ()=>{
    props.tokens.forEach(token => {
      // Deleting tokens within the area
      props.deleteToken(token.id);
    });
    props.deleteArea(props.area.id);
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
        dragHandleClassName={classes.DragHandle}
        bounds={'parent'}
        offset={props.area.offset}
        moved = {hasMoved}
        resized = {hasResized}
        delete = {deleteArea}
        zIndex = {100}
        size={props.area.size}>
          <div className={areaClasses.join(' ')} style={style}>
            <div className={classes.DragHandle}>
              <div className={classes.AreaTypeButton} onMouseDown={stopPropagation} onClick={typeButtonHandler}></div>
              <div className={classes.AddButton} onMouseDown={stopPropagation} onClick={addBackgroundHandler}></div>
            </div>
            {props.children}
          </div>
      </ResizableAndDraggable>
  )

}


export default connect(null, {moveArea, resizeArea, deleteArea, typeArea, backgroundArea, deleteToken})(Area);