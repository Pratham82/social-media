import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "next-themes";
import ThemeChanger from "components/themeToggler";
import { Provider } from "react-redux";
import { store } from "redux/store";
import { Toaster } from "react-hot-toast";
import UserProvider from "components/UserProvider";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <UserProvider>
          <ThemeChanger />
          <Toaster position="bottom-left" />
          <Component {...pageProps} />
        </UserProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
