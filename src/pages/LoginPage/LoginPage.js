import React, { useState } from 'react';

import LoginForm from '../../components/LoginForm/LoginForm';
import classes from './LoginPage.module.css';


const LoginPage = () => {

  const emptyForm = {
    name: '',
    password: '',
    email: '',
    error: false
  }
  const [formData, setFormData] = useState(emptyForm);
  const sendHandler = () => {
    console.log(formData)
  }


  return (
    <div className={classes.LoginPage}> 
      <LoginForm formData={formData} setFormData={setFormData} send={sendHandler}/>
    </div>
  );
}


export default LoginPage;
