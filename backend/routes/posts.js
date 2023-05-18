const express = require('express');
const Post = require('../models/post');
const checkAuth = require('../middleware/check-auth');
const multer = require('multer');
const router = express.Router();

const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (request, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const extension = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '.' + extension);
  }
})

router.put(
  "/:id",
  checkAuth,
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagePath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    const post = new Post({
      _id: req.body.id,
      title: req.body.title,
      content: req.body.content,
      imagePath: imagePath
    });
    Post.updateOne({ _id: req.params.id, creator: req.userData.userId }, post).then(result => {
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized at this message!" });
      }
    });
  }
);



router.post("", checkAuth, multer({ storage: storage }).single('image'), (request, response, next) => {
  const url = request.protocol + '://' + request.get('host');
  const post = new Post({
    title: request.body.title,
    content: request.body.content,
    imagePath: url + "/images/" + request.file.filename,
    creator: request.userData.userId
  });
  post.save().then(createdPost => {
    response.status(201).json({
      message: 'Post added successfully',
      post: {
        ...createdPost,
        id: createdPost._id,
      }
    });
  });
});



router.get('', (request, response, next) => {
  const pageSize = +request.query.pagesize;
  const currentPage = +request.query.page;
  const postQuery = Post.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery.then(documents => {
    fetchedPosts = documents;
    return Post.count();
  }).then(count => {
    response.status(200).json({
      message: "Posts fetched successfully!",
      posts: fetchedPosts,
      maxPosts: count
    })
  })
});



router.get("/:id", (request, response, next) => {
  Post.findById(request.params.id).then(post => {
    if (post) {
      response.status(200).json(post);
    } else {
      response.status(404).json({ message: 'Post not found' });
    }
  })
})



router.delete("/:id", checkAuth, (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Post deleted!" });
    } else {
      res.status(401).json({ message: "Not authorized!" });
    }
  })
});

module.exports = router;
