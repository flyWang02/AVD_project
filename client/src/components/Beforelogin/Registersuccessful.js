/*
If registration is successful, this page will be displayed to the user
*/

import React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import Header from '../Beforelogin/Header';

export default function Registersuccessful() {
  
/*
If the user clicks on the button below, this back() function will be executed and will jump to the login screen
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
      <Box  my ={30}
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
        <Alert variant="filled" severity="success">
            <AlertTitle>Success</AlertTitle>
            <strong>Congratulations!</strong> — Registration success
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

