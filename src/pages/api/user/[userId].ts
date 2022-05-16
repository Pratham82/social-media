import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "utils/dbConnect";
import { success, error } from "utils/resHandler";
import User from "models/user.model";

connectDB();

const getUserById = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { userId } = req.query;
    const user = await User.findById(userId).select("-password");
    if (!user) throw new Error("User not found");
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
      await getUserById(req, res);
      break;
    case "UPDATE":
      break;
    case "DELETE":
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
