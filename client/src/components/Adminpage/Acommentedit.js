
/*
This is the interface for administrators to edit comments, the functions and contents are the same as the interface for users to edit comments
*/
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material//Container'
import KeyboardArrowRightIcon from '@mui/material/node/internal/svg-icons/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import Aheader from './Aheader';
import { useLocation } from 'react-router-dom';

export default function Acommentedit() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const postId = queryParams.get('postId');
  console.log(postId)
 
  const [details, setDetails] = useState('')
  const [detailsError, setDetailsError] = useState(false)


  console.log(postId)
  async function handleSubmit(e){
    
    e.preventDefault()
    setDetailsError(false)
    if (details === '') {
      setDetailsError(true)
      
    }else{

      await fetch('http://localhost:1234/api/user/comment/', {
        method: 'POST',
        headers: { "Content-Type": "application/json",
       },
        body: JSON.stringify({
          pid: postId,
          title:details
        })
      })
      let jumpto = document.createElement("a");
      jumpto.setAttribute("href", "/Apost");
      console.log(jumpto);
      jumpto.click();
    }



  }

  return (
    <>
    <Aheader></Aheader>
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