import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import { getData } from "../../api/BaseApi";
import styles from "./style.module.css";

interface LanguageListProps {
  readonly current: LanguageListNestedProps;
  readonly others: LanguageListNestedProps[];
}

interface LanguageListNestedProps {
  readonly code: string;
  readonly title: string;
}

const LanguageSelect = () => {
  const { locale, push, pathname, asPath } = useRouter();
  const [languageList, setLanguageList] = useState<LanguageListProps | any>([]);

  useEffect(() => {
    const currLang = localStorage.getItem("language_code");
    const currentCountry = localStorage.getItem("country_code");
    getData("/countries/languages/?", locale, currentCountry ?? "")
      .then((res) => {
        setLanguageList(res.data);
        if (currLang !== null) {
          push(pathname, asPath, {
            locale: currLang,
          });
        } else {
          console.log(res.data.current);

          push(pathname, asPath, {
            locale: res.data.current?.code,
          });
          localStorage.setItem("language_code", res.data.current?.code);
        }
      })
      .catch((err) => console.log(err));
  }, [locale]);

  function changeLanguage(text: string) {
    const item = languageList?.others.find(
      (langs: LanguageListNestedProps) => langs.code === text
    );

    if (typeof window !== "undefined") {
      localStorage.setItem("language_code", `${item?.code}`);
    }

    push(pathname, asPath, {
      locale: item?.code,
    });
  }

  return (
    <div className={styles.language}>
      <div className={styles.language__selected}>
        <span>{languageList?.current?.title}</span>
        <ChevronDownIcon />
      </div>
      <div className={styles.language__list}>
        {languageList?.others?.map(
          ({ title, code }: LanguageListNestedProps) => (
            <span
              data-active={languageList?.current.code === code}
              key={code}
              onClick={() => changeLanguage(`${code}`)}
            >
              {title}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export { LanguageSelect };
