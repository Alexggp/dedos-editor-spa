import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classes from './Activity.module.css';
import Area from '../items/Area/Area';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';

import Trash from './Trash/Trash'
import Droppable from '../../hoc/Droppable/Droppable';

import { createArea } from '../../../store/actions/areas'; 
import { createToken } from '../../../store/actions/tokens'; 
import { updateActivity } from '../../../store/actions/activities';



const Activity = (props) => {
  const dispatch = useDispatch();

  const tokenList = useSelector(state => state.tokens.tokenList);
  const areaList = useSelector(state => state.areas.areaList);
  const activityList = useSelector(state => state.activities.activityList);
  const currentActivityId = useSelector((state) => state.activities.currentActivityId);
  const activity = activityList.find(ac => ac._id === currentActivityId);
  const currentProjectId = useSelector(state => state.projects.currentProjectId);

  useEffect(()=>{
    // When the activitiy's zIndexTop changes in the reducer, it updates it in DB
    dispatch(updateActivity({
      activityId: currentActivityId,
      zIndexTop: activity.zIndexTop}))
    // eslint-disable-next-line
  },[activity?.zIndexTop])

  const addNewItem = (item, offset)=>{
    console.log(item)
    switch (item.name) {
      case 'AddArea':
        dispatch(createArea({
          projectId: currentProjectId,
          activityId: currentActivityId,
          offset: {
              x: offset.x-220,
              y: offset.y-20
            }
        }));
        break;
      case 'AddText':
        dispatch(createToken({
          projectId: currentProjectId,
          type: 'txt', 
          activityId: currentActivityId, 
          offset: {
            x: offset.x-220,
            y: offset.y-20
          }
        }));
        break;
      case 'AddImage':
        dispatch(createToken({
          projectId: currentProjectId,
          type: 'img', 
          activityId: currentActivityId, 
          offset: {
            x: offset.x-220,
            y: offset.y-20
          }
        }));
        break;
      default:
        return;  
    }
  }

  const processTokens = (tokenList, area)=>tokenList.map((token)=>{
    switch (token.type) {
      case 'img':
        return <Image key={token._id} token={token} area={area}/>;
      case 'txt':
        return <Text key={token._id} token={token} area={area}/>;
      default:
        return <Text key={token._id} token={token} area={area}/>;
    }
  })

  // getting tokens without area
  const independentTokenList = tokenList.filter((tkn)=>tkn.activityId === currentActivityId && tkn.areaId === 0);
  const tokens = processTokens(independentTokenList, null);

  // getting areas and tokens within area
  const areasFiltered = areaList.filter((area)=>area.activityId === currentActivityId);

  const areas = areasFiltered.map((area)=>{
    // tokens that belongs to this area
    const areaTokenList = tokenList.filter((tkn)=>tkn.activityId === currentActivityId && tkn.areaId === area._id);
    return (
      <Area key={area._id} area={area} tokens={areaTokenList}>
        {processTokens(areaTokenList, area)}
      </Area>
    )
  
  })

  const disclaimer = (!tokens.length && !areas.length) ? (
    <div className={classes.WelcomeText}>
      <p>SOY EL ÁREA DE EDICIÓN:</p>
      <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br/>HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
    </div>
  ) : '';

  return(
    
      <div id="Activity" className={classes.Activity}>
        
        <Droppable 
          type="Activity"
          accept={['AddArea','AddText','AddImage']} 
          activityId = {currentActivityId}
          dropped={addNewItem}>
            {tokens}
            {areas}
            {disclaimer}
            <Trash/>
        </Droppable>
      </div>
    
  )

}


export default Activity;