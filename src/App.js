import React  from 'react';


import classes from './App.module.css';
import EditionPage from './pages/EditorPage/EditionPage';


const App = (props) => {

  
  return (

    <div className={classes.App}>
      
      <EditionPage/>
		
    </div>
  );
}


export default App;
