/*
This code is to display the user's profile, unfortunately, I did not implement this function
*/
import { Avatar, Grid, Paper, Typography } from '@mui/material/';

const styles = {
  root: {
    flexGrow: 1,
    padding: '16px',
    margin: '16px',
  },
  avatar: {
    width: '128px',
    height: '128px',
  },
};

const user = {
  name: 'John Doe',
  registrationDate: new Date(),
  photoUrl: 'https://example.com/userphoto.jpg',
  bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
};

const Luserprofile = () => (
  <Grid container justify="center">
    <Grid item xs={12} sm={10} md={8} lg={6}>
      <Paper style={styles.root}>
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar style={styles.avatar} src={user.photoUrl} alt={user.name} />
          </Grid>
          <Grid item>
            <Typography variant="h4">{user.name}</Typography>
            <Typography variant="subtitle1">
              Member since {user.registrationDate.toLocaleDateString()}
            </Typography>
            <Typography variant="body1">{user.bio}</Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  </Grid>
);

export default Luserprofile;
