import { useContext } from "react";
import SearchIcon from "../assets/icons/SearchIcon";
import { Card } from "../reusable/card";
import { ProductInterface } from "../../Interfaces/ProductInterface";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

interface ListItemContentProps {
  readonly data: ProductInterface[] | undefined;
  readonly term?: string | undefined;
  readonly setTerm?: (value: string) => void;
  readonly onSearch?: (e: React.ChangeEvent<HTMLFormElement>) => void;
  readonly title: string | undefined;
}

const ListItemsContent = ({
  data,
  term,
  setTerm,
  onSearch,
  title,
}: ListItemContentProps) => {
  const { translations } = useContext(TranslationContext);

  const content = data?.map((item) => (
    <div className="col-lg-4 col-md-6 col-6" key={item.id}>
      <Card cardData={item} />
    </div>
  ));

  return (
    <div className={styles.list__content}>
      <div className="container">
        <h2 className={styles.list__title}>{title}</h2>
        <form className={styles["list__form"] + " mb-5"} onSubmit={onSearch}>
          <div className={styles.list__input}>
            <input
              type="search"
              placeholder={translations?.search}
              value={term}
              onChange={(e) => setTerm && setTerm(e.target.value)}
            />
            <button type="submit">
              <SearchIcon />
            </button>
          </div>
        </form>

        <div className="row gy-4">
          {content?.length !== 0 ? (
            content
          ) : (
            <h4 className="no-content">{translations?.no_content_found}</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export { ListItemsContent };
