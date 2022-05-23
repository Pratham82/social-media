import Container from "components/container";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPosts } from "redux/features/post/post.slice";
import { AppDispatch, RootState } from "redux/store";
import PostCard from "components/post-card";
import { IPostCardProps } from "types";

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
          posts.map((postData: IPostCardProps) => (
            // eslint-disable-next-line no-underscore-dangle
            <PostCard postData={postData} key={postData._id} />
          ))}
      </Container>
    </div>
  );
};

export default Home;
