import React from "react";
import Xarrow from "react-xarrows";
import { useSelector } from 'react-redux';


const ArrowMin = ({ origin, target }) => {
  const tokenList = useSelector(state => state.tokens.tokenList);
  const areaList = useSelector(state => state.areas.areaList);

  const tokenZindex = Math.max(...tokenList.filter(o => o._id === origin || o._id === target).map(o => o.zIndex))
  const areaZindex = Math.max(...areaList.filter(o => o._id === origin || o._id === target).map(o => o.zIndex))

  const maxZindex = Math.max(...[tokenZindex || 0, areaZindex || 0]);

  return (
    <Xarrow
      start={`min_${origin}`}
      end={`min_${target}`}
      strokeWidth={1}
      zIndex={maxZindex}
    />
  );
}

export default ArrowMin;