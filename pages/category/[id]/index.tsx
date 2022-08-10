import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getData } from "../../../src/api/BaseApi";
import Spinner from "../../../src/components/spinner";

const ListPage = dynamic(() => import("../../../src/modules/list"), {
  loading: () => <Spinner />,
});

export default function List(props: any) {
  const { data, translations, details } = props;
  return (
    <>
      <Head>
        <title>{data?.category.title} | White Bridge Club </title>
        <meta property="description" content={`${translations?.about_descr}`} />
        <meta
          property="url"
          content={`https://whitebridge.club/${details?.locale}/${details?.categoryId}?country=${details.currentCountry}`}
        />
        <meta property="type" content="website" />

        <meta
          property="og:url"
          content={`https://whitebridge.club/${details?.locale}/${details?.categoryId}?country=${details.currentCountry}`}
        />
        <meta property="og:title" content="White Bridge Club" />
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
        <meta
          property="og:url"
          content={`https://whitebridge.club/${details?.locale}/${details?.categoryId}?country=${details.currentCountry}`}
        />
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
        <meta
          property="twitter:url"
          content={`https://whitebridge.club/${details?.locale}/${details?.categoryId}?country=${details.currentCountry}`}
        />
        <meta name="twitter:title" content={`White Bridge Club`} />
        <meta
          name="twitter:description"
          content={`${translations?.about_descr}`}
        />
        <meta name="twitter:image" content="https://whitebridge.club/wbt.png" />
      </Head>
      <ListPage data={data} />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  params,
  locale,
  query,
}) => {
  const currentCountry =
    typeof query.country !== "undefined" ? query.country : "";
  const data = await getData(
    `/entities/${params?.id}/per-category/?`,
    locale,
    currentCountry
  );
  const translations = await getData("/translations/?", locale, "");

  return {
    props: {
      data: data.data,
      translations: translations.data,
      details: { categoryId: params?.id, locale, currentCountry },
    },
  };
};
