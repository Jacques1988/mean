const express = require('express');
const PostController = require('../controllers/posts.js');
const checkAuth = require('../middleware/check-auth');
const extractFile = require('../middleware/file.js');
const router = express.Router();



router.put("/:id", checkAuth, extractFile, PostController.updatePost);

router.post("", checkAuth, extractFile, PostController.createPost);

router.get('', PostController.getPosts);

router.get("/:id", PostController.getPost)

router.delete("/:id", checkAuth, PostController.deletePost );

module.exports = router;
