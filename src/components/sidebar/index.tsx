import { sidebarData } from "assets/data";
import { LogoutIcon, PlusIcon, CloseIcon, ImageIcon } from "assets/svg/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, Fragment } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout, uploadUserImage } from "redux/features/user/slice/user.slice";
import { AppDispatch, RootState } from "redux/store";
import { validateResponse } from "utils/resHandler";
import { Dialog, Transition } from "@headlessui/react";
import IconContainer from "components/icon-container";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { createPost } from "redux/features/post/post.slice";
import { ISidebarItem } from "../../../types";

const Sidebar: React.FC = (): JSX.Element => {
  const router = useRouter();
  const [imageFile, setImageFile] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { currentUser } = useSelector((state: RootState) => state.user);

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

  const editProfileValidations = Yup.object().shape({
    bio: Yup.string().min(10, "Bio too short!").max(160, "Too Long!"),
    postContent: Yup.string()
      .min(10, "Post content too short!")
      .max(160, "Post limit exceeded Long!"),
  });
  const editProfileOptions = { resolver: yupResolver(editProfileValidations) };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(editProfileOptions);

  const handleOnChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent: any) =>
      setImageFile(onLoadEvent.target.result);

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleClose = () => {
    setIsOpen(false);
    setImageFile("");
    reset();
  };

  const handleCreatePost = async (data: any) => {
    try {
      const { payload: newImageUrl } = await dispatch(
        uploadUserImage(imageFile),
      );
      const postPayload = newImageUrl
        ? { ...data, id: currentUser.id, postImage: newImageUrl }
        : { ...data, id: currentUser.id };
      await dispatch(createPost(postPayload));
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
    handleClose();
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
                    "font-extrabold dark:hover:text-white"
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
            <li
              className="my-1 flex translate-x-1 cursor-pointer rounded-full bg-gray-200 py-3 px-3 transition duration-500 dark:bg-white dark:text-black"
              role="presentation"
              onClick={() => {
                setIsOpen(true);
                reset();
              }}
            >
              <PlusIcon />
              <span className="hidden px-4 md:block" title="Create Post">
                Create Post
              </span>
            </li>
          </ul>
          <div className="sticky mt-auto px-4 md:block" />
        </nav>
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={handleClose}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-slate-600 bg-opacity-30 dark:bg-blue-300 dark:bg-opacity-30" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-2 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between text-lg font-bold leading-6 text-gray-900 dark:text-gray-50"
                    >
                      <button type="button" onClick={handleClose}>
                        <IconContainer>
                          <CloseIcon />
                        </IconContainer>
                      </button>
                    </Dialog.Title>

                    {/* {STATUS === "PENDING" && <div>Creating post...</div>} */}
                    <div className="mx-2">
                      <article className="flex py-2 dark:border-zinc-800">
                        <div>
                          <Image
                            src={
                              currentUser?.profile_image_url || "/profile.png"
                            }
                            alt="user"
                            width={48}
                            height={48}
                            className="rounded-full"
                          />
                        </div>

                        <textarea
                          className="ml-2 h-32 w-full resize-none outline-none dark:bg-gray-900"
                          {...register("postContent")}
                          placeholder="What's Happening"
                        />
                      </article>
                      <span className="text-red-500">
                        {errors.postContent && errors.postContent.message}
                      </span>

                      {imageFile && (
                        <Image
                          src={imageFile}
                          alt="New post"
                          width={100}
                          height={100}
                          className="relative border"
                        />
                      )}
                      <div className="flex justify-between">
                        <label
                          htmlFor="imageFile"
                          className="cursor-pointer self-end "
                        >
                          <div className="rounded-md border border-gray-700 bg-gray-200 p-1 dark:bg-gray-600">
                            <ImageIcon />
                          </div>
                          <input
                            type="file"
                            id="imageFile"
                            accept=".png,.jpeg,.jpg"
                            className="hidden"
                            onChange={(e: any) => {
                              handleOnChange(e);
                            }}
                          />
                        </label>
                        <button
                          type="button"
                          className="ml-auto mt-1 mr-2 rounded-2xl border border-gray-500 py-1 px-3 text-sm font-bold transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                          onClick={handleSubmit(handleCreatePost)}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </aside>
    </div>
  );
};

export default Sidebar;
