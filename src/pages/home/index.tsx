import { postIcons } from "assets/data";
import OptionIcon from "assets/svg/icons/option";
import Container from "components/container";
import IconContainer from "components/icon-container";
import Image from "next/image";
import { IPostItem } from "../../../types";

const Home: React.FC = (): JSX.Element => {
  return (
    <div>
      <Container title="Home">
        {Array(10)
          .fill(0)
          .map(() => (
            <article
              key={Math.random()}
              className="flex border-t border-gray-200 px-4 py-2 dark:border-zinc-800"
            >
              <div>
                <Image
                  src="https://i.pravatar.cc/300"
                  alt="user"
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              </div>
              <section className="flex">
                <div className="max-w-lg grow flex-col pl-4">
                  <h3 className="text-md flex justify-between font-bold">
                    <span>User {(Math.random() * 100).toFixed(0)}</span>
                    <IconContainer>
                      <OptionIcon />
                    </IconContainer>
                  </h3>
                  <p>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s
                  </p>
                  <div className="flex w-full justify-between">
                    {postIcons.map(({ id, icon }: IPostItem) => (
                      <IconContainer key={id}>{icon}</IconContainer>
                    ))}
                  </div>
                </div>
              </section>
            </article>
          ))}
      </Container>
    </div>
  );
};

export default Home;
