import { useRouter } from "next/router";
import React, { useLayoutEffect } from "react";
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
  const { query, locale } = useRouter();
  const isClient = typeof window !== "undefined";

  function redirectUser() {
    try {
      setTimeout(() => {
        window.location.replace(
          `https://whitebridge.club/${locale}/category/${data.category.id}?country=${query.country}`
        );
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  }
  if (isClient) {
    window.open(data.link, "popup");
    redirectUser();
  }

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
