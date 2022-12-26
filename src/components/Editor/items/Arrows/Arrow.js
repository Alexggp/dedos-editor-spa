import React from "react";
import Xarrow from "react-xarrows";

const Arrow = ({origin, target}) => {
    return (
      <Xarrow
          start={origin} 
          end={target || "arrowPointer"}
          zIndex= {999999}
      />   
    );
}

export default Arrow;