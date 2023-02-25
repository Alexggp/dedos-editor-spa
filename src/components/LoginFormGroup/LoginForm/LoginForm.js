import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import emailIsValid from '../../../utils/emailIsValid';

const LoginForm = ({
  formData,
  setFormData,
  send,
  signUp
}) => {

  const [validable, setValidable] = useState(false);
  const { t } = useTranslation('global');


  const validate = () =>{
    let isValid = true;
    
    if(!emailIsValid(formData.email)){
      setFormData({...formData, emailErr: t('login.formatError')});
      return isValid = false;
    }
    if (emailIsValid(formData.email) && formData.emailErr){
      return setFormData({...formData, emailErr: ""});
    }
    if(!formData.password){
      setFormData({...formData, passwordErr: t('login.required')});
      return isValid = false;
    }
    if (formData.password && formData.passwordErr){
      return setFormData({...formData, passwordErr: ""});
    }
    
    return isValid;
  }

  useEffect(() => {
    if(validable){
      validate();
    }
  // eslint-disable-next-line 
  }, [formData.email, formData.password]);


  const handleSend = ()=>{
    setValidable(true)
    const isValid = validate();
    if (isValid) send();
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }


  return(

    <Box
      component="form"
      autoComplete='off'
      sx={{
        width: 320,
        padding: 5,
        backgroundColor: 'white',        
        '& .MuiTextField-root': { m: 1, width: '300px' },
      }}
      onKeyDown={handleKeyDown}
    >
      <Typography 
        sx={{
          marginBottom: 3,
        }}
        color="black"
        align="center"
        variant="h4"
        component="div">
          {"Login"}
      </Typography>
      <TextField
        required
        fullWidth
        autoComplete='off'
        error = {!!formData.emailErr.length}
        helperText= {formData.emailErr}
        id="userEmail"
        label={t('login.email')}
        type="email"
        value={formData.email}
        onChange={(e)=>setFormData({...formData, email:e.currentTarget.value})}
      />
      <TextField
        required
        fullWidth
        autoComplete='off'
        error = {!!formData.passwordErr.length}
        helperText= {formData.passwordErr}
        id="userPassword"
        label={t('login.password')}
        type="password"
        value={formData.password}
        onChange={(e)=>setFormData({...formData, password:e.currentTarget.value})}
      />


      <Stack 
        sx={{
          marginTop: 5,
        }}
        spacing={2} 
        direction="row" 
        justifyContent={"space-between"}>
          <Button variant="outlined" onClick={signUp}>{t('login.signup')}</Button>
          <Button variant="contained" onClick={handleSend}>{t('login.accept')}</Button>
      </Stack>
    </Box>
  )
}


export default LoginForm;