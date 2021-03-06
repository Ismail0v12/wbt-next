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

function MyApp({ Component, pageProps }: AppProps) {
  return (
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
  );
}

export default MyApp;
