import { Menu, Transition } from "@headlessui/react";
import { DeleteIcon, EditIcon, OptionIcon } from "assets/svg/icons";
import { Fragment } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deletePost } from "redux/features/post/post.slice";
import { AppDispatch } from "redux/store";
import { IDropDownProps } from "types";

const PostActionModal: React.FC<IDropDownProps> = ({
  postId,
}: IDropDownProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const handleDeletePost = async () => {
    try {
      await dispatch(deletePost({ postId }));
    } catch (err: any) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Menu>
      <Menu.Button className="relative translate-x-1 scale-90 cursor-pointer rounded-full p-1 transition duration-300 hover:bg-gray-200 dark:hover:bg-gray-700">
        <OptionIcon />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-[5] mt-2 w-28 origin-top-right divide-y divide-gray-100 rounded-md border bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:border-zinc-600 dark:bg-gray-900">
          <div className="px-1 py-1 ">
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active && "font-bold"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm text-red-600`}
                  onClick={handleDeletePost}
                >
                  <div className="scale-90">
                    <DeleteIcon />
                  </div>
                  <span className="pl-2">Delete</span>
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  type="button"
                  className={`${
                    active && "font-bold"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                >
                  <div className="scale-75">
                    <EditIcon />
                  </div>
                  <span className="pl-2">Edit</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostActionModal;
