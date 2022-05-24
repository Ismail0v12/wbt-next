import dynamic from "next/dynamic";
import Head from "next/head";
import { GetServerSideProps, NextPage } from "next";
import { getData } from "../src/api/BaseApi";
import Spinner from "../src/components/spinner";
import { useRouter } from "next/router";

const HomePage = dynamic(() => import("../src/modules/home"), {
  loading: () => <Spinner />,
});

const Home: NextPage<{ translations: any; currLang: any }> = ({
  translations,
  currLang,
}) => {
  return (
    <>
      <Head>
        <html lang={currLang} />
        <title>White Bridge Club</title>
        <meta property="description" content={`${translations.about_descr}`} />
        <meta property="url" content="https://whitebridge.club" />
        <meta property="type" content="website" />

        <meta property="og:url" content="https://whitebridge.club" />
        <meta property="og:title" content={`White Bridge Club `} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={`White Bridge Club`} />
        <meta
          property="og:description"
          content={`${translations.about_descr}`}
        />
        <meta
          property="og:image"
          itemProp="image primaryImageOfPage"
          content="https://whitebridge.club/wbt.png"
        />
        <meta name="description" content={`${translations.about_descr}`} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://whitebridge.club" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`White Bridge Club`} />
        <meta
          property="og:description"
          content={`${translations.about_descr}`}
        />
        <meta property="og:image" content="https://whitebridge.club/wbt.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://whitebridge.club" />
        <meta property="twitter:url" content="https://whitebridge.club" />
        <meta name="twitter:title" content={`White Bridge Club`} />
        <meta
          name="twitter:description"
          content={`${translations.about_descr}`}
        />
        <meta name="twitter:image" content="https://whitebridge.club/wbt.png" />
      </Head>
      <HomePage translations={translations} />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await getData("/translations/?", locale, "");
  const currLang = locale?.length !== 0 ? locale : "en";

  return {
    props: {
      translations: translations.data,
      currLang,
    },
  };
};
