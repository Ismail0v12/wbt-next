import { Head, Html, Main, NextScript } from "next/document";
import Script from "next/script";
function MyDocument() {
  return (
    <Html>
      <Head>
        <meta
          name="description"
          content="Meta description content goes here."
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-221444830-1"
        />
        <script>
          {`
            window.dataLayer = window.dataLayer || []; 
            function gtag() {window.dataLayer.push(arguments)}
            gtag("js", new Date()); gtag("config", "UA-221444830-1");
          `}
        </script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

export default MyDocument;
