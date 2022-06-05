import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import classes from './Miniature.module.css';
import AreaMin from './Items/AreaMin/AreaMin';
import ImageMin from './Items/ImageMin/ImageMin';
import TextMin from './Items/TextMin/TextMin';
import removeIcon from '../../../assets/icons/removeIcon.png';
import { deleteActivity } from '../../../store/reducers/activities';



const Miniature = (props) => {
  const dispatch = useDispatch();

  const tokenList = useSelector(state => state.tokensReducer.tokenList);
  const areaList = useSelector(state => state.areasReducer.areaList);

  const removeActivity = (e, activityId) =>{
    e.stopPropagation();
    dispatch(deleteActivity(activityId));
  }

  const processTokens = (tokenList)=>tokenList.map((token)=>{
    switch (token.type) {
      case 'img':
        return <ImageMin key={token.id} token={token}/>;
      case 'txt':
        return <TextMin key={token.id} token={token}/>;
      default:
        return <TextMin key={token.id} token={token}/>;
    }
  })

  // // getting tokens without area
  const tokensFiltered = tokenList.filter((tkn)=>tkn.activityId === props.activityId);
  const tokens = processTokens(tokensFiltered);

  // // getting areas and tokens within area
  const areasFiltered = areaList.filter((area)=>area.activityId === props.activityId);
  const areas = areasFiltered.map((area)=>{
    return (
      <AreaMin key={area.id} area={area} />
    )
  
  })

  return(
    
      <div className={classes.Miniature}>
        <img className={classes.RemoveImg} src={removeIcon} onClick={(e)=>removeActivity(e, props.activityId)} title='Eliminar actividad' alt=''/>
        {areas}
        {tokens}
      </div>
    
  )

}


export default Miniature;