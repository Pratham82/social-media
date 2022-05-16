export const getTotalPages = (posts: any) => Math.ceil(posts / 10);

export const getPaginationArr = (pages: any) => Array(pages).fill(0);

export const handleErrors = (res: any) => {
  const { message } = res.payload.response.data;
  const errType = message.split("{")[1].trim().split(":")[0];
  let errorMessage = "";

  switch (errType) {
    case "email":
      errorMessage = "Email already exist, please try another one";
      break;
    case "username":
      errorMessage = "Username already exist, please try another one";
      break;
    default:
      errorMessage = "Something went wrong";
  }

  return {
    errorMessage,
  };
};
