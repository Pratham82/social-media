import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "utils/dbConnect";
import { success, error } from "utils/resHandler";
import User from "models/user.model";
import { verify } from "utils/verifyField";
import { generatePassword } from "utils/passwordVerify";

connectDB();

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password, username, confirmPassword, firstName, lastName } =
      req.body;

    const valid = verify({ email, password, confirmPassword, username });
    if (valid) throw new Error(valid);

    const hashPassword = await generatePassword(password);
    const newUser = new User({
      username,
      email,
      firstName,
      lastName,
      password: hashPassword,
    });
    await newUser.save();
    success(res, {}, "User registered SuccessFully");
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
      await Register(req, res);
      break;
    case "GET":
      res.status(200).json({ message: "register rout working" });
      break;

    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
