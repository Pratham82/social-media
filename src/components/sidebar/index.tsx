import { sidebarData } from "assets/data";
import LogoutIcon from "assets/svg/icons/logout";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { logout } from "redux/features/user/slice/user.slice";
import { AppDispatch } from "redux/store";
import { validateResponse } from "utils/resHandler";
import { ISidebarItem } from "../../../types";

const Sidebar: React.FC = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = async () => {
    try {
      const res = await dispatch(logout());
      if (!validateResponse(res)) {
        router.push("/login");
      }
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="sm:flex lg:flex-1">
      <aside className="ml-auto h-full">
        <nav className="flex h-full flex-col pr-10 md:pr-40">
          <ul className="fixed py-2 px-2">
            {sidebarData.map(({ id, title, link, icon }: ISidebarItem) => (
              <Link href={link} key={id}>
                <li
                  className={`my-1 flex translate-x-1 cursor-pointer rounded-full py-3 px-3 transition duration-500 hover:bg-gray-200
                  dark:hover:bg-gray-700 ${
                    router.pathname === link &&
                    "bg-gray-200 font-semibold text-black dark:hover:text-white"
                  }`}
                >
                  {icon}
                  <span className="hidden px-4 md:block" title={title}>
                    {title}
                  </span>
                </li>
              </Link>
            ))}
            <li
              className="my-1 flex translate-x-1 cursor-pointer rounded-full py-3 px-3 transition duration-500 hover:bg-gray-200 dark:hover:bg-gray-800"
              role="presentation"
              onClick={handleLogout}
            >
              <LogoutIcon />
              <span className="hidden px-4 md:block" title="Logout">
                Logout
              </span>
            </li>
          </ul>
          <div className="sticky mt-auto px-4 md:block" />
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
