import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './EditionArea.module.css';
import Area from '../items/Area/Area';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

import {createItem, moveItem, resizeItem, deleteItem} from '../../../store/reducers/activities'; 
import { togleTrash } from '../../../store/reducers/trashIsActive';


const mapStateToProps = (state) => {
  const currentActivity = state.currentActivityReducer.index;
  return {
    tokenList: state.activitiesReducer.activities[currentActivity].tokenList,
    areaList: state.activitiesReducer.activities[currentActivity].areaList,
    currentActivity: currentActivity,
    activities: state.activitiesReducer.activities
  }
}

const EditionArea = (props) => {

  useEffect(() => {
    console.log(props.activities);
  }, [props.tokenList, props.activities]);

  const addNewItem = (item, offset)=>{
    props.createItem(props.currentActivity, item, offset);
  }

  const moveItem = (itemIndex, offset)=>{
    props.moveItem(props.currentActivity, itemIndex, offset);
  }
  
  const resizeItem = (itemIndex, size)=>{
    props.resizeItem(props.currentActivity, itemIndex, size);
  }

  const deleteItem = (itemIndex)=>{
    props.deleteItem(props.currentActivity, itemIndex);
  }

  const processTokens = (tokenList)=>tokenList.map((token)=>{
    switch (token.type) {
      case 'img':
        return <Image key={token.id} token={token}/>;
      case 'txt':
        return <Text key={token.id} token={token}/>;
      default:
        return <Text key={token.id} token={token}/>;
    }
  })
  const tokens = processTokens(props.tokenList);

  const areas = props.areaList.map((area)=>(
    <Area key={area.id} area={area}>
      {processTokens(area.tokenList)}
    </Area>
  ))

  return(
    
      <div className={classes.EditionArea}>
        <Droppable 
          type="EditionArea"
          accept={['AddArea','AddText','AddImage']} 
          dropped={addNewItem}>
            <div className={classes.WelcomeText}>
              {tokens}
              {areas}
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