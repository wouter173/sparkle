import { Head, Html, Main, NextScript } from "next/document";

export default () => {
  return (
    <Html className="bg-body">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <body className="bg-body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};
