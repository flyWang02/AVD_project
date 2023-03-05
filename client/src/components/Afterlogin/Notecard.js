/*
This code is supposed to display a card for each post on the main page, but it is not used in the final project
*/
import React from 'react'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { CardActions } from '@mui/material'
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom';

export default function NoteCard({ note,nid }) {
  console.log(nid)
  return (
    <>
    <Grid my={5}>
      <Card elevation={1}>
        <CardHeader 
          title={note.title}
        />
        <CardContent>
          <Typography variant="body3" color="black">
          {note.description}
          </Typography>
        </CardContent>
        <CardActions>
        <Button size='small' component={Link} to={{ pathname: '/Learnmore', search: `?postId=${nid}` }}>
              Learnmore
        </Button>
          
        </CardActions>

      </Card>
      </Grid>
    </>
  )
}