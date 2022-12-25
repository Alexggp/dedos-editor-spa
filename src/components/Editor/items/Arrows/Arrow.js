import React from "react";
import Xarrow from "react-xarrows";

const Arrow = ({origin, target}) => {
  console.log(origin, target)
    return (
      <>
        {
          (origin && target) ? (
              <Xarrow
              start={origin} 
              end={target}
            />
          ) : <></>
        }  

      </>
      
        
    );
}

export default Arrow;