/*
Here is the navigation bar before login
*/

import React, { useState } from "react";
import Button from "@mui/material/Button";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";

function Header() {
  /*
Set useState to facilitate "holding" certain values between function calls
*/
  const [searchTerm, setSearchTerm] = useState("");  
  const kke = sessionStorage.getItem("searchwords");
  console.log(kke);
/*
After the search button is clicked, sessionStorage will save the keywords and then jump to Bsearch to display the search results
*/
  const handleSubmit = (event) => {
    event.preventDefault();
    sessionStorage.setItem("searchwords", searchTerm);
    window.location.href = "/Bsearch";
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar>
          <Button href="/Login" variant="contained">
            Login
          </Button>
          <Button href="/Register" color="inherit">
            Register
          </Button>
          <Button href="/Showpage" color="inherit">
            Showpage
          </Button>
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
            <Button href="/Bsearch" color="inherit">
            Search page
          </Button>
          </form>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
