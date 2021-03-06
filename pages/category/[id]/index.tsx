import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getData } from "../../../src/api/BaseApi";
import Spinner from "../../../src/components/spinner";

const ListPage = dynamic(() => import("../../../src/modules/list"), {
  loading: () => <Spinner />,
});

export default function List(props: any) {
  const { data, translations } = props;
  return (
    <>
      <Head>
        <title>White Bridge Club | {data?.category.title}</title>
        <meta property="description" content={`${translations?.about_descr}`} />
        <meta property="url" content="https://whitebridge.club" />
        <meta property="type" content="website" />

        <meta property="og:url" content="https://whitebridge.club" />
        <meta property="og:title" content={`White Bridge Club `} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={`White Bridge Club`} />
        <meta
          property="og:description"
          content={`${translations?.about_descr}`}
        />
        <meta
          property="og:image"
          itemProp="image primaryImageOfPage"
          content="https://whitebridge.club/wbt.png"
        />
        <meta name="description" content={`${translations?.about_descr}`} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://whitebridge.club" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`White Bridge Club`} />
        <meta
          property="og:description"
          content={`${translations?.about_descr}`}
        />
        <meta property="og:image" content="https://whitebridge.club/wbt.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://whitebridge.club" />
        <meta property="twitter:url" content="https://whitebridge.club" />
        <meta name="twitter:title" content={`White Bridge Club`} />
        <meta
          name="twitter:description"
          content={`${translations?.about_descr}`}
        />
        <meta name="twitter:image" content="https://whitebridge.club/wbt.png" />
      </Head>
      <ListPage />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = ({ locales }) => {
  return {
    paths: [
      { params: { id: "2", locales } },
      { params: { id: "3", locales } },
      { params: { id: "5", locales } },
    ],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const data = await getData(
    `/entities/${params?.id}/per-category/?`,
    locale,
    ""
  );
  const translations = await getData("/translations/?", locale, "");

  return {
    props: {
      data: data.data,
      translations: translations.data,
    },
  };
};
