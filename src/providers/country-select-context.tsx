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
  selectedCountry: string | false;
}>({
  selectCountryHandle: (text: string | number) => {},
  countryList: undefined,
  languageList: undefined,
  selectedCountry: "",
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
  const { push, asPath, pathname, locale, query } = useRouter();

  const currLang =
    typeof window !== "undefined" && localStorage.getItem("language_code");
  const countryCode = query.country ? query.country : countryList?.current.code;
  const selectedCountry = countryCode ? countryCode : "";
  const selectedLang = currLang !== null ? currLang : locale;

  useEffect(() => {
    localStorage.setItem("language_code", `${selectedLang}`);
    localStorage.setItem("country_code", `${selectedCountry}`);
  }, [selectedCountry, selectedLang]);

  useEffect(() => {
    push(`${pathname}?country=${selectedCountry}`, asPath, {
      shallow: true,
      locale: selectedLang,
    });
  }, [countryList, selectedCountry]);

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
  }, [locale, selectedCountry]);

  function selectCountryHandle(text: string | number) {
    localStorage.setItem("country_code", `${text}`);
    push(`${pathname}?country=${text}`);
  }

  const context = {
    selectCountryHandle,
    countryList,
    languageList,
    selectedCountry,
  };

  return (
    <CountrySelectContext.Provider value={context}>
      {children}
    </CountrySelectContext.Provider>
  );
}

export default CountrySelectContext;
