/*
This is the page where the user entered the wrong password
*/

import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Header from '../Beforelogin/Header';

export default function Loginpassworderror() {
  
/*
Click the button to return to the login page
*/
  async function back (){
      let jumpto = document.createElement("a");
      jumpto.setAttribute("href", "/Login");
      console.log(jumpto);
      jumpto.click();
  }

 
  return (
      <>
      <Header></Header>
      <Container fixed>
      <Box my ={30}
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>Check your password, your password doesn't match!</strong>
            </Alert>
            <div>
            <Button variant="contained" component="label"
                onClick={()=>{
                     back()
                    }}>
            Back
            </Button>
        </div>
        </Box>

      </Container>
    </>
  );
  }

