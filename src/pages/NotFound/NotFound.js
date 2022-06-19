import React from 'react';
import classes from './NotFound.module.css';
import { Link } from 'react-router-dom';



const NotFound = (props) => {

  return (
    <div className={classes.NotFound}> 
      <h1>
        404 - NOT FOUND
      </h1>
      <h2>
        <Link to="/">Ir a inicio</Link>
      </h2>
    </div>

  );
}


export default NotFound;
