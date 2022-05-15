import React from "react";
import { LinkQuery } from "../../components/link-query";
import Image from "next/image";
import MainLogo from "../../components/assets/logos/logo.png";
import { LanguageSelect } from "../../components/language-select";
import { CountrySelect } from "../../components/country-select";

const AuthHeader = () => {
  const currentCountry =
    typeof window !== "undefined" && localStorage.getItem("country_code");
  return (
    <div className="auth__header">
      <div className="container">
        <div className="auth__header_wrapper">
          <LinkQuery href="/">
            <a>
              <Image src={MainLogo} alt="whc" width={100} height={76} />
            </a>
          </LinkQuery>
          <div className="auth__lang">
            <LanguageSelect />
            <CountrySelect />
          </div>
        </div>
      </div>
      <hr className="auth_divide" />
    </div>
  );
};

export { AuthHeader };
