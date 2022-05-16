import React, { useContext, useEffect, useState } from "react";
import { LinkQuery } from "../link-query";
import Image from "next/image";
import NavMenu from "../nav-menu";
import Logo from "../../components/assets/logos/logo.png";
import CryptoIcon from "../assets/icons/CryptoIcon";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";
import AuthenticationContext from "../../providers/authentication-context";

const BaseNavigation = () => {
  const [authed, setAuthed] = useState(false);
  const { translations } = useContext(TranslationContext);
  const { access } = useContext(AuthenticationContext);

  useEffect(() => {
    if (access !== null) {
      setAuthed(true);
    }
  }, [access]);

  return (
    <div className={styles["base-navigation"]}>
      <nav>
        <div className="container">
          <ul className={styles["base-navigation__ul"]}>
            <li className="d-flex align-items-center">
              <NavMenu />
              <span
                style={{
                  color: "var(--yellow)",
                  fontSize: "18px",
                  marginLeft: "10px",
                }}
                className="extra__class"
              >
                {translations?.categories}
              </span>
            </li>
            <li className={styles["base-navigation__logo"]}>
              <LinkQuery href="/" passHref>
                <a>
                  <Image
                    src={Logo}
                    alt="whitebridge.club"
                    width={117}
                    height={80}
                    objectFit="contain"
                  />
                </a>
              </LinkQuery>
            </li>
            <li className="d-flex align-items-center">
              <div
                className="extra__class"
                style={{ color: "var(--yellow)", fontSize: "18px" }}
              >
                <span>WBT </span>
                <span style={{ textTransform: "lowercase" }}>
                  {translations?.get_token_in_menu}
                </span>
              </div>
              <LinkQuery passHref href={authed ? "/profile" : "/login"}>
                <a className="image__icon">
                  <CryptoIcon />
                </a>
              </LinkQuery>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export { BaseNavigation };
