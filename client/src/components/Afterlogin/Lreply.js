/*
This is the page where users post comments
*/

import Lheader from './Lheader';
import { useLocation } from 'react-router-dom';
import React, { useState,useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material//Container'
import KeyboardArrowRightIcon from '@mui/material/node/internal/svg-icons/KeyboardArrowRight'
import TextField from '@mui/material/TextField'



export default function Lreply() {
    const token  = sessionStorage.getItem("auth_token")
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const postId = queryParams.get('postId');
    console.log(postId)
    const [title, setTitle] = useState('')
    const [titleError, setTitleError] = useState(false)
    const [userid, setUserid] = useState([]);

/*
Used to get the id of the user
*/

  useEffect(() => {
    fetch('http://localhost:1234/api/user/id/')
      .then(res => res.json())
      .then(data => setUserid(data))
  }, [])


/*
When the submit button is clicked, the content of the comment is sent to http://localhost:1234/api/create/comment/, and then the main page is returned
*/
  async function handleSubmit(e){
    e.preventDefault()
    setTitleError(false)
    if (title === '') {
      setTitleError(true)
    }else{
      await fetch('http://localhost:1234/api/create/comment/', {
        method: 'POST',
        headers: { "Content-Type": "application/json",
        "Authorization": "Bearer " + token,
      },
        body: JSON.stringify({
            pid:postId,
            aid:userid,
            text:title
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
        Create a Reply
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          onChange={(e) => setTitle(e.target.value)}
          label="POST Text" 
          variant="outlined" 
          color="secondary" 
          multiline
          rows={8}
          fullWidth
          required
          error={titleError}
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