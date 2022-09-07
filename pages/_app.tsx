import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import { MetaMaskProvider } from "metamask-react";

import {
  TranslationContextProvider,
  AuthenticationContextProvider,
  ContactLinksContextProvider,
  ShareLinksContextProvider,
  CountrySelectContextProvider,
} from "../src/providers";
import "react-toastify/dist/ReactToastify.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "../src/styles/bootstrap-grid.min.css";
import "../src/styles/bootstrap-reboot.min.css";
import "../src/styles/auth-layout.css";
import "../src/styles/styles.css";
import "../src/styles/ui.css";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="keywords"
          content="White Bridge Club, white bridge club, whitebridgeclub, club, white, bridge, club whitebridge, wbt token,WBT token, affiliate markteting"
        />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0, minimum-scale=1.0, user-scalable=no target-densitydpi=device-dpi"
        />
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </Head>
      <MetaMaskProvider>
        <CountrySelectContextProvider>
          <AuthenticationContextProvider>
            <TranslationContextProvider>
              <ContactLinksContextProvider>
                <ShareLinksContextProvider>
                  <NextNProgress
                    color="var(--yellow)"
                    height={3}
                    options={{
                      showSpinner: false,
                      ease: "linear",
                    }}
                  />
                  <Component {...pageProps} />
                  <ToastContainer />
                </ShareLinksContextProvider>
              </ContactLinksContextProvider>
            </TranslationContextProvider>
          </AuthenticationContextProvider>
        </CountrySelectContextProvider>
      </MetaMaskProvider>
    </>
  );
}

export default MyApp;
