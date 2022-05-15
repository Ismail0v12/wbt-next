import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Image } from "../../components/image";
import { ProductInterface } from "../../Interfaces/ProductInterface";
import { Navigation, Thumbs, Autoplay } from "swiper";
import { Swiper as SwiperType } from "swiper/types";
import styles from "./style.module.css";

interface DetailPageCarouselProps {
  readonly dataDetail: ProductInterface | undefined;
}

function DetailPageCarousel({ dataDetail }: DetailPageCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<
    SwiperType | undefined | null
  >(null);
  return (
    <div className={styles["detail-page__carousel"]}>
      <Swiper
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        spaceBetween={30}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Navigation, Thumbs, Autoplay]}
        className={styles["detail-page__carousel-banner"]}
      >
        {dataDetail?.photos.map((item) => (
          <SwiperSlide key={item}>
            <Image src={item} alt={dataDetail.title} width={658} height={420} />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={false}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        spaceBetween={5}
        slidesPerView={4}
        watchSlidesProgress={true}
        modules={[Navigation, Thumbs, Autoplay]}
        className={styles["detail-page__thumbs-parent"]}
      >
        {dataDetail?.photos.map((item) => (
          <SwiperSlide
            className={styles["detail-page__thumbs-item"]}
            key={item}
          >
            <Image
              src={item}
              alt={dataDetail.title}
              objectFit="cover"
              width={160}
              height={115}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export { DetailPageCarousel };
