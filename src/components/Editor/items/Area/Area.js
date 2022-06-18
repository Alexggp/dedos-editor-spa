import React from 'react';
import { useDispatch } from 'react-redux';

import ResizableAndDraggable from '../../../hoc/ResizableAndDraggable/ResizableAndDraggable';

import classes from './Area.module.css';
import { updateArea, deleteArea } from '../../../../store/actions/areas';

import { deleteToken } from '../../../../store/actions/tokens';


const Area = (props) => {
  const dispatch = useDispatch();
  
  const addBackgroundHandler = (e) =>{
    const backgroundUrl = 'https://images-na.ssl-images-amazon.com/images/I/71+mDoHG4mL.png';
    const auxArea = {...props.area}
    auxArea.background = backgroundUrl;
    dispatch(updateArea(auxArea));
  }

  const typeButtonHandler = (e) =>{
    const auxArea = {...props.area}
    auxArea.type= (props.area.type === 'Game') ? 'Player' : 'Game';
    dispatch(updateArea(auxArea));
  }

  const stopPropagation = (e) =>{
    e.stopPropagation();
  }


  const hasMoved = ({x, y})=>{
    const auxArea = {...props.area}
    auxArea.offset = {x: x, y: y};
    dispatch(updateArea(auxArea));
  }
  const hasResized = ({w, h})=>{
    const auxArea = {...props.area}
    // Size is returned as a string with px. eg: {w: '10px', y: '30px'}
    // It must be normalized as a number
    auxArea.size = {
      w: Number(w.replace('px','')), 
      h: Number(h.replace('px',''))
    };
    dispatch(updateArea(auxArea));
  }
  
  const deleteAreaHandler = ()=>{
    props.tokens.forEach(token => {
      // Deleting tokens within the area
      dispatch(deleteToken(token._id));
    });
    dispatch(deleteArea(props.area._id));
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
        delete = {deleteAreaHandler}
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


export default Area;