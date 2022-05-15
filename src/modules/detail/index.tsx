import React from "react";
import ChevronRightIcon from "../../components/assets/icons/ChevronRightIcon";
import { BaseNavigation } from "../../components/base-navigation";
import { ParticlesAnime } from "../../components/particles-anime";
import { ProductInterface } from "../../Interfaces/ProductInterface";
import { DetailPageCarousel } from "./detail-carousel";
import styles from "./style.module.css";

interface DetailPageProps {
  readonly data: ProductInterface;
  readonly translations: any;
}

function DetailPage({ data, translations }: DetailPageProps) {
  console.log(data);
  return (
    <div className={styles["detail-page"]}>
      <ParticlesAnime />
      <BaseNavigation />
      <div className="container">
        <div className={styles["detail-page__wrapper"]}>
          <DetailPageCarousel dataDetail={data} />
          <div className={styles["detail-page__body"]}>
            <div className={styles["detail-page__header"]}>
              <h2>{data?.title}</h2>
              <span>
                {translations?.views}: {data?.views}
              </span>
            </div>
            <article className={styles["detail-page__desciption"]}>
              {data?.description}
            </article>
            <a
              href={data?.link}
              target="_blank"
              rel="noreferrer"
              className="button"
            >
              <span>
                {translations?.see_more}
                <ChevronRightIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
