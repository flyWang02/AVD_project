/*
This is the administrator's modification page for the post
*/
import React, { useState } from 'react'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material//Container'
import KeyboardArrowRightIcon from '@mui/material/node/internal/svg-icons/KeyboardArrowRight'
import TextField from '@mui/material/TextField'
import Aheader from './Aheader';
import { useLocation } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function Lpostedit() {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const postId = queryParams.get('postId');
  console.log(postId)
 
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [descriptions, setDescriptions] = useState('')

  const [titleError, setTitleError] = useState(false)
  const [descriptionsError, setdescriptionsError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [language, setLanguage] = useState('');
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  console.log(language)
  /*
When the button is clicked, the modified title, description and code, as well as the language type, will be sent to http://localhost:1234/api/user/posts/
*/
  async function handleSubmit(e){
    e.preventDefault()
    console.log(title,descriptions,details)
    setTitleError(false)
    setDetailsError(false)
    setdescriptionsError(false)
    
    if (title === '') {
      setTitleError(true)
    }else if (descriptions === '') {
      setdescriptionsError(true)
    }else if (details === '') {
      setDetailsError(true)
    }else{
      await fetch('http://localhost:1234/api/user/posts/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pid: postId,
          title: title,
          description:descriptions,
          details:details,
          language:language
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
        Edit The Post
      </Typography>
      
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          onChange={(e) => setTitle(e.target.value)}
          label="POST Title" 
          variant="outlined" 
          color="secondary"
          multiline
          rows={2} 
          fullWidth
          required
          error={titleError}
        />
        <TextField sx={{ marginTop: '32px', marginBottom: '32px' }}
          onChange={(e) => setDescriptions(e.target.value)}
          label="Description"
          variant="outlined"
          color="secondary"
          multiline
          rows={6}
          fullWidth
          required
          error={descriptionsError}
        />
          <TextField 
          onChange={(e) => setDetails(e.target.value)}
          label="Details"
          variant="outlined"
          color="secondary"
          multiline
          rows={12}
          fullWidth
          required
          error={detailsError}
        />
<>
            <FormControlLabel
              control={
                <Checkbox
                  checked={language === 'python'}
                  onChange={handleLanguageChange}
                  value="python"
                  color="primary"
                />
              }
              label="Python"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={language === 'C#'}
                  onChange={handleLanguageChange}
                  value="C#"
                  color="primary"
                />
              }
              label="C#"
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={language === 'C++'}
                  onChange={handleLanguageChange}
                  value="C++"
                  color="primary"
                />
              }
              label="C++"
            />    
                   
                    <FormControlLabel
                    control={
                      <Checkbox
                        checked={language === 'HTML'}
                        onChange={handleLanguageChange}
                        value="HTML"
                        color="primary"
                      />
                    }
                    label="HTML"
                  />      

                  <FormControlLabel
                  control={
                    <Checkbox
                      checked={language === 'JavaScript'}
                      onChange={handleLanguageChange}
                      value="JavaScript"
                      color="primary"
                    />
                  }
                  label="JavaScript"
                />    

                <FormControlLabel
                control={
                  <Checkbox
                    checked={language === 'PHP'}
                    onChange={handleLanguageChange}
                    value="PHP"
                    color="primary"
                  />
                }
                label="PHP"
              />
            <FormControlLabel
              control={
                <Checkbox
                  checked={language === 'JSX'}
                  onChange={handleLanguageChange}
                  value="JSX"
                  color="primary"
                />
              }
              label="JSX"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={language === 'Java'}
                  onChange={handleLanguageChange}
                  value="Java"
                  color="primary"
                />
              }
              label="Java"
            />
          </>
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