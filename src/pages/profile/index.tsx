import Container from "components/container";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "redux/store";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import IconContainer from "components/icon-container";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import LinkIcon from "assets/svg/icons/link";
import toast from "react-hot-toast";
import {
  updateUser,
  uploadUserImage,
} from "redux/features/user/slice/user.slice";
import { CloseIcon, UploadIcon } from "assets/svg/icons";

const Profile: React.FC = (): JSX.Element => {
  const { currentUser, STATUS } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [imageFile, setImageFile] = useState(currentUser.profile_image_url);
  const [isOpen, setIsOpen] = useState(false);

  const editProfileValidations = Yup.object().shape({
    bio: Yup.string().min(10, "Bio too short!").max(160, "Too Long!"),
    url: Yup.string()
      .required("Website link is required")
      .url("Please enter valid url")
      .max(100, "Website link Long!"),
  });
  const editProfileOptions = { resolver: yupResolver(editProfileValidations) };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(editProfileOptions);

  const handleOnChange = (changeEvent: any) => {
    const reader = new FileReader();

    reader.onload = (onLoadEvent: any) =>
      setImageFile(onLoadEvent.target.result);

    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  const handleEditProfile = async (data: any) => {
    try {
      const { payload: newImageUrl } = await dispatch(
        uploadUserImage(imageFile),
      );
      if (newImageUrl)
        await dispatch(
          updateUser({
            ...data,
            profile_image_url: newImageUrl,
            id: currentUser.id,
          }),
        );
      toast.success("Profile updated successfully");
    } catch (err: any) {
      toast.error(err.message);
    }
    setIsOpen(false);
  };

  return (
    <div>
      <Container title="Profile">
        {STATUS === "PENDING" && (
          <div className="my-auto mx-auto h-full border">Loading...</div>
        )}
        {currentUser && (
          <div className="">
            <div className="h-[200px]">
              <Image
                src="/profile-bg.jpg"
                alt="profile"
                width="600px"
                height="200px"
                className="object-cover object-center"
              />
              <div className="flex">
                <button
                  type="button"
                  onClick={() => setIsOpen(true)}
                  className="ml-auto mt-1 mr-2 rounded-2xl border border-gray-500 py-1 px-3 text-sm font-bold transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-900"
                >
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="mx-3 mb-3 mt-[-50px] flex justify-between rounded-full">
              <Image
                src={currentUser?.profile_image_url || "/profile.png"}
                alt={currentUser?.fullName}
                width={100}
                height={100}
                className="rounded-full"
              />
            </div>
            <div className="mx-4">
              <p className="text-lg font-semibold">{currentUser?.fullName}</p>
              <p className="pt-[0px] text-sm text-gray-500">
                {currentUser?.username}
              </p>
              <p className="text-sm">{currentUser?.bio}</p>
              <p className="flex items-center text-sm">
                {currentUser?.url && (
                  <>
                    <span className="scale-75">
                      <LinkIcon />
                    </span>
                    <a
                      href={currentUser?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-400"
                    >
                      {currentUser?.url}
                    </a>
                  </>
                )}
              </p>
              <div className="flex pt-1 text-sm">
                <p className="pr-2">
                  <span className="pr-1 font-bold">
                    {currentUser?.followers?.length}
                  </span>
                  Followers
                </p>
                <p>
                  <span className="pr-1 font-bold">
                    {currentUser?.following?.length}
                  </span>
                  Following
                </p>
              </div>
            </div>
          </div>
        )}

        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            onClose={() => setIsOpen(false)}
          >
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
                  <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-md bg-white p-4 text-left align-middle shadow-xl transition-all dark:bg-gray-900">
                    <Dialog.Title
                      as="h3"
                      className="flex items-center justify-between text-lg font-bold leading-6 text-gray-900 dark:text-gray-50"
                    >
                      <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        disabled={STATUS === "PENDING"}
                      >
                        <IconContainer>
                          <CloseIcon />
                        </IconContainer>
                      </button>
                      <span className="pl-2">Edit Profile</span>
                      <button
                        type="button"
                        className="ml-auto mt-1 mr-2 rounded-2xl border border-gray-500 py-1 px-3 text-sm font-bold transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-800"
                        onClick={handleSubmit(handleEditProfile)}
                        disabled={STATUS === "PENDING"}
                      >
                        Save
                      </button>
                    </Dialog.Title>
                    {STATUS === "PENDING" && "Updating Profile..."}

                    <div className="mx-4 mt-4">
                      <div className="mb-3 flex justify-between">
                        <Image
                          src={imageFile || currentUser?.profile_image_url}
                          alt={currentUser?.fullName}
                          width={100}
                          height={100}
                          className="relative rounded-full border"
                        />
                        <label
                          htmlFor="imageFile"
                          className="absolute cursor-pointer self-end "
                        >
                          <div className="flex rounded-full border border-gray-700 bg-gray-200 p-1 dark:bg-gray-600">
                            <UploadIcon />
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
                      </div>

                      <label htmlFor="bio" className="flex flex-col pt-3">
                        <span className="pb-1 font-bold">Full Name</span>
                        <input
                          type="text"
                          placeholder="jo1hn_332"
                          className="rounded-md border border-gray-400 px-4 py-2 text-gray-500 outline-none dark:text-gray-400"
                          defaultValue={currentUser?.fullName}
                          disabled
                        />
                      </label>
                      <label htmlFor="bio" className="flex flex-col pt-3">
                        <span className="pb-1 font-bold">Bio</span>
                        <input
                          type="text"
                          placeholder="Pretend this is a good bio"
                          {...register("bio")}
                          defaultValue={currentUser?.bio}
                          className="rounded-md border border-gray-400 px-4 py-2"
                        />
                        <span className="text-red-500">
                          {errors.bio && errors.bio.message}
                        </span>
                      </label>
                      <label htmlFor="url" className="flex flex-col pt-3">
                        <span className="pb-1 font-bold">Website Link</span>
                        <input
                          type="text"
                          placeholder="https://www.johndoe.com"
                          {...register("url")}
                          defaultValue={currentUser?.url}
                          className="rounded-md border border-gray-400 px-4 py-2"
                        />
                        <span className="text-red-500">
                          {errors.url && errors.url.message}
                        </span>
                      </label>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </Container>
    </div>
  );
};

export default Profile;
