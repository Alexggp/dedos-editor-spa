import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './EditionArea.module.css';
import Zone from '../items/Zone/Zone';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

import {createItem, moveItem, resizeItem, deleteItem} from '../../../store/reducers/exercises'; 
import { togleTrash } from '../../../store/reducers/trashIsActive';


const mapStateToProps = (state) => {
  const currentExercise = state.currentExerciseReducer.index;
  return {
    itemList: state.exercisesReducer.exercises[currentExercise].itemList,
    currentExercise: currentExercise,
    exercises: state.exercisesReducer.exercises
  }
}

const EditionArea = (props) => {

  useEffect(() => {
    console.log(props.exercises);
  }, [props.itemList, props.exercises]);

  const addNewItem = (item, offset)=>{
    props.createItem(props.currentExercise, item, offset);
  }

  const moveItem = (itemIndex, offset)=>{
    props.moveItem(props.currentExercise, itemIndex, offset);
  }
  
  const resizeItem = (itemIndex, size)=>{
    props.resizeItem(props.currentExercise, itemIndex, size);
  }

  const deleteItem = (itemIndex)=>{
    props.deleteItem(props.currentExercise, itemIndex);
  }

  const items = props.itemList.map((item, index)=>{
    switch (item.type) {
      case 'zone':
        return <Zone key={index} exerciseIndex={props.currentExercise}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem} delete={()=>deleteItem(index)}/>;
      case 'image':
        return <Image key={index} exerciseIndex={props.currentExercise}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem} delete={()=>deleteItem(index)}/>;
      case 'text':
        return <Text key={index} exerciseIndex={props.currentExercise}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem} delete={()=>deleteItem(index)}/>;
      default:
        return <Text key={index} exerciseIndex={props.currentExercise}  props={item.props} itemIndex={index} offset={item.offset} size={item.size} moved={moveItem} resized={resizeItem} delete={()=>deleteItem(index)}/>;
    }
  })

  return(
    
      <div className={classes.EditionArea}>
        <Droppable 
          type="EditionArea"
          accept={['AddZone','AddText','AddImage']} 
          dropped={addNewItem}>
            <div className={classes.WelcomeText}>
              {items}
              <p>SOY EL ÁREA DE EDICIÓN:</p>
              <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
            </div>
            <div className={classes.Trash}
              onMouseEnter={()=>{props.togleTrash(true)}}
              onMouseLeave={()=>{props.togleTrash(false)}}
            />
        </Droppable>
      </div>
    
  )

}


export default connect(mapStateToProps, {createItem, moveItem, resizeItem, deleteItem, togleTrash})(EditionArea);