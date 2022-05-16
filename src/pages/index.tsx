import Button from "components/button";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  return (
    <div className="flex min-h-full flex-col items-center justify-center">
      <Head>
        <title>Nexus Social</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen w-full flex-col md:flex-row">
        <div className="flex-1 bg-[url('https://abs.twimg.com/sticky/illustrations/lohp_en_1302x955.png')]">
          a
        </div>
        <div className="flex flex-1 flex-col items-center justify-center ">
          <h1 className="pb-10 font-lato text-4xl font-bold">Nexus Social</h1>
          <h2 className="pb-3 font-lato text-2xl">
            See What&apos;s Happening in the World 🌎
          </h2>
          <h3 className="pb-10">And connect with People 🫂 </h3>
          <Button.Filled
            size="xl"
            rounded
            onClick={() => router.push("/signup")}
          >
            Join Now
          </Button.Filled>
          <p className="mt-6 pb-4 font-semibold text-blue-500 dark:text-white">
            <Link href="/login">Already a member ? </Link>
          </p>
          <Button.Outline
            size="xl"
            rounded
            onClick={() => router.push("/login")}
          >
            Sign In
          </Button.Outline>
        </div>
      </main>
    </div>
  );
};

export default Home;
