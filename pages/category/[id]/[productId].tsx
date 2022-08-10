import { GetServerSideProps } from "next";
import Head from "next/head";
import { getData } from "../../../src/api/BaseApi";
import SpinnerIcon from "../../../src/components/assets/icons/SpinnerIcon";
import DetailPage from "../../../src/modules/detail";

function Detail(props: any) {
  const { detailData, details } = props;
  if (!detailData) {
    return <SpinnerIcon />;
  }

  return (
    <>
      <Head>
        <title>{detailData?.title} | White Bridge Club </title>
        <meta property="description" content={`${detailData?.description}`} />
        <meta
          name="keywords"
          content={`${detailData?.title}, ${detailData?.description}, White Bridge Club`}
        />
        <meta
          property="url"
          content={`https://whitebridge.club/${details.locale}/category/${detailData?.category.id}/${detailData?.id}?country=${details.currentCountry}`}
        />
        <meta property="type" content="website" />

        <meta
          property="og:url"
          content={`https://whitebridge.club/${details.locale}/category/${detailData?.category.id}/${detailData?.id}?country=${details.currentCountry}`}
        />
        <meta
          property="og:title"
          content={`${detailData?.title} | White Bridge Club`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:site_name"
          content={`${detailData?.title} | White Bridge Club`}
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
          content={`https://whitebridge.club/${details.locale}/category/${detailData?.category.id}/${detailData?.id}?country=${details.currentCountry}`}
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
          content={`https://whitebridge.club/${details.locale}/category/${detailData?.category.id}/${detailData?.id}?country=${details.currentCountry}`}
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
  params,
}) => {
  const currentCountry =
    typeof query.country !== "undefined" ? query.country : "";

  const data = await getData(
    `/entities/${params?.productId}/?`,
    locale,
    currentCountry
  );

  console.log(data.data);

  const translations = await getData("/translations/?", locale, currentCountry);

  return {
    props: {
      detailData: data.data,
      translations: translations.data,
      details: { locale, currentCountry },
    },
  };
};
