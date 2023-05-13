const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const Post = require('./models/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


mongoose.connect('mongodb+srv://jacquesvanluyck:jidI3575MUN0d7rd@cluster0.odan7pd.mongodb.net/node-angular').then(() => {
  console.log('Connected to Database')
}).catch(() => {
  console.log('Connection failed');
})

app.use((request, result, next) => {
  result.setHeader("Access-Control-Allow-Origin", "*");
  result.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  result.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.post("/api/posts", (request, response, next) => {
  const post = new Post({
    title: request.body.title,
    content: request.body.content
  });
  post.save();
  response.status(201).json({ message: 'Post added successfully' });
});

app.get('/api/posts', (request, response, next) => {
  Post.find().then(documents => {
    response.status(200).json({
      message: 'Posts fetched succesfully!',
      posts: documents
    });
  });

  ;
});

module.exports = app;
