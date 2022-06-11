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

  const removeActivity = (e, activityId, isSelected) =>{
    e.stopPropagation();
    dispatch(deleteActivity(activityId, isSelected));
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
  const tokensFiltered = tokenList.filter((tkn)=>tkn.activityId === props.activityId && tkn.areaId === 0);
  const tokens = processTokens(tokensFiltered);

  // // getting areas and tokens within area
  const areasFiltered = areaList.filter((area)=>area.activityId === props.activityId);
  const areas = areasFiltered.map((area)=>{
    // tokens that belongs to this area
    const areaTokenList = tokenList.filter((tkn)=>tkn.activityId === props.activityId && tkn.areaId === area.id);
    return (
      <AreaMin key={area.id} area={area}>
        {processTokens(areaTokenList)}
      </AreaMin>
    )
  
  })

  return(
    
      <div className={classes.Miniature}>
        <img className={classes.RemoveImg} src={removeIcon} onClick={(e)=>removeActivity(e, props.activityId, props.isSelected)} title='Eliminar actividad' alt=''/>
        {areas}
        {tokens}
      </div>
    
  )

}


export default Miniature;