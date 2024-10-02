import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import "../app/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
