/* eslint-disable @typescript-eslint/naming-convention */
import { postIcons } from "assets/data";
import moment from "moment";
import Image from "next/image";
import { IPostItem, IPostCard } from "types";
import IconContainer from "./icon-container";
import PostActionModal from "./options-menu";

const PostCard: React.FC<IPostCard> = ({
  postData: {
    _id,
    createdAt,
    createdBy,
    postContent,
    postImage,
    likes,
    comments,
  },
}: IPostCard): JSX.Element => {
  return (
    <article
      key={_id}
      className="flex border-t border-b border-gray-200 px-4 py-2 dark:border-zinc-800"
    >
      <div>
        <Image
          src={createdBy?.profile_image_url || "/profile.png"}
          alt="user"
          width={48}
          height={48}
          className="rounded-full"
        />
      </div>
      <section className="flex grow">
        <div className="max-w-lg grow flex-col pl-4">
          <h3 className="text-md relative flex justify-between font-bold">
            <p>
              {createdBy?.fullName}
              <span className="pl-1 text-sm font-normal text-gray-500  dark:text-gray-400">
                {moment(createdAt).fromNow()}
              </span>
            </p>
            <PostActionModal postId={_id} />
          </h3>
          <p>{postContent}</p>
          {postImage && (
            <div className="pt-2">
              <Image
                src={postImage}
                alt="post"
                width={500}
                height={500}
                className="rounded-md"
              />
            </div>
          )}

          <div className="flex w-full justify-between">
            {postIcons.map(({ id, icon }: IPostItem) => (
              <IconContainer key={id}>
                <div className="flex">
                  {icon}{" "}
                  <span className="pl-1">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {id === 1 ? comments?.length : id === 2 ? likes?.length : 0}
                  </span>{" "}
                </div>
              </IconContainer>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

export default PostCard;
