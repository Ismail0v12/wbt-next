import React, { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const iframeDoc = document.getElementById(
      "detail-page__iframe"
    ) as HTMLIFrameElement;
    if (iframeDoc.contentDocument?.readyState === "complete") {
      setLoading(false);
    }
  }, []);

  return (
    <div className={styles["detail-page"]}>
      <ParticlesAnime />
      <BaseNavigation />
      {loading && <Spinner />}
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
