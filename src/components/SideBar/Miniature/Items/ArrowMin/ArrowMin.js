import React from "react";
import Xarrow from "react-xarrows";

const ArrowMin = ({origin, target}) => {
    return (
      <Xarrow
          start={`min_${origin}`} 
          end={`min_${target}`}
          strokeWidth={1}
          zIndex= {999999}
      />   
    );
}

export default ArrowMin;