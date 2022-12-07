import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import emailIsValid from '../../../utils/emailIsValid';


const SignUpForm = ({
  formData,
  setFormData,
  send,
  login
}) => {

  const [validable, setValidable] = useState(false);


  const validate = () =>{
    let isValid = true;
    
    if(!emailIsValid(formData.email)){
      setFormData({...formData, emailErr: "Formato incorrecto"});
      return isValid = false;
    }
    if (emailIsValid(formData.email) && formData.emailErr){
      return setFormData({...formData, emailErr: ""});
    }
    if(!formData.password){
      setFormData({...formData, passwordErr: "Este campo es obligatorio"});
      return isValid = false;
    }
    if (formData.password && formData.passwordErr){
      return setFormData({...formData, passwordErr: ""});
    }
    if(!formData.name){
      setFormData({...formData, nameErr: "Este campo es obligatorio"});
      return isValid = false;
    }
    if (formData.name && formData.nameErr){
      return setFormData({...formData, nameErr: ""});
    }
    
    return isValid;
  }

  useEffect(() => {
    if(validable){
      validate();
    }
  // eslint-disable-next-line 
  }, [formData.email, formData.password, formData.name]);


  const handleSend = ()=>{
    setValidable(true)
    const isValid = validate();
    if (isValid) send();
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
    >
      <Typography 
        sx={{
          marginBottom: 3,
        }}
        color="black"
        align="center"
        variant="h4"
        component="div">
          {"Sign Up"}
      </Typography>
      <TextField
        required
        fullWidth
        autoComplete='off'
        error = {!!formData.nameErr.length}
        helperText= {formData.nameErr}
        id="userName"
        label="Nombre"
        type="text"
        value={formData.name}
        onChange={(e)=>setFormData({...formData, name:e.currentTarget.value})}
      />
      <TextField
        required
        fullWidth
        autoComplete='off'
        error = {!!formData.emailErr.length}
        helperText= {formData.emailErr}
        id="userEmail"
        label="Email"
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
        label="Contraseña"
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
          <Button variant="outlined" onClick={login}>LogIn</Button>
          <Button variant="contained" onClick={handleSend}>Aceptar</Button>
      </Stack>
    </Box>
  )
}


export default SignUpForm;