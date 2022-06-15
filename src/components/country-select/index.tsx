import { useContext, useEffect, useMemo, useRef, useState } from "react";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import { Image } from "../image";
import CountrySelectContext from "../../providers/country-select-context";
import styles from "./style.module.css";
import TranslationContext from "../../providers/translation-context";

export interface CountryListOtherProps {
  readonly flag: string;
  readonly title: string;
  readonly code: string | number;
}

const CountrySelect = () => {
  const { selectCountryHandle, countryList } = useContext(CountrySelectContext);
  const { translations } = useContext(TranslationContext);
  const [openSelectCountry, setOpenSelectCountry] = useState<boolean>(false);
  const [term, setTerm] = useState("");
  const countryRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (openSelectCountry) {
      executeScroll();
    }
  }, [openSelectCountry]);

  const executeScroll = () =>
    countryRef.current?.scrollIntoView({
      block: "end",
    });

  const searchCountry = useMemo(() => {
    if (term.length === 0) {
      return countryList?.others;
    }

    return countryList?.others.filter((item: { title: string }) => {
      return item.title.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }, [countryList?.others, term]);

  return (
    <div className={styles.country} data-open={openSelectCountry}>
      <div
        className={styles.country__selected}
        onClick={() => setOpenSelectCountry(true)}
      >
        <span>{countryList?.current.title}</span>
        <span>
          <ChevronDownIcon />
        </span>
        <span>
          {countryList?.current?.flag && (
            <Image
              src={`${countryList?.current?.flag}`}
              alt={`${countryList?.current.code}`}
              width={36}
              height={36}
            />
          )}
        </span>
      </div>
      <div
        className={styles.country__list}
        onMouseLeave={() => setOpenSelectCountry(false)}
      >
        <input
          type="search"
          placeholder={translations?.search_the_country}
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {searchCountry?.map(({ title, flag, code }: CountryListOtherProps) => (
          <div
            data-active={countryList?.current.code === code}
            ref={countryList?.current.code === code ? countryRef : null}
            key={code}
            onClick={() => {
              selectCountryHandle(code);
              setOpenSelectCountry(false);
            }}
            className={countryList?.current.code === code ? styles.active : ""}
          >
            <span>{title}</span>
            <Image src={flag} alt={title} width={36} height={36} />
          </div>
        ))}
      </div>
    </div>
  );
};

export { CountrySelect };
