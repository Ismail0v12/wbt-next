import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
import { getData } from "../api/BaseApi";

const TranslationContext = createContext<any>({
  translations: {},
});

interface TranslationContextProviderProps {
  readonly children: React.ReactNode;
}

export function TranslationContextProvider({
  children,
}: TranslationContextProviderProps) {
  const [translations, setTranslations] = useState([]);
  const { locale } = useRouter();

  useEffect(() => {
    getData("/translations/?", locale, "it")
      .then((res) => setTranslations(res.data))
      .catch((err) => console.log(err));
  }, [locale]);

  const context = { translations };
  return (
    <TranslationContext.Provider value={context}>
      {children}
    </TranslationContext.Provider>
  );
}

export default TranslationContext;
