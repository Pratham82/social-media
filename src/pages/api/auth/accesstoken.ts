import { NextApiRequest, NextApiResponse } from "next";
import { success, error } from "utils/resHandler";
import { verifyToken } from "../../../utils/tokenHelper";

const accessToken = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { token } = req.body;
    const verifyUser = verifyToken(token);
    success(res, verifyUser);
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
