/*
This is the navigation bar after login
*/
import React, { useState } from "react";
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from "@mui/material/TextField";

function Lheader() {
  const [searchTerm, setSearchTerm] = useState("");  

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

/*
After clicking the search button, it will jump to the search page and save the keywords in sessionStorage
*/
  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("searchwords", searchTerm);
    window.location.href = "/Lsearch";
  };

/*
After clicking the logout button, all sessionStorage will be cleared, and then return to the main page before login
*/
    async function logoutclick (){
        sessionStorage.clear();
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/");
        jumpto.click();
      }

/*
After clicking the create post button, it will jump to the post creation page
*/      
    async function creatclick (){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Lcreatpost");
        jumpto.click();
      }

/*
After clicking the back button, it will jump to the home page after login and display all posts
*/      
      async function backclick (){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Lpost");
        jumpto.click();
      }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Grid container  >
            <Grid item ml={0} mr={20}>
              <Button variant="contained" component="label"
                        onClick={()=>{
                            logoutclick()
                            }}>
                    Log Out
              </Button>
            </Grid>
            <Grid item mx={5} >
            <Button variant="contained" component="label"
                      onClick={()=>{
                          backclick()
                          }}>
                  ALL POSTS
              </Button>
            </Grid>
            <Grid item mx={5} >
            <Button variant="contained" component="label"
                      onClick={()=>{
                          creatclick()
                          }}>
                  Creat POST
              </Button>
            </Grid>
        </Grid>
        </Toolbar>
        <Toolbar>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              label="Search"
              value={searchTerm}
              onChange={handleSearchTermChange}
              variant="standard"
              margin="dense"
            />
            <Button type="submit" variant="contained">
              Search
            </Button>
            <Button href="/Lsearch" color="inherit">
            Search page
          </Button>
          </form>
        </Toolbar>
        </Container>
      </AppBar>
  )
  }

export default Lheader;