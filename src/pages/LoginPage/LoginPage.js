import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

import LoginForm from '../../components/LoginFormGroup/LoginForm/LoginForm';
import SignUpForm from '../../components/LoginFormGroup/SignUpForm/SignUpForm';
import classes from './LoginPage.module.css';

import { login, signup } from '../../store/actions/user'; 


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.user.token);

  useEffect(() => {
    // If there is  token, redirects to projects page
    if (token){
      navigate('/projects');
    }
  }, [token, navigate]);


  const emptyForm = {
    name: '',
    nameErr: '',
    email: '',
    emailErr: '',
    password: '',
    passwordErr: ''
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
    {token}
      {isLogin ? 
        <LoginForm formData={formData} setFormData={setFormData} send={loginHandler} signUp={()=>toggleIsLogin(false)}/>
      : 
        <SignUpForm formData={formData} setFormData={setFormData} send={signupHandler} login={()=>toggleIsLogin(true)}/>
      }
    </div>
  );
}


export default LoginPage;
