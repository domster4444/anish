const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
  {
    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "Please add a school"],
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },

    attachment: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("JPT", postSchema);

module.exports = Post;
