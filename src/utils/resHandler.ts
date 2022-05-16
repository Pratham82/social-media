import { NextApiResponse } from "next";

const success = (
  res: NextApiResponse,
  data: any,
  message: string = "Successfully fetched",
) => {
  res.status(200).json({ message, data, success: true });
};
const error = (res: NextApiResponse, err: Error, status: number = 400) => {
  res.status(status).json({ message: err.message, success: false });
};

const validateResponse = (res: object) =>
  Object.prototype.hasOwnProperty.call(res, "error");

export { success, error, validateResponse };
