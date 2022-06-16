const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "please enter post title"],
    maxLength: [100, "post title cannnot exceed 100 charcters"],
  },
  description: {
    type: String,
    required: [true, "please enter post description"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
