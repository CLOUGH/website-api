import mongoose from "mongoose";
const Schema = mongoose.Schema;


const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    content: String,
    status: String,
    excerpt: String,
    featuredImage: String
  },
  {
    timestamps: true
  });


const Post = mongoose.model("Post", postSchema);
export default Post;
