import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import LoginForm from '../../components/LoginFormGroup/LoginForm/LoginForm';
import SignUpForm from '../../components/LoginFormGroup/SignUpForm/SignUpForm';
import classes from './LoginPage.module.css';

import { login, signup } from '../../store/actions/user'; 


const LoginPage = () => {
  const dispatch = useDispatch();

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

  const loginHandler = () => {
    dispatch(login(formData))
  }

  const signupHandler = () => {
    dispatch(signup(formData))
  }

  return (
    <div className={classes.LoginPage}> 
      {isLogin ? 
        <LoginForm formData={formData} setFormData={setFormData} send={loginHandler} signUp={()=>toggleIsLogin(false)}/>
      : 
        <SignUpForm formData={formData} setFormData={setFormData} send={signupHandler} login={()=>toggleIsLogin(true)}/>
      }
    </div>
  );
}


export default LoginPage;
