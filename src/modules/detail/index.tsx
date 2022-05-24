import React from "react";
import { BaseNavigation } from "../../components/base-navigation";
import { Footer } from "../../components/footer";
import { ParticlesAnime } from "../../components/particles-anime";
import { ProductInterface } from "../../Interfaces/ProductInterface";

import styles from "./style.module.css";

interface DetailPageProps {
  readonly data: ProductInterface;
}

function DetailPage({ data }: DetailPageProps) {
  return (
    <div className={styles["detail-page"]}>
      <ParticlesAnime />
      <BaseNavigation />
      <iframe
        src={data?.link}
        id="detail-page__iframe"
        className={styles["detail-page__iframe"]}
      />
      <Footer />
    </div>
  );
}

export default DetailPage;
