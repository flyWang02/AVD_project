
/*
This is the page where the user edits the comment
*/
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material//Container'
import KeyboardArrowRightIcon from '@mui/material/node/internal/svg-icons/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import Lheader from './Lheader';
import { useLocation } from 'react-router-dom';

export default function Lreplyedit() {

  const token = sessionStorage.getItem("auth_token");
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const postId = queryParams.get('postId');
  console.log(postId)
 /*
Set useState to facilitate "holding" certain values between function calls
*/
  const [details, setDetails] = useState('')
  const [detailsError, setDetailsError] = useState(false)


  console.log(postId)
  

  /*
When the button is clicked, send the changed data to http://localhost:1234/api/edit/comment/ and then return to the main page
*/
  async function handleSubmit(e){
    
    e.preventDefault()
    setDetailsError(false)
    if (details === '') {
      setDetailsError(true)
      
    }else{

      await fetch('http://localhost:1234/api/edit/comment/', {
        method: 'POST',
        headers: { "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
       },
        body: JSON.stringify({
          pid: postId,
          title:details
        })
      })
      let jumpto = document.createElement("a");
      jumpto.setAttribute("href", "/Lpost");
      console.log(jumpto);
      jumpto.click();
    }



  }

  return (
    <>
    <Lheader></Lheader>
    <Container size="sm">
      <Typography
        variant="h3" 
        color="textSecondary"
        component="h2"
        fontWeight="fontWeightBlack"
        gutterBottom
      >
        Edit The Text
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField 
          onChange={(e) => setDetails(e.target.value)}
          label="Text"
          variant="outlined"
          color="secondary"
          multiline
          rows={12}
          fullWidth
          required
          error={detailsError}
        />

        <Button sx={{ marginTop: '32px'}}
          type="submit" 
          color="secondary" 
          variant="contained"
          endIcon={<KeyboardArrowRightIcon />}>
          Submit
        </Button>
      </form>
    </Container>
    </>
  )
}