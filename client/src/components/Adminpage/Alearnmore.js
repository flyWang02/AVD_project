/*
This page is used to display a detailed post page containing the code and all comments, with edit and delete buttons for each comment and post
*/


import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Aheader from './Aheader';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Container from '@mui/material/Container'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ALearnmore() {
    
    
    
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const postId = queryParams.get('postId');
    const arr = postId.split(",");
    const pid =arr[0];
    const aid =arr[1];
    console.log(pid,aid)

    /*
Used to get the current post that needs to be displayed
*/
    const [post, setPost] = useState([]);
    useEffect(() => {
      fetch('http://localhost:1234/api/get/post/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            pid: pid
        })
      })
        .then(res => res.json())
        .then(data => setPost(data))
    }, [pid])
    console.log(post)

    const [comment, setComment] = useState([]);

    /*
Used to get all the comments of the current post
*/
    useEffect(() => {
        fetch('http://localhost:1234/api/get/comments/',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            pid: pid
          })
        })
          .then(res => res.json())
          .then(bb => setComment(bb))
      }, [pid])

      console.log(comment)



    return(
        <>
            <Aheader></Aheader>
            <Container>
                <Grid>
                    {post.length > 0 ? (
                        <Card style={{ position: 'relative' }}>
                            <Typography variant="h4" color="black">
                                Title: {post[0].title}
                            </Typography>
                            <CardContent>
                                <Typography variant="subtitle1" color="black">
                                    Description:<br/>
                                    {post[0].description}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body1" color="black">
                                    Details:<br/>
                                </Typography>
                                <SyntaxHighlighter language={post[0].language} style={vscDarkPlus}>
                                {post[0].details}
                                </SyntaxHighlighter>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body2" color="black">
                                    Edit date:{post[0].eddate}
                                </Typography>
                            </CardContent>
                            <CardContent>
                                <Button   style={{position: 'absolute',bottom: '12px',right: '100px',backgroundColor: '#1976d2',color: 'white',}}
                                    component={Link} to={{ pathname: '/Apostedit',search: `?postId=${post[0]._id}`}} color="inherit">Edit
                                </Button>
                                <Button   style={{position: 'absolute',bottom: '12px',right: '184px',backgroundColor: '#1976d2',color: 'white',}}
                                    component={Link} to={{ pathname: '/Apostdelete',search: `?postId=${post[0]._id}`}} color="inherit">Delete
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Typography variant="body1" color="black">
                            Loading...
                            If it keeps failing, restart the server and client
                        </Typography>
                    )}
                </Grid>
            </Container>
            {comment.map(note => (
                <Container>
                    <Grid item xs={12} md={6} lg={4} key={note._id}>
                        <Grid my={5}>
                            <Card elevation={1}>
                                <CardContent>
                                    <Typography variant="body1" color="black">
                                    {note.text}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                    <Typography variant="body2" color="black">
                                    Edit date:{note.eddate}
                                    </Typography>
                                </CardContent>
                                <CardContent>
                                
                                <>
                                <Button key={note._id+"1"}  style={{right: '0px',backgroundColor: '#1976d2',color: 'white',}}
                                    component={Link} to={{ pathname: '/Acommentdelete', search: `?postId=${note._id}`}} color="inherit">Delete
                                </Button>
                                <Button key={note._id} style={{left: '20px',backgroundColor: '#1976d2',color: 'white',}}
                                        component={Link} to={{ pathname: '/Acommentedit', search: `?postId=${note._id}`}} color="inherit">Edit
                                </Button>
                                </>
                             </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            ))}
        </>
    )


}

