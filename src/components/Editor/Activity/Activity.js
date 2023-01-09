import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import classes from './Activity.module.css';
import Area from '../items/Area/Area';
import Image from '../items/Image/Image';
import Text from '../items/Text/Text';
import Arrow from '../items/Arrows/Arrow';
import SetArrowPointer from '../items/Arrows/SetArrowPointer/SetArrowPointer';
import Trash from './Trash/Trash';
import Timer from '../objetives/Timer/Timer';
import Droppable from '../../../hoc/Droppable/Droppable';

import usePairing from '../../../hooks/usePairing';

import { createArea } from '../../../store/actions/areas';
import { createToken } from '../../../store/actions/tokens';
import { updateActivity } from '../../../store/actions/activities';
import { createObjetive, markObjetive } from '../../../store/actions/objetives';


const Activity = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { pairingId } = usePairing();
  const tokenList = useSelector(state => state.tokens.tokenList);
  const areaList = useSelector(state => state.areas.areaList);
  const activityList = useSelector(state => state.activities.activityList);
  const currentActivityId = params.activityId;
  const activity = activityList.find(ac => ac._id === currentActivityId);
  const currentProjectId = params.projectId;
  const objetivesList = useSelector(state => state.objetives.objetivesList);
  const timerObjetive = objetivesList.find(obj => obj.origin === currentActivityId && obj.type === "Timer");

  const firstUpdate = useRef(true); // preventing to call to update on the first loading at setting the value
  useEffect(() => {
    if (activity?.zIndexTop && !firstUpdate.current) {
      // When the activitiy's zIndexTop changes in the reducer, it updates it in DB
      dispatch(updateActivity({
        activityId: currentActivityId,
        zIndexTop: activity?.zIndexTop
      }));
    }
    if (activity?.zIndexTop && firstUpdate.current) firstUpdate.current = false
    // eslint-disable-next-line
  }, [activity?.zIndexTop]);

  useEffect(() => {
    const pairingObj = objetivesList.filter(obj => obj.activityId === currentActivityId && obj.type === "Pairing");
    pairingObj.forEach(obj => {
      dispatch(markObjetive(obj._id, 2));
    });
    // eslint-disable-next-line 
  }, [currentActivityId]);

  const addNewItem = (item, offset) => {
    switch (item.name) {
      case 'AddArea':
        dispatch(createArea({
          projectId: currentProjectId,
          activityId: currentActivityId,
          offset: {
            x: offset.x - 220,
            y: offset.y - 20
          }
        }));
        break;
      case 'AddText':
        dispatch(createToken({
          projectId: currentProjectId,
          type: 'txt',
          activityId: currentActivityId,
          offset: {
            x: offset.x - 220,
            y: offset.y - 20
          }
        }));
        break;
      case 'AddImage':
        dispatch(createToken({
          projectId: currentProjectId,
          type: 'img',
          activityId: currentActivityId,
          offset: {
            x: offset.x - 220,
            y: offset.y - 20
          }
        }));
        break;
      case 'Timer':
        dispatch(createObjetive({
          projectId: currentProjectId,
          activityId: currentActivityId,
          type: 'Timer',
          origin: currentActivityId
        }));
        break;
      default:
        return;
    }
  }

  const processTokens = (tokenList, area) => tokenList.map((token) => {
    switch (token.type) {
      case 'img':
        return <Image key={token._id} token={token} area={area} />;
      case 'txt':
        return <Text key={token._id} token={token} area={area} />;
      default:
        return <Text key={token._id} token={token} area={area} />;
    }
  })

  // getting tokens without area
  const independentTokenList = tokenList.filter((tkn) => tkn.activityId === currentActivityId && tkn.areaId === 0);
  const tokens = processTokens(independentTokenList, null);

  // getting areas and tokens within area
  const areasFiltered = areaList.filter((area) => area.activityId === currentActivityId);

  const areas = areasFiltered.map((area) => {
    // tokens that belongs to this area
    const areaTokenList = tokenList.filter((tkn) => tkn.activityId === currentActivityId && tkn.areaId === area._id);
    return (
      <Area key={area._id} area={area} tokens={areaTokenList}>
        {processTokens(areaTokenList, area)}
      </Area>
    )

  })

  const arrows = objetivesList.filter(obj => obj.activityId === currentActivityId && obj.type === "Pairing").map(obj => {
    return <Arrow key={obj._id} origin={obj.origin} target={obj.target} zIndexTop={activity.zIndexTop}></Arrow>
  })

  

  const disclaimer = (!tokens.length && !areas.length) ? (
    <div className={classes.WelcomeText}>
      <p>SOY EL ÁREA DE EDICIÓN:</p>
      <p>ARRASTRA SOBRE MI LOS ICONOS DE LA BARRA DE<br />HERRAMIENTAS PARA CREAR UNA ACTIVIDAD</p>
    </div>
  ) : '';

  return (

    <div id="Activity" className={classes.Activity}>
      <Droppable
        type="Activity"
        accept={['AddArea', 'AddText', 'AddImage', 'Timer']}
        activityId={currentActivityId}
        dropped={addNewItem}>
        {tokens}
        {areas}
        {arrows}
        {pairingId ? <SetArrowPointer /> : <></>}
        {disclaimer}
        <Trash />
        {timerObjetive ? <Timer objetive={timerObjetive} /> : <></>}
      </Droppable>
    </div>

  )

}


export default Activity;