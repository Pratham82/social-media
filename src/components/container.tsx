import Head from "next/head";
import styled from "styled-components";
import tw from "twin.macro";
import Sidebar from "./sidebar";
import { IChildrenProps, IContainerProps } from "../../types";

const Main = styled.main<IChildrenProps>`
  ${tw`border border-gray-200 dark:border-gray-800`}
  ${tw`min-w-[100vw] sm:min-w-[600px] sm:max-w-2xl lg:max-w-5xl min-h-screen`}
  ${tw`pt-16 z-[4]`}
`;

const Container: React.FC<IContainerProps> = ({
  children,
  title,
}: IContainerProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex h-screen sm:flex">
        <Sidebar />
        <div className="border-gray-200 dark:border-zinc-800">
          <header className="fixed w-[600px] border border-gray-200 py-[1.1rem] px-4 text-xl font-bold backdrop-blur-2xl dark:border-gray-800 dark:backdrop-blur-lg">
            {title}
          </header>
          {/* <main className="min-h-full w-full flex-1 border border-gray-200 px-4 dark:border-zinc-800 sm:min-w-[600px] sm:max-w-2xl lg:max-w-5xl ">
            {children}
          </main> */}
          <Main>{children}</Main>
        </div>
        <div className="hidden md:flex  md:flex-1" />
        {/* Fav</div> */}
      </div>
    </>
  );
};

export default Container;
