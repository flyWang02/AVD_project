/*
This code was supposed to show the card of each post on the main page
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

export default function BeNoteCard({ note,nid }) {
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
        <Button size='small' component={Link} to={{ pathname: '/Belearnmore', search: `?postId=${nid}` }}>
              Learnmore
        </Button>
          
        </CardActions>

      </Card>
      </Grid>
    </>
  )
}