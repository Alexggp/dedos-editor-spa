import React, {useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';


import classes from './App.module.css';
import Editor from './components/Editor/Editor';
import SideBar from './components/SideBar/SideBar';


const App = (props) => {

  const activityList = useSelector(state => state.activitiesReducer.activityList);

  useEffect(() => {
    // console.log("DB GET");
  }, [activityList]);

  return (

    <div className={classes.App}>
      <SideBar/>
      <DndProvider backend={HTML5Backend}>
        <Editor/>
			</DndProvider>
    </div>
  );
}


export default App;
