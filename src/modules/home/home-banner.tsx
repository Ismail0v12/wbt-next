import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronRightIcon from "../../components/assets/icons/ChevronRightIcon";
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectCreative,
} from "swiper";
import { BannerInterface } from "../../Interfaces/BannerInterface";
import { bannerPostView } from "../../api/ProductApi";
import { getData } from "../../api/BaseApi";
import { useRouter } from "next/router";
import styles from "./style.module.css";

SwiperCore.use([Navigation, Pagination, Autoplay, EffectCreative]);

function HomePageBanner() {
  const { query, locale } = useRouter();
  const [data, setData] = useState([]);

  useEffect(() => {
    getData("/banners/?", locale, query.country)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, [query.country, locale]);

  const content = data.map((item: BannerInterface) => (
    <SwiperSlide key={item.id}>
      <a
        href={item.link}
        onClick={() => bannerPostView(item.id)}
        className={styles.home__banner}
        style={{ backgroundImage: `url(https://whitebridge.site${item.file})` }}
        rel="noreferrer"
        target="_blank"
      />
    </SwiperSlide>
  ));

  return (
    <>
      {data.length === 0 || typeof data === "undefined" ? null : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCreative]}
          slidesPerView={1}
          effect={"creative"}
          className={styles.home__carousel}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -100],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          navigation={{
            prevEl: "#prev-button",
            nextEl: "#next-button",
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          style={{
            height: "770px",
          }}
          loop={true}
        >
          {content}
          <div className={styles["banner-prev-button"]} id="prev-button">
            <ChevronRightIcon />
          </div>
          <div className={styles["banner-next-button"]} id="next-button">
            <ChevronRightIcon />
          </div>
        </Swiper>
      )}
    </>
  );
}

export default HomePageBanner;
