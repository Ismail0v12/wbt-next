import { useRouter } from "next/router";
import React, { createContext } from "react";
import useSWR from "swr";
import { getData } from "../api/BaseApi";

const ShareLinksContext = createContext({
  shareLinks: [],
});

interface ShareLinksContextProviderProps {
  readonly children: React.ReactNode;
}

export function ShareLinksContextProvider({
  children,
}: ShareLinksContextProviderProps) {
  const { locale } = useRouter();
  const { data } = useSWR("/share-links/?", (url) =>
    getData(url, locale || "en", locale || "it")
  );

  const context = { shareLinks: data?.data };
  return (
    <ShareLinksContext.Provider value={context}>
      {children}
    </ShareLinksContext.Provider>
  );
}

export default ShareLinksContext;
