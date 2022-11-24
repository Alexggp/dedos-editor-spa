import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const ProjectForm = ({
  formData,
  setFormData,
  send
}) => {

  const acceptHandler = ()=>{
    if(!formData.email) {
      setFormData({...formData, error:true})
      return;
    } 
    send();
  }

  return(

    <Box
      component="form"
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
          {"Login"}
      </Typography>
      <TextField
        required
        fullWidth
        error = {formData.error}
        id="userEmail"
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e)=>setFormData({...formData, email:e.currentTarget.value})}
      />
      <TextField
        required
        fullWidth
        error = {formData.error}
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
          <Button variant="outlined" onClick={()=>console.log("hola")}>SingUp</Button>
          <Button variant="contained" onClick={send}>Aceptar</Button>
      </Stack>
    </Box>
  )
}


export default ProjectForm;