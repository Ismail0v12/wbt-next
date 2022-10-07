import { useEffect } from "react";
import { BaseNavigation } from "../../components/base-navigation";
import { Footer } from "../../components/footer";
import { ParticlesAnime } from "../../components/particles-anime";
import Spinner from "../../components/spinner";
import { ProductInterface } from "../../Interfaces/ProductInterface";

import styles from "./style.module.css";

interface DetailPageProps {
  readonly data: ProductInterface;
}

function DetailPage({ data }: DetailPageProps) {
  useEffect(() => {
    window.location.replace(data.link);
  }, [data]);

  return (
    <div className={styles["detail-page"]}>
      <ParticlesAnime />
      <BaseNavigation />
      {!data && <Spinner />}
      <iframe
        src={data?.link}
        id="detail-page__iframe"
        className={styles["detail-page__iframe"]}
        allowFullScreen
      />
      <Footer />
    </div>
  );
}

export default DetailPage;
