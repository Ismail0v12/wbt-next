import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import ChevronDownIcon from "../assets/icons/ChevronDownIcon";
import { getData } from "../../api/BaseApi";
import { Image } from "../image";
import styles from "./style.module.css";
import CountrySelectContext from "../../providers/country-select-context";

interface CountryListProps {
  readonly current: CountryListOtherProps;
  readonly others: CountryListOtherProps[];
}

export interface CountryListOtherProps {
  readonly flag: string;
  readonly title: string;
  readonly code: string | number;
}

const CountrySelect = () => {
  const { selectCountryHandle } = useContext(CountrySelectContext);
  const [countryList, setCountryList] = useState<CountryListProps | undefined>(
    undefined
  );
  const [openSelectCountry, setOpenSelectCountry] = useState<boolean>(false);
  const [term, setTerm] = useState("");
  const countryRef = useRef<HTMLDivElement | null>(null);
  const { push, pathname, asPath, query } = useRouter();
  const queryCountry = query.country;
  useEffect(() => {
    const currentCountry = localStorage.getItem("country_code");
    getData("/countries/list/?", "en", currentCountry ?? "")
      .then((res) => {
        setCountryList(res.data);
        if (currentCountry === null) {
          localStorage.setItem("country_code", res.data.current.code);
          push(
            `${pathname}?country=${res.data.current.code}`,
            `${pathname}?country=${res.data.current.code}`,
            {
              shallow: true,
            }
          );
        } else {
          push(`${pathname}?country=${currentCountry}`, asPath, {
            shallow: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }, [queryCountry]);

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
    <div className={styles.country}>
      <div className={styles.country__selected}>
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
        onMouseEnter={() => setOpenSelectCountry(true)}
      >
        <input
          type="search"
          placeholder="Search country"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {searchCountry?.map(({ title, flag, code }: CountryListOtherProps) => (
          <div
            data-active={countryList?.current.code === code}
            ref={countryList?.current.code === code ? countryRef : null}
            key={code}
            onClick={() => selectCountryHandle(code)}
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
