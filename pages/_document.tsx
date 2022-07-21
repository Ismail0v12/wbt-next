import { Head, Html, Main, NextScript } from "next/document";
function MyDocument() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Meta description content goes here."
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
