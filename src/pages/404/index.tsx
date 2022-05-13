import Container from "components/container";
import Link from "next/link";
import { useRouter } from "next/router";

const Custom404: React.FC = (): JSX.Element => {
  const { asPath } = useRouter();
  return (
    <Container title="404">
      <div className="flex items-center">
        <div
          className="mx-6 mt-10 w-full rounded-md bg-gray-100 py-8 px-10 shadow-md dark:bg-gray-800 md:px-14
      "
        >
          <h1 className="pb-4 text-center text-2xl font-bold">404</h1>
          <p className="pb-4 text-center">
            The <span className="font-bold underline">{asPath.slice(1)}</span>{" "}
            page does not exist.
          </p>
          <p className="text-center">
            Go back to{" "}
            <Link href="/">
              <span className="cursor-pointer pl-1 font-bold text-blue-500 hover:underline">
                Home
              </span>
            </Link>
          </p>
        </div>
      </div>
    </Container>
  );
};

export default Custom404;
