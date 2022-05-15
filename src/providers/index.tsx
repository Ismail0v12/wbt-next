import { AuthenticationContextProvider } from "./authentication-context";
import { ContactLinksContextProvider } from "./contact-links-context";
import { ShareLinksContextProvider } from "./share-links-context";
import { TranslationContextProvider } from "./translation-context";
import { UserInfoContextProvider } from "./user-info-context";
import { CountrySelectContextProvider } from "./country-select-context";

if (typeof window !== "undefined") {
  const rootContainer = document.createElement("div");
  const parentElem = document.querySelector("#__next");
  parentElem?.appendChild(rootContainer);
}

export {
  AuthenticationContextProvider,
  ContactLinksContextProvider,
  ShareLinksContextProvider,
  TranslationContextProvider,
  UserInfoContextProvider,
  CountrySelectContextProvider,
};
