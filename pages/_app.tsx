import { NextUIProvider, createTheme } from "@nextui-org/react";
import type { AppProps } from "next/app";
import "../styles/globals.css";

const darkTheme = createTheme({type: "light"});

function MyApp({ Component, pageProps }: AppProps) {
  // 2. Use at the root of your app
  return (
      <NextUIProvider theme={darkTheme}>
          <Component {...pageProps} />
      </NextUIProvider>
  );
}

export default MyApp;