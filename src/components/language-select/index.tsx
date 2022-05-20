import { useContext } from "react";
import { useRouter } from "next/router";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import styles from "./style.module.css";
import CountrySelectContext from "../../providers/country-select-context";

export interface LanguageListProps {
  readonly current: LanguageListNestedProps;
  readonly others: LanguageListNestedProps[];
}

interface LanguageListNestedProps {
  readonly code: string;
  readonly title: string;
}

const LanguageSelect = () => {
  const { push, pathname, asPath } = useRouter();
  const { languageList } = useContext(CountrySelectContext);
  function changeLanguage(text: string) {
    const item = languageList?.others.find(
      (langs: LanguageListNestedProps) => langs.code === text
    );
    localStorage.setItem("language_code", `${item?.code}`);

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
