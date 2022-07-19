import { GetServerSideProps } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import { getData } from "../../../src/api/BaseApi";
import SpinnerIcon from "../../../src/components/assets/icons/SpinnerIcon";
import DetailPage from "../../../src/modules/detail";

// const DetailPage = dynamic(() => import("../../../src/modules/detail"), {
//   ssr: false,
//   loading: () => <SpinnerIcon />,
// });

function Detail(props: any) {
  const { detailData } = props;
  if (!detailData) {
    return <SpinnerIcon />;
  }

  return (
    <>
      <Head>
        <title>White Bridge Club | {detailData?.title}</title>
        <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
        <meta property="description" content={`${detailData?.description}`} />
        <meta
          name="keywords"
          content={`${detailData?.title}, ${detailData?.description}, White Bridge Club`}
        />
        <meta
          property="url"
          content={`https://whitebridge.club/product/${detailData?.id}`}
        />
        <meta property="type" content="website" />

        <meta
          property="og:url"
          content={`https://whitebridge.club/product/${detailData?.id}`}
        />
        <meta
          property="og:title"
          content={`White Bridge Club | ${detailData?.title}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content={`White Bridge Club | ${detailData?.title}`}
        />
        <meta
          property="og:description"
          content={`${detailData?.description}`}
        />
        <meta
          property="og:image"
          itemProp="image primaryImageOfPage"
          content={`https://whitebridge.site${detailData?.photos[0]}`}
        />
        <meta name="description" content={`${detailData?.description}`} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta
          property="og:url"
          content={`https://whitebridge.club/product/${detailData?.id}`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={`${detailData?.title} | White Bridge Club`}
        />
        <meta
          property="og:description"
          content={`${detailData?.description}`}
        />
        <meta
          property="og:image"
          content={`https://whitebridge.club${detailData?.photos[0]}`}
        />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content={`https://whitebridge.club`} />
        <meta
          property="twitter:url"
          content={`https://whitebridge.club/product/${detailData?.id}`}
        />
        <meta name="twitter:title" content="White Bridge Club" />
        <meta
          name="twitter:description"
          content={`${detailData?.description}`}
        />
        <meta
          name="twitter:image"
          content={`https://whitebridge.site${detailData?.photos[0]}`}
        />
      </Head>
      <DetailPage data={detailData} />
    </>
  );
}

export default Detail;

export const getServerSideProps: GetServerSideProps = async ({
  locale,
  query,
}) => {
  const data = await getData(`/entities/${query.id}/?`, locale, query.country);
  const translations = await getData("/translations/?", locale, query.country);

  return {
    props: {
      detailData: data.data,
      translations: translations.data,
    },
  };
};
