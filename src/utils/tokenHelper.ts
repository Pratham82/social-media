import jwt from "jsonwebtoken";

const tokenGenerator = (data: any) => {
  const token = jwt.sign(data, process.env.SECRET_KEY as string, {
    expiresIn: "2h",
  });
  return token;
};

const verifyToken = (token: any) => {
  const verifiedToken = jwt.verify(token, process.env.SECRET_KEY as string);
  return verifiedToken;
};

const setToken = (token: string) => {
  return window.localStorage.setItem("token", token);
};

const getToken = () => {
  const token = window.localStorage.getItem("token");
  return token;
};

const deleteToken = () => {
  return window.localStorage.setItem("token", "");
};
export { verifyToken, tokenGenerator, setToken, getToken, deleteToken };
