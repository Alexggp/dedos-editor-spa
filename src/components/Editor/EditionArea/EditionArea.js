import React, {useEffect} from 'react';
import { connect } from 'react-redux';

import classes from './EditionArea.module.css';
import Area from '../items/Area/Area';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

import {addNewArea} from '../../../store/reducers/areas'; 
import { togleTrash } from '../../../store/reducers/trashIsActive';


const mapStateToProps = (state) => {
  return {
    tokenList: state.tokensReducer.tokenList,
    areaList: state.areasReducer.areaList,
    currentActivity: state.activitiesReducer.currentActivity,
  }
}

const EditionArea = (props) => {

  useEffect(() => {
    console.log('tokenList state has changed');
  }, [props.tokenList]);

  useEffect(() => {
    console.log('areaList state has changed');
  }, [props.areaList]);

  const addNewItem = (item, offset)=>{
    console.log(item, offset)
    switch (item) {
      case 'AddArea':
        props.addNewArea(props.currentActivity, offset);
        break;
      case 'AddText':
        return ;
      case 'AddImage':
        return ;
      default:
        return;  
    }
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

  // getting tokens without area
  const independentTokenList = props.tokenList.filter((tkn)=>tkn.activityId === props.currentActivity && tkn.areaId === 0);
  const tokens = processTokens(independentTokenList);

  // getting areas and tokens within area
  const areaList = props.areaList.filter((area)=>area.activityId === props.currentActivity);
  const areas = areaList.map((area)=>{
    // tokens that belongs to this area
    const areaTokenList = props.tokenList.filter((tkn)=>tkn.activityId === props.currentActivity && tkn.areaId === area.id);
    return (
      <Area key={area.id} area={area} tokens={areaTokenList}>
        {processTokens(areaTokenList)}
      </Area>
    )
  
  })

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


export default connect(mapStateToProps, {togleTrash, addNewArea})(EditionArea);