import "@/styles/globals.css";
import Header from "@/components/Header";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";
import { FavoriteContextProvider } from "@/context/favoriteContext";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ClerkProvider frontendApi={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API}>
        <FavoriteContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
          <Analytics />
        </FavoriteContextProvider>
      </ClerkProvider>
    </>
  );
}
