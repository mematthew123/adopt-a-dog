import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <link rel="shortcut icon" href="/flowerdog.jpg" />
        <link rel="apple-touch-icon" href="/flowerdog.jpg" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:description" content="Adopt a furry friend today" />
        <meta property="og:image" content="/flowerdog.jpg" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="230" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://adoptmt.org/" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
