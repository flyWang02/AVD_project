/*
This is the confirmation of the comment deletion page when the comment is deleted
*/

import React from 'react'
import Button from '@mui/material/Button'
import Container from '@mui/material//Container'
import Aheader from './Aheader';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


export default function Acommentdelete() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const postId = queryParams.get('postId');
  console.log(postId)
/*
Click on the confirmation to send a request to http://localhost:1234/api/delete/comment/ to delete the comment
*/

    async function back (){
        await fetch('http://localhost:1234/api/delete/comment/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              pid: postId,
            })
          })
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Apost");
        console.log(jumpto);
        jumpto.click();
    }




  return (
    <>
    <Aheader></Aheader>
    <Container fixed>
      <Box  my ={30}
            component="form"
            sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}}
            noValidate
            autoComplete="off"
        >
        <Alert variant="filled" severity="warning">
            <AlertTitle>Attention</AlertTitle>
            <strong>Attention!</strong> — Click Confirm to delete
            </Alert>
            <div>
            <Button variant="contained" component="label"
                onClick={()=>{
                     back()
                    }}>
            Confirm
            </Button>
        </div>
        </Box>

      </Container>
    </>
  )
}