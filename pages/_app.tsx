import "@/styles/globals.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
