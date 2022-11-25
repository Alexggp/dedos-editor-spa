import React, { useState } from 'react';

import LoginForm from '../../components/LoginFormGroup/LoginForm/LoginForm';
import SignUpForm from '../../components/LoginFormGroup/SignUpForm/SignUpForm';
import classes from './LoginPage.module.css';


const LoginPage = () => {

  const emptyForm = {
    name: '',
    password: '',
    email: '',
    error: false
  }
  const [formData, setFormData] = useState(emptyForm);
  const [isLogin, setIsLogin] = useState(true);

  const toggleIsLogin = (bool) =>{
    setFormData(emptyForm);
    setIsLogin(bool);
  }

  const sendHandler = () => {
    console.log(formData)
  }


  return (
    <div className={classes.LoginPage}> 
      {isLogin ? 
        <LoginForm formData={formData} setFormData={setFormData} send={sendHandler} signUp={()=>toggleIsLogin(false)}/>
      : 
        <SignUpForm formData={formData} setFormData={setFormData} send={sendHandler} login={()=>toggleIsLogin(true)}/>
      }
    </div>
  );
}


export default LoginPage;
