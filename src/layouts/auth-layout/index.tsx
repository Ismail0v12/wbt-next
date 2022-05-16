import React, { useEffect, useState } from "react";
import { AuthHeader } from "./auth-header";
import { AuthPartners } from "./auth-partners";
import { getData } from "../../api/BaseApi";
import EarthIcon from "../../components/assets/icons/EarthIcon";
import { useRouter } from "next/router";
import { Footer } from "../../components/footer";

interface CountryInterface {
  readonly longitude: number | undefined;
  readonly latitude: number | undefined;
  readonly code?: string;
}

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [country, setCountry] = useState<CountryInterface | undefined>(
    undefined
  );

  const router = useRouter();
  const currentCountry =
    router.query.country === null ? "" : router.query.country;

  useEffect(() => {
    getData("/countries/current/?", router.locale, currentCountry ?? "")
      .then((res) => setCountry(res.data))
      .catch((err) => console.log(err));
  }, [router.locale, currentCountry]);

  return (
    <>
      <section className="authlayout}">
        <AuthHeader />
        <div className="container">
          <div className="auth__grid">
            {children}
            <div className="auth__map">
              <EarthIcon country_code={country?.code} />
            </div>
          </div>
          <AuthPartners />
        </div>
      </section>
      <Footer />
    </>
  );
};

export { AuthLayout };
