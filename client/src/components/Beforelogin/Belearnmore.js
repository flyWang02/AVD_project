/*
This page is used to display the details of the post
*/
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import Header from './Header';
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'

import Container from '@mui/material/Container'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
/*
Used to set the highlighting library
*/
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
Get the post data and update the DOM directly.
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
获取comments数据，直接更新DOM。
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
            <Header></Header>
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
                             </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Container>
            ))}
        </>
    )


}

