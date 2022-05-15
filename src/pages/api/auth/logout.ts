import { NextApiRequest, NextApiResponse } from "next";
import { error, success } from "utils/resHandler";

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    success(res, {}, "Successfully logged out");
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
      await logout(req, res);
      break;
    default:
      res.status(405).json({ message: "Method not allowed" });
  }
}
