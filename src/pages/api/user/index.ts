import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "utils/dbConnect";
import { success, error } from "utils/resHandler";
import User from "models/user.model";

connectDB();

const getUserByEmailId = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email } = req.body;
    const user = await User.find({ email }).select("-password");
    if (user.length === 0) throw new Error("User not found");
    success(res, user);
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
      await getUserByEmailId(req, res);
      break;
    case "UPDATE":
      break;
    case "DELETE":
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
