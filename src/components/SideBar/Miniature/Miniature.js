import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Miniature.module.css';
import AreaMin from './Items/AreaMin/AreaMin';
import ImageMin from './Items/ImageMin/ImageMin';
import TextMin from './Items/TextMin/TextMin';
import removeIcon from '../../../assets/icons/removeIcon.png';




const Miniature = (props) => {

  const tokenList = useSelector(state => state.tokensReducer.tokenList);
  const areaList = useSelector(state => state.areasReducer.areaList);


  const selectActivity = (activityId) =>{
    console.log(activityId);
  }
  
  const removeActivity = (e, activityId) =>{
    e.stopPropagation();
    console.log(activityId);
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
    
      <div className={classes.Miniature} onClick={()=>selectActivity(props.activityId)}>
        <img className={classes.RemoveImg} src={removeIcon} onClick={(e)=>removeActivity(e, props.activityId)} title='Eliminar actividad' alt=''/>
        {areas}
        {tokens}
      </div>
    
  )

}


export default Miniature;