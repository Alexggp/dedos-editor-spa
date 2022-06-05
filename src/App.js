import React, {useEffect} from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useSelector } from 'react-redux';


import classes from './App.module.css';
import Editor from './components/Editor/Editor';
import SideBar from './components/SideBar/SideBar';


const App = (props) => {

  const activities = useSelector(state => state.activitiesReducer.activities);

  useEffect(() => {
    console.log("DB GET");
  }, [activities]);

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
