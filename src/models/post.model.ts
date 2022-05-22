import mongoose from "mongoose";
import { schemaOptions } from "utils/mongooseOptions";

const PostSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    postContent: {
      type: String,
      required: true,
      trim: true,
    },
    postImage: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  schemaOptions,
);

const Post = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default Post;
