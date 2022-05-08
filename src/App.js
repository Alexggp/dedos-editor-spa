import React, {useEffect} from 'react';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { connect } from 'react-redux';


import classes from './App.module.css';
import Editor from './components/Editor/Editor';



const mapStateToProps = (state) => {
  return {
    exercises: state.exercisesReducer.exercises
  }
}

function App(props) {

  useEffect(() => {
    console.log("DB GET");
  }, [props.exercises]);

  return (

    <div className={classes.App}>
      <DndProvider backend={HTML5Backend}>
        <Editor/>
			</DndProvider>
      
    </div>
  );
}


export default connect(mapStateToProps, null)(App);
