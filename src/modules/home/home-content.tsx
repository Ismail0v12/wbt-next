import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronRightIcon from "../../components/assets/icons/ChevronRightIcon";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { Card } from "../../components/reusable/card";
import { ProductInterface } from "../../Interfaces/ProductInterface";
import styles from "./style.module.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface HomePageContentProps {
  readonly number: number;
  readonly data: ProductInterface[] | undefined;
  readonly title?: string | undefined;
}

function HomePageContent({ number, data, title }: HomePageContentProps) {
  const delayNumber = Number(`${number}599`);
  const content = data?.map((item) => (
    <SwiperSlide key={item.id}>
      <Card cardData={item} />
    </SwiperSlide>
  ));
  return (
    <>
      {data && data?.length === 0 ? null : (
        <div className={styles.home__content}>
          <h2>{title}</h2>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            loop={true}
            navigation={{
              prevEl: "#prev-button-" + number,
              nextEl: "#next-button-" + number,
            }}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{
              delay: delayNumber,
              pauseOnMouseEnter: true,
            }}
            className={styles.home__content_carousel}
            breakpoints={{
              "100": {
                slidesPerView: 2,
                spaceBetween: 15,
                slidesPerGroup: 2,
                pagination: false,
              },
              "768": {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 2,
              },
              "992": {
                slidesPerView: 3,
                spaceBetween: 20,
                slidesPerGroup: 3,
              },
              "1400": {
                slidesPerView: 3,
                spaceBetween: 28,
                slidesPerGroup: 3,
              },
            }}
            style={{
              height: "680px",
            }}
          >
            {content}
          </Swiper>
          <div
            className={styles["home-carousel-prev"]}
            id={`prev-button-${number}`}
          >
            <ChevronRightIcon />
          </div>
          <div
            id={`next-button-${number}`}
            className={styles["home-carousel-next"]}
          >
            <ChevronRightIcon />
          </div>
        </div>
      )}
    </>
  );
}

export default HomePageContent;
