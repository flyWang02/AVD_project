
/*
This is the page where the user's registered account already exists
*/

import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Header from '../Beforelogin/Header';

export default function Loginpassworderror() {
  

  async function back (){
      let jumpto = document.createElement("a");
      jumpto.setAttribute("href", "/Register");
      console.log(jumpto);
      jumpto.click();
  }

 
  return (
      <>
      <Header></Header>
      <Container fixed>
      <Box  my ={30}
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <Alert variant="filled" severity="error">
            <AlertTitle>Error</AlertTitle>
            This is an error alert — <strong>Username already exists!</strong>
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

