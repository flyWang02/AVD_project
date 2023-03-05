
/*
This is the page to show the all posts
*/
import Lheader from './Lheader';
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
  console.log(sessionStorage.getItem("auth_token"))
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notesPerPage] = useState(10);

  /*
Get all posts data
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

  const handlePrevPage = () => {
    setCurrentPage(prevPage => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  return (
    <>
    <Lheader></Lheader>
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
                  <Button size='small' component={Link} to={{ pathname: '/Learnmore', search: `?postId=${[note._id,note.aid]}` }}>
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
