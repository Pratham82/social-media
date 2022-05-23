import Post from "models/post.model";
import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "utils/dbConnect";
import { success, error } from "utils/resHandler";
import User from "models/user.model";

connectDB();

const getAllPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const posts = await Post.find().populate("createdBy", {
      username: 1,
      profile_image_url: 1,
      firstName: 1,
      lastName: 1,
    });
    const postsCount = await Post.countDocuments();
    if (!posts) throw new Error("Posts not found");
    success(res, { posts, count: postsCount });
  } catch (err: any) {
    error(res, err);
  }
};

const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, postContent, postImage } = req.body;
    const user = await User.findById({ _id: id });
    if (!user) throw new Error("User not found");
    await Post.create({
      createdBy: id,
      postContent,
      postImage,
    });
    const newPosts = await getAllPosts(req, res);
    success(res, { posts: newPosts });
  } catch (err: any) {
    error(res, err);
  }
};

const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { postId } = req.body;
    const post = await Post.findById({ _id: postId });
    if (!post) throw new Error("Post not found");
    await post.remove();
    const newPosts = await getAllPosts(req, res);
    success(res, { posts: newPosts });
  } catch (err: any) {
    error(res, err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      await createPost(req, res);
      break;
    case "GET":
      await getAllPosts(req, res);
      break;
    case "PUT":
      break;
    case "DELETE":
      await deletePost(req, res);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
