/* eslint-disable no-underscore-dangle */
import { NextApiRequest, NextApiResponse } from "next";
import { error, success } from "utils/resHandler";
import User from "models/user.model";
import connectDB from "utils/dbConnect";
import { verifyPassword } from "utils/passwordVerify";
import { tokenGenerator } from "utils/tokenHelper";

connectDB();

const Login = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) throw new Error("All fields are required");

    const userExist = await User.findOne({ email });
    if (!userExist) throw new Error("Wrong credentials");

    const verifyPass = await verifyPassword(password, userExist.password);
    if (!verifyPass) throw new Error("Wrong credentials");
    const token = tokenGenerator({ ...userExist._id });
    success(res, { token, ...userExist._id }, "Successfully logged in");
  } catch (err: any) {
    error(res, err, 401);
  }
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case "POST":
      await Login(req, res);
      break;
    case "GET":
      res.status(200).json({ message: "login rout working" });
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
