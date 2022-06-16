const Post = require('../models/post');
const catchAsynErrors = require('../middlewares/catchAsynErrors')
const ErrorHandler = require('../utils/errorHandler')


// create new post by user => /api/v1/post/new
exports.newPost = catchAsynErrors(async (req, res, next) => {

  const {
        title,
        description
    } = req.body;

    const post = await Post.create({
      title,
      description,
      user: req.user._id,
  });

    res.status(200).json({
        success: true,
        post
    });

});



//Get post by user => /api/v1/post/me
exports.getPost = catchAsynErrors(async (req, res, next) => {
  
  const posts = await Post.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    posts,
  });
});



//Update post by post id => /api/v1/post/:id
exports.updatePost = catchAsynErrors(async (req, res, next) => {

  let post = await Post.findById(req.params.id);
  
  if (!post) {
    return next(new ErrorHandler("post not found", 404));
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
    post,
  });
});


//Delete post by post id => /api/v1/post/:id
exports.deletePost = catchAsynErrors(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return next(new ErrorHandler("Post not found", 404));
  }

  await post.remove();

  res.status(200).json({
    success: true,
    message: "Post is deleted.",
  });
});


