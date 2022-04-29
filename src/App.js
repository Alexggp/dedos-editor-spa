import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import classes from './App.module.css';
import Editor from './components/Editor/Editor';



function App() {
  return (

    <div className={classes.App}>
      <DndProvider backend={HTML5Backend}>
        <Editor/>
			</DndProvider>
      
    </div>
  );
}

export default App;
