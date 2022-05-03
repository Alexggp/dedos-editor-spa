import React from 'react';
import { connect } from 'react-redux';

import classes from './EditionArea.module.css';
import Zone from '../items/Zone/Zone';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

const mapStateToProps = (state) => {
  const currentStage = state.currentStageReducer.index;
  return {
    itemList: state.stagesReducer.stages[currentStage].itemList,
    currentStage: currentStage
  }
}


const EditionArea = (props) => {
  const items = props.itemList.map((item)=>{
    switch (item.type) {
      case 'zone':
        return <Zone key={item.itemId} stage={props.currentStage} item={item.itemId} offset={item.offset} size={item.size}/>
      case 'image':
        return <Image key={item.itemId} stage={props.currentStage} item={item.itemId} offset={item.offset} size={item.size}/>
      case 'text':
        return <Text key={item.itemId} stage={props.currentStage} item={item.itemId} offset={item.offset} size={item.size}/>
    }
  })

  return(
    
      <div className={classes.EditionArea}>
        <Droppable accept={['Tool1','Tool2']} type="Dustbin">
          <div className={classes.WelcomeText}>
            {items}
            <p>SOY EL ÁREA DE EDICIÓN:</p>
            <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
          </div>
          <div className={classes.Trash}></div>
        </Droppable>
      </div>
    
  )

}


export default connect(mapStateToProps, null)(EditionArea);