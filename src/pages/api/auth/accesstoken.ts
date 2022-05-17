import { NextApiRequest, NextApiResponse } from "next";
import { success, error } from "utils/resHandler";
import User from "models/user.model";
import { verifyToken } from "utils/tokenHelper";

const accessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.body;
    const verifyUser: any = verifyToken(token);
    const { id } = verifyUser;
    const user = await User.findById({ _id: id }).select("-password");
    success(res, { user, token });
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
      await accessToken(req, res);
      break;
    default:
      res.status(405).end();
  }
}
