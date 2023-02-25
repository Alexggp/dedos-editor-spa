import React, {useState} from 'react';
import classes from './Options.module.css';
import { useTranslation } from 'react-i18next';


const Options = (props) => {
  const { t } = useTranslation('global');

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
            id={`input1${props.token._id}`}
            type="checkbox"
            onChange={changeClickableHandler}
            checked = {props.token.clickable}
            name={`input1${props.token._id}`}/>
          <label htmlFor={`input1${props.token._id}`}> {t('items.token.options.clickable')} </label>
        </div>
        <div>
          <input 
            id={`input2${props.token._id}`}
            type="checkbox"
            onChange={changeRotatableHandler}
            checked = {props.token.rotatable}
            name={`input2${props.token._id}`}/>
          <label htmlFor={`input2${props.token._id}`}> {t('items.token.options.rotatable')} </label>
        </div>
        <div>
          <input 
            id={`input3${props.token._id}`}
            type="checkbox"
            onChange={changeResizableHandler}
            checked = {props.token.resizable}
            name={`input3${props.token._id}`}/>
          <label htmlFor={`input3${props.token._id}`}> {t('items.token.options.resizable')} </label>
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
        <label htmlFor={`inputN${props.token._id}`}> {t('items.token.options.value')} </label>
        <input 
          type='number'
          id= {`inputN${props.token._id}`}
          onChange={changeMathsHandler}
          value = {props.token.mathematics}
          name={`inputN${props.token._id}`}/>
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
        <div className={getTabClasses(0)} onClick={()=>setCurrentTab(0)}>{t('items.token.options.actions')}</div>
        <div className={getTabClasses(1)} onClick={()=>setCurrentTab(1)}>{t('items.token.options.feedback')}</div>
        <div className={getTabClasses(2)} onClick={()=>setCurrentTab(2)}>{t('items.token.options.maths')}</div>
      </div>
      <div className={classes.OptionsContainer}>
        {getOptionsForm()}
      </div>
    </div>
  )

}


export default Options;