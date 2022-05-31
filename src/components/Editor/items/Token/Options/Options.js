import React, {useState} from 'react';
import classes from './Options.module.css';


const Options = (props) => {

  const [currentTab, setCurrentTab] = useState(0);

  const getTabClasses = (tabId) =>{
    const tabClss = [classes.Tab];

    if (tabId === currentTab) tabClss.push(classes.TabSelected);

    return tabClss.join(' ');
  }

  const changeClickableHandler = (e) => {
    const auxToken = {...props.token}
    auxToken.clickable = e.target.checked;
    props.updateOptions(auxToken);
  }

  const changeRotatableHandler = (e) => {
    const auxToken = {...props.token}
    auxToken.rotatable = e.target.checked;
    props.updateOptions(auxToken);
  }

  const changeResizableHandler = (e) => {
    const auxToken = {...props.token}
    auxToken.resizable = e.target.checked;
    props.updateOptions(auxToken);
  }

  const changeFeedbackHandler = (e) => {
    const auxToken = {...props.token}
    auxToken.feedback = e.target.value;
    props.updateOptions(auxToken);
  }

  const changeMathsHandler = (e) => {
    const auxToken = {...props.token}
    auxToken.mathematics = e.target.value;
    props.updateOptions(auxToken);
  }

  const actionsContainer = (
    <div className={classes.Container}>
      <div className={classes.InputsContainer}>
        <div>
          <input 
            id={`input1${props.token.id}`}
            type="checkbox"
            onChange={changeClickableHandler}
            checked = {props.token.clickable}
            name={`input1${props.token.id}`}/>
          <label htmlFor={`input1${props.token.id}`}> Seleccionable </label>
        </div>
        <div>
          <input 
            id={`input2${props.token.id}`}
            type="checkbox"
            onChange={changeRotatableHandler}
            checked = {props.token.rotatable}
            name={`input2${props.token.id}`}/>
          <label htmlFor={`input2${props.token.id}`}> Girable </label>
        </div>
        <div>
          <input 
            id={`input3${props.token.id}`}
            type="checkbox"
            onChange={changeResizableHandler}
            checked = {props.token.resizable}
            name={`input3${props.token.id}`}/>
          <label htmlFor={`input3${props.token.id}`}> Redimensionable </label>
        </div>      
      </div>  
    </div>
  )

  const feedbackContainer = (
    <div className={classes.Container}>
      <div className={classes.TextContainer} >
        <textarea 
          placeholder="Retroalimentación" 
          value={props.token.feedback}
          onChange={changeFeedbackHandler}
          />
      </div>
    </div>
  )
  

  const mathsContainer = (
    <div className={classes.Container}>
      <div  className={classes.MathsContainer}>
        <label htmlFor={`inputN${props.token.id}`}> Valor numérico </label>
        <input 
          type='number'
          id= {`inputN${props.token.id}`}
          onChange={changeMathsHandler}
          value = {props.token.mathematics}
          name={`inputN${props.token.id}`}/>
      </div>
    </div>
  )

  const getOptionsForm = () => {
    switch (currentTab){
      case 0:
        return actionsContainer
      case 1:
        return feedbackContainer
      case 2: 
        return mathsContainer 
      default:
        return actionsContainer  
    }
  }
  
  
  return(
    <div className={classes.Options}>
      <div className={classes.TabBar}>
        <div className={getTabClasses(0)} onClick={()=>setCurrentTab(0)}>Acciones</div>
        <div className={getTabClasses(1)} onClick={()=>setCurrentTab(1)}>Feedback</div>
        <div className={getTabClasses(2)} onClick={()=>setCurrentTab(2)}>Matemática</div>
      </div>
      <div className={classes.OptionsContainer}>
        {getOptionsForm()}
      </div>
    </div>
  )

}


export default Options;