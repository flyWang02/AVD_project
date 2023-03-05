var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const cors = require('cors');
var app = express();
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/testdb');
var sd = require('silly-datetime');

// Introduction of encryption module
const bcrypt = require('bcryptjs')
//Setting the encryption complexity
const salt = bcrypt.genSaltSync(10)


let session = require('express-session')
var cookieSession = require('cookie-session')

var nowuserid = null;
var nowusername =null;

app.use(session({
    name :'connect.sid',
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:1000*60*2,
        httpOnly:true,
    }
  }));

// Import Schema under models file
const Euser =require("./models/Users");
const Book =require("./models/Book");
const storePost =require("./models/Post");
const Comment =require("./models/Comment");
const Post =require("./models/Post");

var Expressjwt=require("express-jwt");
require('dotenv').config()

// Set JWT authentication
app.use(
  Expressjwt
    .expressjwt({
      secret: process.env.SECRET,
      algorithms: ["HS256"],
    })
    .unless({ path: [      
      // The following paths can be used without token
    '/api/book/',
    /\/api\/store/,
    /\/api\/get/,
    /\/api\/delete/,
      /\/api\/user/] })
);

var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'vawfa');


// The path used by the user to register, the username and password will be sent to this path
app.post("/api/user/register/", (req, res, next) => {
  let dist =0;
  let usern=req.body.email;
  let userp=req.body.password;
  // check the length of the user's registration password, if it does not meet the requirements directly return status400, registration failure
  if (userp.length < 8 ||!/[a-z]/.test(userp) ||!/[A-Z]/.test(userp) ||!/[0-9]/.test(userp) ||!/[~`!@#\$%\^&\*\(\)-_\+=\{\}\[\]|\\;:"<>,\.\/\?]/.test(userp)){
      return res.status(400).json('Password is not strong enough')}
  // Look in Euser's database to see if the registered account name already exists in the database
  Euser.findOne({email:usern}, (err,email) => {
      if (err) return next(err);
      // If the user name does not exist in Euser's database, create a new user to the database and set the token and return it to the front-end
      if(!email){
        let hash = bcrypt.hashSync(userp,salt)
          new Euser({
              email:usern,
              password:hash
          }).save((err) => {
              if (err) return next(err);
          });
          // Set token
          const pplayload = {
            email: usern,
          }
          jwt.sign(
            pplayload,
            process.env.SECRET,
            {
              expiresIn: '1day'
            },
            (err, token) => {
              if (err) throw err;
              return res.send({success: true, token});
            });
      }else{
        // If the username already exists in Euser's database, return a faile
        console.log('FAIL')
        return res.status(400).json('Email already in use');
      }
  })
});

// The path used by the user when logging in, to which the username and password will be sent.
app.post("/api/user/login", (req, res) => {

  let usern=req.body.email;
  let userp=req.body.password;
  // The data received from the front-end is put into the Euser database for searching
  Euser.findOne({email:usern}, (err,userrr) => {
      if (err) return next(err);
      if(!userrr){
        // If the user does not exist, return the user not found
        return res.status(401).json({
          success: false,
          retext: "Invalid user",
        });
      }else{
        // If the user exists, the password is compared, and if it is the same, the token is set and returned
          let userid = userrr._id
          let sotrepassword=userrr.password
          let isOk = bcrypt.compareSync(userp,sotrepassword)
          console.log(123,userid);
          if(isOk){
            nowuserid = userid
              const pplayload = {
                  email: usern,
                }
                jwt.sign(
                  pplayload,
                  process.env.SECRET,
                  {
                    expiresIn: '1day'
                  },
                  (err, token) => {
                    if (err) throw err;
                    console.log(userid)
                    return res.send({success: true, token, id:userrr._id});
                  });
              
          }else{
            // If the user exists, the passwords are compared, and if they are not the same, a password error is returned
              return res.status(401).json({
                success: false,
                retext: "Invalid password",
              });
          } 
      }
  })
});


// This path is used to create a new post
app.post("/api/create/posts/", (req, res, next) => {
  // authenticate the token and return unauthorized if it is incorrect
   if(!req.auth.email){
    res.send("unauthorized");
  }

  console.log(req.auth)
  // Receive data and assign values to variables
  let aid=req.body.aid;
  let ttitle=req.body.title;
  let des=req.body.description;
  let det=req.body.details;
  let language = req.body.language
  let day = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  let datee= day
  // Create Post data and save it in Post
  new Post({
      aid:aid,  //author id
      title:ttitle, //post title
      description:des, //post description
      details:det, //code
      eddate:datee, //date
      language:language // language
    }).save((err) => {
      if (err) return next(err);
      return res.send("ok")
    });

});

// This path is used to create a new post
app.post("/api/create/comment/", (req, res, next) => {
   // authenticate the token and return unauthorized if it is incorrect
     if(!req.auth.email){
    res.send("unauthorized");
  }
  // Receive data and assign values to variables
  let pid=req.body.pid;
  let aid=req.body.aid;
  let text=req.body.text;
  let day = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  let datee= day
  // Save the received data in the Comment 
  new Comment({
    Postid:pid, //posts id
    authorid:aid, //author id
    text:text,//Comment
    eddate:datee, //Date
    }).save((err) => {
      if (err) return next(err);
      return res.send("ok")
    });

});

// This path is used to send all post data
app.get("/api/store/posts/", (req, res, next) => {
  Post.find({}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      res.json(data);
    }
  });
});

// This path is used to find a specific post data
app.post("/api/get/post/", (req, res, next) => {
  //lookup_id is the post of the received data
  Post.find({_id:req.body.pid}, (err, data) => {
    console.log(1)
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      console.log(data)
      res.json(data);
    }
  });
});

//Get all comments for a post
app.post("/api/get/comments/", (req, res, next) => {
  //Get all comments whose Postid is req.body.pid
  Comment.find({Postid:req.body.pid}, (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else {
      res.json(data);
    }
  });
});

// Used to send the id of the currently logged in user
app.get("/api/user/id/", (req, res, next) => {
  res.json(nowuserid);
});

// Used to find the data of a particular user
app.get("/api/get/user/", (req, res, next) => {
  const username = "11234@gmail.com";
// Used to find the data whose account 11234@gmail.com
  Euser.findOne({ email:username }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server Error');
    } else if (!user) {
      res.status(404).send('User not found');
    } else {
      res.json(user._id);
      console.log(user._id)
    }
  });
});

// Used to receive data from edited posts and modify the contents of the database
app.post("/api/edit/posts/", (req, res, next) => {
// authenticate the token and return unauthorized if it is incorrect
  if(!req.auth.email){
    res.send("unauthorized");
  }
  console.log(1)

  const postId = req.body.pid;
  const title = req.body.title;
  const description = req.body.description;
  const details = req.body.details;
  let language = req.body.language
  let day = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  let datee= day
  
  Post.findOne({ _id: postId }, (err, foundPost) => {
    if (err) {
      console.error(err);
      res.status(400).send('Internal server error');
      return;
    }
    // Find the data whose _id is postId in Post, modify the title, description, details, language, eddate and save it
    foundPost.title = title;
    foundPost.description = description;
    foundPost.details = details;
    foundPost.language = language;
    foundPost.eddate=datee;
    foundPost.save((err) => {
      if (err) {
        console.error(err);
        res.status(400).send('Internal server error');
        return;
      }
      res.status(200).send({"status": "success edit"})
    });
  });

});

// This port is for the administrator to modify the post data
app.post("/api/user/posts/", (req, res, next) => {

  console.log(1)
  const postId = req.body.pid;
  const title = req.body.title;
  const description = req.body.description;
  const details = req.body.details;
  let language = req.body.language
  let day = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  let datee= day
  // Find the data whose _id is postId in Post, modify the title, description, details, language, eddate and save it
  Post.findOne({ _id: postId }, (err, foundPost) => {
    if (err) {
      console.error(err);
      res.status(400).send('Internal server error');
      return;
    }
    foundPost.title = title;
    foundPost.description = description;
    foundPost.details = details;
    foundPost.language = language;
    foundPost.eddate=datee;
    foundPost.save((err) => {
      if (err) {
        console.error(err);
        res.status(400).send('Internal server error');
        return;
      }
      res.status(200).send({"status": "success edit"})
    });
  });

});


// This port is used by users to modify the comment
app.post("/api/edit/comment/", (req, res, next) => {
  // authenticate the token and return unauthorized if it is incorrect
  if(!req.auth.email){
    res.send("unauthorized");
  }
  console.log(1)
  const cid = req.body.pid;
  const title = req.body.title;
  let day = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  let datee= day
  //find the comment whose _id is cid, change the text and edit time of the comment
  Comment.findOne({ _id: cid }, (err, foundPost) => {
    if (err) {
      console.error(err);
      res.status(400).send('Internal server error');
      return;
    }
    foundPost.text = title;
    foundPost.eddate = datee;
    foundPost.save((err) => {
      if (err) {
        console.error(err);
        res.status(400).send('Internal server error');
        return;
      }
      res.status(200).send({"status": "success edit"})
    });
  });

});

// This path is for the administrator to edit all comments
app.post("/api/user/comment/", (req, res, next) => {
  const cid = req.body.pid;
  const title = req.body.title;
  let day = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
  let datee= day
  //find the comment whose _id is cid, change the text and edit time of the comment
  Comment.findOne({ _id: cid }, (err, foundPost) => {
    if (err) {
      console.error(err);
      res.status(400).send('Internal server error');
      return;
    }
    foundPost.text = title;
    foundPost.eddate = datee;
    foundPost.save((err) => {
      if (err) {
        console.error(err);
        res.status(400).send('Internal server error');
        return;
      }
      res.status(200).send({"status": "success edit"})
    });
  });

});

// This path is for administrators to delete comments
app.post("/api/delete/comment/", (req, res, next) => {
  
  const comid = req.body.pid;
  console.log(comid)
  // Query the comments whose _id is comid, then delete them
  Comment.findOneAndDelete({_id:comid}, function (err, doc) {
    if (err) throw err;
    console.log(`Deleted ${doc}`);
    res.status(200).send({"status": "success delete"})
  });
  
});


//This path is for the administrator to delete the post
app.post("/api/delete/post/", (req, res, next) => {
  const pid = req.body.pid;
// Query Post in which _id is pid, then delete
  Post.findOneAndDelete({_id:pid}, function (err, doc) {
    if (err) throw err;
    console.log(`Deleted ${doc}`);
    res.status(200).send({"status": "success delete"})
  });
  
});

// This path is for the administrator to delete all comments contained in the post when the post is deleted.
app.post("/api/delete/postcomment/", (req, res, next) => {
  const pid = req.body.pid;
// Query comments where Postid is pid, then delete
  Comment.deleteMany({Postid:pid}, function (err, doc) {
    if (err) throw err;
    console.log(`Deleted ${doc}`);
    res.status(200).send({"status": "success delete"})
  });
  
});

// This path is a query for the description keyword
app.post("/api/get/keyword/", (req, res, next) => {
  const searchQuery = req.body.keyword; // get search keyword from query string
  const searchRegex = new RegExp(searchQuery, 'i'); // create case-insensitive regex pattern
  Post.find({ description: searchRegex }, (err, posts1) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      res.json(posts1);
    }
  });
});










module.exports = app;
