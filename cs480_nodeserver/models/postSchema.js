const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    title: String,
    body: String
  },
  {
    collection: "Post"
  }
);

module.exports = mongoose.model("Post", PostSchema);
