import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "components/themeToggler";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider attribute="class">
      <ThemeChanger />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
