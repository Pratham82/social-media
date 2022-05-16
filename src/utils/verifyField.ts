interface IData {
  email: string;
  password: string;
  confirmPassword?: string;
  username?: string;
}

const emailVerify = (email: string) => {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return re.test(email);
};

const verify = ({ email, password, confirmPassword, username }: IData) => {
  let error;
  if (!username || !password || !email || !confirmPassword)
    error = "Fill all the required Field";
  if (password.length < 6) error = "Enter strong Password";
  if (!emailVerify(email)) error = "Email is not valid";
  if (password !== confirmPassword) error = "Password doesn't match";
  return error;
};

export { verify, emailVerify };
