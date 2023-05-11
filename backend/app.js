const express = require('express');


const app = express();

app.use((request, result, next) => {
  result.setHeader("Access-Control-Allow-Origin", "*");
  result.setHeader("Access-Control-Allow-Header", "Origin, X-Request-With, Content-Type, Accept");
  result.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});


app.use('/api/posts', (request, response, next) => {
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
