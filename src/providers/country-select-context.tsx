import { useRouter } from "next/router";
import { createContext } from "react";

const CountrySelectContext = createContext({
  selectCountryHandle: (text: string | number) => {},
});

interface CountrySelectContextProviderProps {
  readonly children: React.ReactNode;
}

export function CountrySelectContextProvider({
  children,
}: CountrySelectContextProviderProps) {
  const router = useRouter();

  function selectCountryHandle(text: string | number) {
    localStorage.setItem("country_code", `${text}`);
    router.push(`${router.pathname}?country=${text}`);
  }

  const context = { selectCountryHandle };

  return (
    <CountrySelectContext.Provider value={context}>
      {children}
    </CountrySelectContext.Provider>
  );
}

export default CountrySelectContext;
