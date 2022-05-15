import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "redux/hooks";
import { AppDispatch, RootState } from "redux/store";
import { getToken } from "utils/tokenHelper";
import { verifyToken } from "redux/features/user/slice/user.slice";
import { validateResponse } from "utils/resHandler";
import { IChildrenProps } from "../../types";

const UserProvider = ({ children }: IChildrenProps) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { data } = useAppSelector((state: RootState) => state.user);

  useEffect(() => {
    const check = async () => {
      if (Object.keys(data).length <= 0) {
        const response = await dispatch(verifyToken(getToken()));
        if (validateResponse(response)) {
          router.push("/");
        }
      }
    };
    check();
  }, []);
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
};

export default UserProvider;
