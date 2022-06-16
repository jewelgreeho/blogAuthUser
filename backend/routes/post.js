const express = require('express');
const router = express.Router();


const {
    getPost,
    newPost,
    updatePost,
    deletePost
} = require('../controllers/postController')


const { isAuthenticatedUser } = require("../middlewares/auth");


//below post route url with Authentication
router.route("/post/new").post(isAuthenticatedUser, newPost);
router.route('/post/me').get(isAuthenticatedUser, getPost);
router.route('/post/:id')
    .put(isAuthenticatedUser, updatePost)
    .delete(isAuthenticatedUser, deletePost);


module.exports = router;