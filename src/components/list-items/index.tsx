import { ListItemsBanner } from "./list-items-banner";
import { ListItemsContent } from "./list-items-content";
import { ParticlesAnime } from "../particles-anime";
import { ProductInterface } from "../../Interfaces/ProductInterface";
import { BannerInterface } from "../../Interfaces/BannerInterface";
import { BaseNavigation } from "../base-navigation";
import styles from "./style.module.css";

interface ListItemsProps {
  readonly data: ProductInterface[] | undefined;
  readonly banner?: BannerInterface[] | undefined;
  readonly term?: string;
  readonly setTerm?: (value: string) => void;
  readonly onSearch?: (e: React.ChangeEvent<HTMLFormElement>) => void;
  readonly title: string | undefined;
}

const ListItems = ({
  data,
  banner,
  setTerm,
  term,
  onSearch,
  title,
}: ListItemsProps) => {
  return (
    <div className={styles.list}>
      <ParticlesAnime />
      <BaseNavigation />
      <ListItemsBanner banners={banner} />
      <ListItemsContent
        data={data}
        setTerm={setTerm}
        term={term}
        title={title}
        onSearch={onSearch}
      />
    </div>
  );
};

export { ListItems };
