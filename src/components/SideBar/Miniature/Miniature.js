import React from 'react';
import { useSelector } from 'react-redux';

import classes from './Miniature.module.css';
import AreaMin from './Items/AreaMin/AreaMin';
import ImageMin from './Items/ImageMin/ImageMin';
import TextMin from './Items/TextMin/TextMin';
import ArrowMin from './Items/ArrowMin/ArrowMin';
import removeIcon from '../../../assets/icons/removeIcon.png';



const Miniature = (props) => {

  const tokenList = useSelector(state => state.tokens.tokenList);
  const areaList = useSelector(state => state.areas.areaList);


  const processTokens = (tokenList)=>tokenList.map((token)=>{
    switch (token.type) {
      case 'img':
        return <ImageMin key={token._id} token={token}/>;
      case 'txt':
        return <TextMin key={token._id} token={token}/>;
      default:
        return <TextMin key={token._id} token={token}/>;
    }
  })

  // // getting tokens without area
  const tokensFiltered = tokenList.filter((tkn)=>tkn.activityId === props.activityId && tkn.areaId === 0);
  const tokens = processTokens(tokensFiltered);
  
  // // getting areas and tokens within area
  const areasFiltered = areaList.filter((area)=>area.activityId === props.activityId);
  const areas = areasFiltered.map((area)=>{
    // tokens that belongs to this area
    const areaTokenList = tokenList.filter((tkn)=>tkn.activityId === props.activityId && tkn.areaId === area._id);
    return (
      <AreaMin key={area._id} area={area}>
        {processTokens(areaTokenList)}
      </AreaMin>
    )
  
  })

  const objetivesList = useSelector(state => state.objetives.objetivesList);
  const arrows = objetivesList.filter(obj => obj.type === "Pairing").map(obj => {
    return <ArrowMin key={obj._id} origin={obj.origin} target={obj.target}></ArrowMin>
  })

  return(
    
      <div className={classes.Miniature}>
        <img className={classes.RemoveImg} src={removeIcon} onClick={(e)=>props.removeActivity(e, props.activityId, props.isSelected)} title='Eliminar actividad' alt=''/>
        {areas}
        {tokens}
        {arrows}
      </div>
    
  )

}


export default Miniature;