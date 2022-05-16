import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "utils/dbConnect";
import { success, error } from "utils/resHandler";
import User from "models/user.model";

connectDB();

const getAllUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const users = await User.find({})
      .select("-password")
      .sort({ createdAt: -1 });
    const userCount = await User.countDocuments();

    if (!users) throw new Error("Users not found");

    success(res, { users, count: userCount });
  } catch (err: any) {
    error(res, err);
  }
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "GET":
      await getAllUsers(req, res);
      break;
    case "UPDATE":
      break;
    case "DELETE":
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
