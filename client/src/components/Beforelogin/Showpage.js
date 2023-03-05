/*
This page is used to display all posts before login, which is the home page
*/


import Header from './Header';
import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'

import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/material'
import { Link } from 'react-router-dom';


export default function Showpage() {
/*
Set useState to facilitate "holding" certain values between function calls
*/
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(10);

/*
Set useEffect to facilitate the execution of side effects in the component - fetching data, updating the DOM directly 
*/

  useEffect(() => {
    fetch('http://localhost:1234/api/store/posts/')
      .then(res => res.json())
      .then(data => setNotes(data))
  }, [])

/*
Set pager
*/
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  const totalPages = Math.ceil(notes.length / notesPerPage);

/*
Set the click function of the pager
*/
  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
    <Header></Header>
    <Container>
        {currentNotes.map(note => (
          <Grid item xs={12} md={6} lg={4} key={note._id}>
            <Grid my={5}>
              <Card elevation={1}>
                <CardHeader title={note.title}/>
                <CardContent>
                  <Typography variant="body3" color="black">
                  {note.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size='small' component={Link} to={{ pathname: '/Belearnmore', search: `?postId=${[note._id,note.aid]}` }}>
                        Learnmore
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
        ))}
    </Container>
    <Container>
      <Button disabled={currentPage === 1} onClick={handlePrevPage}>Prev</Button>
      <Button disabled={currentPage === totalPages} onClick={handleNextPage}>Next</Button>
      <Typography>{`Page ${currentPage} of ${totalPages}`}</Typography>
    </Container>
    </>
  )
}
