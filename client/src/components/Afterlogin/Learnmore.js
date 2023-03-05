/*
This page is used to display a detailed post page with the code and all the comments
*/

import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Lheader from './Lheader';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Container from '@mui/material/Container'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Link } from 'react-router-dom';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Learnmore() {
    
    
    
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const postId = queryParams.get('postId');
    const arr = postId.split(",");
    const pid =arr[0];
    const aid =arr[1];
    console.log(pid,aid)

    const [post, setPost] = useState([]);
/*
Used to get the current post that needs to be displayed
*/
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

    const uid = sessionStorage.getItem("uid")


    return(
        <>
            <Lheader></Lheader>
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
                            
                            {uid === post[0].aid? (
                                <CardContent>
                                    <Button   style={{position: 'absolute',bottom: '12px',right: '16px',backgroundColor: '#1976d2',color: 'white',}}
                                        component={Link} to={{ pathname: '/Lreply', search: `?postId=${post[0]._id}`}} color="inherit">Reply
                                    </Button>
                                    <Button   style={{position: 'absolute',bottom: '12px',right: '100px',backgroundColor: '#1976d2',color: 'white',}}
                                        component={Link} to={{ pathname: '/Lpostedit',search: `?postId=${post[0]._id}`}} color="inherit">Edit
                                    </Button>
                                </CardContent>
                            ) : null}
                                {uid === null? null: 
                                <CardContent>
                                    <Button   style={{position: 'absolute',bottom: '12px',right: '16px',backgroundColor: '#1976d2',color: 'white',}}
                                        component={Link} to={{ pathname: '/Lreply',search: `?postId=${post[0]._id}`}} color="inherit">Reply
                                    </Button>
                                </CardContent>}

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
                                {uid === note.authorid? (
                                <>
                                    <Button key={note._id} style={{right: '0px',backgroundColor: '#1976d2',color: 'white',}}
                                        component={Link} to={{ pathname: '/Lreplyedit', search: `?postId=${note._id}`}} color="inherit">Edit
                                    </Button>
                                </>
                             ) : null}
                             </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            ))}
        </>
    )


}

