const express = require('express');
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use((request, result, next) => {
  result.setHeader("Access-Control-Allow-Origin", "*");
  result.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept");
  result.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.post("/api/posts", (request, response, next) => {
  const posts = request.body;
  console.log(posts);
  response.status(201).json({message: 'Post added successfully'});
});

app.get('/api/posts', (request, response, next) => {
  const posts = [
    {
      id: '123456',
      title: 'First server side post',
      content: 'first serverside content'
    },
    {
      id: '23456',
      title: 'Second Post',
      content: 'second content'
    }

  ];
  response.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;
