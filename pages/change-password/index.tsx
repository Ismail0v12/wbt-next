import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthLayout } from "../../src/layouts/auth-layout";
import AuthenticationContext from "../../src/providers/authentication-context";
import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";
import { getData } from "../../src/api/BaseApi";
import Head from "next/head";

const ChangePasswordPage = dynamic(
  () => import("../../src/modules/change-password")
);

function ChangePassword(props: any) {
  const { translations } = props;
  const { isAuthorized } = useContext(AuthenticationContext);
  const router = useRouter();
  useEffect(() => {
    if (!isAuthorized) {
      router.push("/login", router.asPath);
    }
  }, [isAuthorized, router]);
  return (
    <AuthLayout>
      <Head>
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
      <ChangePasswordPage />
    </AuthLayout>
  );
}

export default ChangePassword;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await getData("/translations/?", locale, "");
  return {
    props: {
      translations: translations.data,
    },
  };
};
