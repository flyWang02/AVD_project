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

function Aheader() {
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
      window.location.href = "/Asearch";
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
After clicking the back button, it returns to the main page of the administrator
*/      
      async function backclick (){
        let jumpto = document.createElement("a");
        jumpto.setAttribute("href", "/Apost");
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
                  All POSTS
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
            <Button href="/Asearch" color="inherit">
            Search page
          </Button>
          </form>
        </Toolbar>
        </Container>
      </AppBar>
  )
  }

export default Aheader;