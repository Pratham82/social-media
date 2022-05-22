import { postIcons } from "assets/data";
import OptionIcon from "assets/svg/icons/option";
import Container from "components/container";
import IconContainer from "components/icon-container";
import Image from "next/image";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/post/post.slice";
import { AppDispatch, RootState } from "redux/store";
import moment from "moment";
import { IPostItem } from "../../../types";

const Home: React.FC = (): JSX.Element => {
  const { posts, STATUS } = useSelector((state: RootState) => state.posts);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div>
      <Container title="Home">
        {STATUS === "PENDING" && <div>Loading posts...</div>}
        {STATUS === "FULFILLED" &&
          posts &&
          posts.map(
            ({
              _id,
              createdAt,
              createdBy: { fullName, profile_image_url },
              postContent,
              postImage,
              likes,
              comments,
            }: any) => (
              <article
                key={_id}
                className="flex border-t border-b border-gray-200 px-4 py-2 dark:border-zinc-800"
              >
                <div>
                  <Image
                    src={profile_image_url || "/profile.png"}
                    alt="user"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                </div>
                <section className="flex grow">
                  <div className="max-w-lg grow flex-col pl-4">
                    <h3 className="text-md flex justify-between font-bold">
                      <p>
                        {fullName}
                        <span className="pl-1 text-sm font-normal text-gray-500  dark:text-gray-400">
                          {moment(createdAt).fromNow()}
                        </span>
                      </p>
                      {/* <IconContainer> */}
                      <OptionIcon />
                      {/* </IconContainer> */}
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
                              {id === 1
                                ? comments.length
                                : id === 2
                                ? likes.length
                                : 0}
                            </span>{" "}
                          </div>
                        </IconContainer>
                      ))}
                    </div>
                  </div>
                </section>
              </article>
            ),
          )}
      </Container>
    </div>
  );
};

export default Home;
