import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import ChevronRightIcon from "../../components/assets/icons/ChevronRightIcon";
import { BannerInterface } from "../../Interfaces/BannerInterface";
import styles from "./style.module.css";

SwiperCore.use([Navigation, Pagination]);

interface ListItemsBannerProps {
  readonly banners: BannerInterface[] | undefined;
}

const ListItemsBanner = ({ banners }: ListItemsBannerProps) => {
  const banner = banners?.map((item) => (
    <SwiperSlide key={item.id}>
      <a
        href={item.link}
        className={styles.list__banner}
        target="_blank"
        rel="noreferrer"
        style={{ backgroundImage: `url(https://whitebridge.site${item.file})` }}
      />
    </SwiperSlide>
  ));

  return (
    <>
      {typeof banners === "undefined" || banners?.length === 0 ? null : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            prevEl: "#list__banner-prev",
            nextEl: "#list__banner-next",
          }}
          pagination={{ clickable: true }}
          className={styles["list__swiper"]}
          scrollbar={{ draggable: true }}
          style={{
            height: "770px",
          }}
          loop={true}
        >
          {banner}
          <div className={styles["list__banner-prev"]} id="list__banner-prev">
            <ChevronRightIcon />
          </div>
          <div className={styles["list__banner-next"]} id="list__banner-next">
            <ChevronRightIcon />
          </div>
        </Swiper>
      )}
    </>
  );
};

export { ListItemsBanner };
