import React from "react";
import Image from "next/image";
import HomePageBanner from "./home-banner";
import HomePageContent from "./home-content";
import Logo from "../../components/assets/logos/logo.png";
import { ParticlesAnime } from "../../components/particles-anime";
import Spinner from "../../components/spinner";
import { HomePageInterface } from "../../Interfaces/HomePageInterface";
import BaseLayout from "../../layouts/base-layout";
import styles from "./style.module.css";
import HomePageNavbar from "./home-navbar";

interface HomePageProps {
  readonly translations: any;
  readonly homeData: any;
}

const HomePage = ({ translations, homeData }: HomePageProps) => {
  if (!homeData) {
    return <Spinner />;
  }

  const carouselContent = homeData?.map(
    (item: HomePageInterface, index: number) => (
      <HomePageContent
        key={item.category.id}
        data={item.results}
        number={index + 1}
        title={item.category.title}
      />
    )
  );

  return (
    <BaseLayout>
      <section className={styles.home}>
        <ParticlesAnime />
        <HomePageNavbar />
        <HomePageBanner />
        <div className="container">
          {carouselContent}
          <div className={styles.home__about}>
            <div className="row align-items-center">
              <div className="col-md-7">
                <h4>{translations?.about_us}</h4>
                <p>{translations?.about_descr}</p>
              </div>
              <div className="col-md-4 offset-lg-1 offset-md-1 offset-0">
                <Image
                  src={Logo.src}
                  alt="whitebridge.club"
                  width={Logo.width}
                  height={Logo.height}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default HomePage;
