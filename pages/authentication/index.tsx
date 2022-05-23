import { GetServerSideProps } from "next";
import { AuthLayout } from "../../src/layouts/auth-layout";
import dynamic from "next/dynamic";
import { getData } from "../../src/api/BaseApi";
import Head from "next/head";
import Spinner from "../../src/components/spinner";

const Auth = dynamic(() => import("../../src/modules/auth"), {
  loading: () => <Spinner />,
});

const AuthenticationPage = (props: any) => {
  const { translations } = props;
  return (
    <>
      <Head>
        <title>White Bridge Club</title>
        <meta property="description" content={`${translations.crypo_wbt}`} />
        <meta property="url" content="https://whitebridge.club" />
        <meta property="type" content="website" />

        <meta property="og:url" content="https://whitebridge.club" />
        <meta property="og:title" content={`White Bridge Club`} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={`White Bridge Club`} />
        <meta property="og:description" content={`${translations.crypo_wbt}`} />
        <meta
          property="og:image"
          itemProp="image primaryImageOfPage"
          content="https://whitebridge.club/wbt.png"
        />
        <meta name="description" content={`${translations.crypo_wbt}`} />

        {/* <!-- Facebook Meta Tags --> */}
        <meta property="og:url" content="https://whitebridge.club" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`White Bridge Club`} />
        <meta property="og:description" content={`${translations.crypo_wbt}`} />
        <meta property="og:image" content="https://whitebridge.club/wbt.png" />

        {/* <!-- Twitter Meta Tags --> */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://whitebridge.club" />
        <meta property="twitter:url" content="https://whitebridge.club" />
        <meta name="twitter:title" content={`White Bridge Club`} />
        <meta
          name="twitter:description"
          content={`${translations.crypo_wbt}`}
        />
        <meta name="twitter:image" content="https://whitebridge.club/wbt.png" />
      </Head>
      <AuthLayout>
        <Auth translations={translations} />
      </AuthLayout>
    </>
  );
};

export default AuthenticationPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await getData("/translations/?", locale, "");
  return {
    props: {
      translations: translations.data,
    },
  };
};
