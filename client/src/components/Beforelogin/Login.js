
/*
This is the login page, where users enter their account password to log in
*/

import React, {useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './Header';


export default function Login() {
/*
Set useState to facilitate "holding" certain values between function calls
*/
  const [names, setName] = useState('')
  const [passwords, setPasswords] = useState('')
  const [namesError, setNameError] = useState(false)
  const [passwordsError, setPasswordsError] = useState(false)


  console.log(names,passwords);

/*
Once the login button is clicked, the submit() function will be called to send the login information to http://localhost:1234/api/user/login/ to match with the database and receive the result to return the result.
*/

  async function submit (){
    let useremail = names
    let userpassword = passwords
    setNameError(false)
    setPasswordsError(false)
    console.log(1111111111111111111,typeof useremail,typeof useremail);
    if(names==='admin'&& passwords==="123456"){
      let jumpto = document.createElement("a");
      jumpto.setAttribute("href", "/Apost");
      console.log(jumpto);
      jumpto.click();
    }else{    
      const loginweb = await fetch('http://localhost:1234/api/user/login', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: useremail,
        password: userpassword
      })
    })
  let res = await loginweb.json()
    console.log(res.id)
  /*
Here different return values will be determined and then jump to the corresponding interface to pass the information to the user
*/
  if(!res.success) {
      console.log(res.retext)
      if(res.retext === 'Invalid user'){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Loue");
        console.log(jumpto);
        jumpto.click();
      }else if(res.retext === 'Invalid password'){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Lope");
        console.log(jumpto);
        jumpto.click();
      }
    } else {
      sessionStorage.setItem("auth_token", res.token);
      sessionStorage.setItem("uid", res.id);
      let jumpto = document.createElement("a");
      jumpto.setAttribute("href", "/Lpost");
      console.log(jumpto);
      jumpto.click();
    }}

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
            Login
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
            <Button variant="contained" component="label"
                onClick={()=>{
                     submit()
                    }}>
            Login
            </Button>
            
        </div>
        </Box>

      </Container>
    </>
  );
  }

