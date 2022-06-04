import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './EditionArea.module.css';
import Area from '../items/Area/Area';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Droppable from '../../hoc/Droppable/Droppable';

import {createArea} from '../../../store/reducers/areas'; 
import {addNewToken} from '../../../store/reducers/tokens'; 
import { togleTrash } from '../../../store/reducers/trashIsActive';


const EditionArea = (props) => {
  const dispatch = useDispatch();

  const tokenList = useSelector(state => state.tokensReducer.tokenList);
  const areaList = useSelector(state => state.areasReducer.areaList);
  const currentActivity = useSelector(state => state.activitiesReducer.currentActivity);


  useEffect(() => {
    console.log('tokenList state has changed');
  }, [tokenList]);

  useEffect(() => {
    console.log('areaList state has changed');
  }, [areaList]);

  const addNewItem = (item, offset)=>{
    console.log(item, offset)
    switch (item) {
      case 'AddArea':
        dispatch(createArea(currentActivity, offset));
        break;
      case 'AddText':
        dispatch(addNewToken('txt', currentActivity, offset));
        break;
      case 'AddImage':
        dispatch(addNewToken('img', currentActivity, offset));
        break;
      default:
        return;  
    }
  }

  const processTokens = (tokenList, area)=>tokenList.map((token)=>{
    switch (token.type) {
      case 'img':
        return <Image key={token.id} token={token} area={area}/>;
      case 'txt':
        return <Text key={token.id} token={token} area={area}/>;
      default:
        return <Text key={token.id} token={token} area={area}/>;
    }
  })

  // getting tokens without area
  const independentTokenList = tokenList.filter((tkn)=>tkn.activityId === currentActivity && tkn.areaId === 0);
  const tokens = processTokens(independentTokenList, null);

  // getting areas and tokens within area
  const areasFiltered = areaList.filter((area)=>area.activityId === currentActivity);
  const areas = areasFiltered.map((area)=>{
    // tokens that belongs to this area
    const areaTokenList = tokenList.filter((tkn)=>tkn.activityId === currentActivity && tkn.areaId === area.id);
    return (
      <Area key={area.id} area={area} tokens={areaTokenList}>
        {processTokens(areaTokenList, area)}
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
              onMouseEnter={()=>{dispatch(togleTrash(true))}}
              onMouseLeave={()=>{dispatch(togleTrash(false))}}
            />
        </Droppable>
      </div>
    
  )

}


export default EditionArea;