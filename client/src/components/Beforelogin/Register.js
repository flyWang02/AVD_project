/*
This is the user's registration page
*/

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './Header';

export default function Register() {
/*
Set useState to facilitate "holding" certain values between function calls
*/
  const [names, setName] = useState('')
  const [passwords, setPasswords] = useState('')
  const [namesError, setNameError] = useState(false)
  const [passwordsError, setPasswordsError] = useState(false)

/*
Once the Register button is clicked, the addtext () function will be called to send the registration information update to the database to http://localhost:1234/api/user/register/
*/
  async function addtext (){
    let useremail = names
    let userpassword = passwords
    setNameError(false)
    setPasswordsError(false)
    console.log(names,passwords);
    const registerweb = await fetch('http://localhost:1234/api/user/register/', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: useremail,
        password: userpassword
      })
    })
  let res = await registerweb.json()
    
  if(!res.success) {
      console.log(res)
      if(res === 'Password is not strong enough'){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Repe");
        console.log(jumpto);
        jumpto.click();
      }else if(res === 'Email already in use'){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Reue");
        console.log(jumpto);
        jumpto.click();
      }
      }else {
        /*
        Here the login token will be stored to localStorage
        */
        localStorage.setItem("auth_token", res.token);
        let jumpto = document.createElement("a");
        /*
        If the registration is successful, it will jump to the 'Registersuccessful' page to indicate that the user has registered successfully
        */
        jumpto.setAttribute("href", "/Registersuccessful");
        console.log(jumpto);
        jumpto.click();
    } 
  }

 
  return (
      <>
      <Header></Header>
      <Container fixed>
      <Box mx={10} my ={10}
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
            <div>
            <Typography variant="h6" gutterBottom>
            Register
            </Typography>

            <TextField
                onChange={(e) => setName(e.target.value)}
                id="standard-required"
                label="Account"
                variant="standard"
                error={namesError}
            />
            <br/>
            
            <TextField
            onChange={(e) => setPasswords(e.target.value)}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                error={passwordsError}
            />
            <br/>
            <Typography variant="body2" gutterBottom>
            Password need：<br/>
            Minimum length 8<br/>
            At least one lowercase letter<br/>
            At least one uppercase letter<br/>
            At least one number<br/>
            </Typography>
            <br/>
            <Button variant="contained" component="label"
                onClick={()=>{
                     addtext()
                    }}>
            Register
            </Button>
            
        </div>
        </Box>

      </Container>
    </>
  );
  }

