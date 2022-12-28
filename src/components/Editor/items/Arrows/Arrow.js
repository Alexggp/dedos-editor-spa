import React from "react";
import Xarrow from "react-xarrows";
import { useSelector } from 'react-redux';



const Arrow = ({ origin, target, zIndexTop }) => {
  const tokenList = useSelector(state => state.tokens.tokenList);
  const areaList = useSelector(state => state.areas.areaList);

  let maxZindex = zIndexTop;
  if(origin && target){

    const tokenZindex = Math.max(...tokenList.filter(o=>o._id === origin || o._id === target).map(o =>o.zIndex))
    const areaZindex = Math.max(...areaList.filter(o=>o._id === origin || o._id === target).map(o =>o.zIndex))
  
    maxZindex = Math.max(...[tokenZindex || 0, areaZindex || 0]);
  }
  return (
    <Xarrow
      start={origin}
      end={target || "arrowPointer"}
      zIndex={maxZindex}
    />
  );
}

export default Arrow;