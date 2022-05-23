import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { getData } from "../api/BaseApi";
import { CountryListOtherProps } from "../components/country-select";
import { LanguageListProps } from "../components/language-select";

interface CountryListProps {
  readonly current: CountryListOtherProps;
  readonly others: CountryListOtherProps[];
}

const CountrySelectContext = createContext<{
  selectCountryHandle: (text: string | number) => void;
  countryList: CountryListProps | undefined;
  languageList: LanguageListProps | undefined;
}>({
  selectCountryHandle: (text: string | number) => {},
  countryList: undefined,
  languageList: undefined,
});

interface CountrySelectContextProviderProps {
  readonly children: React.ReactNode;
}

export function CountrySelectContextProvider({
  children,
}: CountrySelectContextProviderProps) {
  const [countryList, setCountryList] = useState<CountryListProps | undefined>(
    undefined
  );
  const [languageList, setLanguageList] = useState<LanguageListProps | any>([]);
  const { push, asPath, pathname, locale } = useRouter();
  const currentCountry =
    typeof window !== "undefined" && localStorage.getItem("country_code");
  const selectedCountry =
    currentCountry !== "undefined" && currentCountry !== null
      ? currentCountry
      : "";

  useEffect(() => {
    getData("/countries/languages/?", locale, selectedCountry)
      .then((res) => {
        setLanguageList(res.data);
      })
      .catch((err) => console.log(err));
    getData("/countries/list/?", "en", selectedCountry)
      .then((res) => {
        setCountryList(res.data);
      })
      .catch((err) => console.log(err));
  }, [selectedCountry, locale]);

  useEffect(() => {
    const currLang = localStorage.getItem("language_code");

    const selectedLang =
      currLang !== "undefined" && currLang !== null
        ? currLang
        : languageList?.current?.code;

    if (selectedCountry) {
      push(`${pathname}?country=${currentCountry}`, asPath, {
        shallow: true,
        locale: selectedLang,
      });
    } else {
      localStorage.setItem("country_code", `${countryList?.current.code}`);
      localStorage.setItem("language_code", `${selectedLang}`);
      push(`${pathname}?country=${countryList?.current.code}`, asPath, {
        shallow: true,
        locale: selectedLang,
      });
    }
  }, [countryList, selectedCountry]);

  function selectCountryHandle(text: string | number) {
    localStorage.setItem("country_code", `${text}`);
    push(`${pathname}?country=${text}`);
  }

  const context = { selectCountryHandle, countryList, languageList };

  return (
    <CountrySelectContext.Provider value={context}>
      {children}
    </CountrySelectContext.Provider>
  );
}

export default CountrySelectContext;
