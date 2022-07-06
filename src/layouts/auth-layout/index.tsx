import React, { useContext } from "react";
import { AuthHeader } from "./auth-header";
import { AuthPartners } from "./auth-partners";
import EarthIcon from "../../components/assets/icons/EarthIcon";
import { Footer } from "../../components/footer";
import CountrySelectContext from "../../providers/country-select-context";

interface CountryInterface {
  readonly longitude: number | undefined;
  readonly latitude: number | undefined;
  readonly code?: string;
}

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const { countryList } = useContext(CountrySelectContext);

  return (
    <>
      <section className="authlayout">
        <AuthHeader />
        <div className="container">
          <div className="auth__grid">
            {children}
            <div className="auth__map">
              <EarthIcon country_code={countryList?.current.code} />
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
