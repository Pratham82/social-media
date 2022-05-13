import { Html, Head, Main, NextScript } from "next/document";

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head />
      <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&display=swap"
        rel="stylesheet"
      />
      <body className="font-lato">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
