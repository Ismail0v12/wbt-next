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
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-221444830-1">
        </script>
      <script async>
        const dataLayer = window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'UA-221444830-1');
      </script>
      </body>
    </Html>
  );
}

export default MyDocument;
