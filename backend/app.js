const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("backend/images")));


mongoose.connect('mongodb+srv://jacquesvanluyck:jidI3575MUN0d7rd@cluster0.odan7pd.mongodb.net/node-angular').then(() => {
  console.log('Connected to Database')
}).catch(() => {
  console.log('Connection failed');
})

app.use((request, result, next) => {
  result.setHeader("Access-Control-Allow-Origin", "*");
  result.setHeader("Access-Control-Allow-Headers", "Origin, X-Request-With, Content-Type, Accept, Authorization");
  result.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
