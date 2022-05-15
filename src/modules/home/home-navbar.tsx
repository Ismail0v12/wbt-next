import React, { useCallback, useContext, useEffect, useState } from "react";
import Logo from "../../components/assets/logos/logo.png";
import { LinkQuery } from "../../components/link-query";
import NavMenu from "../../components/nav-menu";
import CryptoIcon from "../../components/assets/icons/CryptoIcon";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

function HomePageNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const { translations } = useContext(TranslationContext);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY > 300) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <nav className={styles.home__nav}>
      <div
        className={styles.nav__fixed}
        style={scrolled ? { padding: "14px 0" } : {}}
      >
        <div className="container">
          <ul className={styles.home__ul}>
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
            <li
              className={
                scrolled
                  ? styles["home__logo"] + " " + styles["active"]
                  : styles["home__logo"]
              }
            >
              <img src={Logo.src} alt="whitebridge.club" />
            </li>
            <li className="d-flex align-items-center">
              <div
                style={{ color: "var(--yellow)", fontSize: "18px" }}
                className="extra__class"
              >
                <span>WBT </span>
                <span
                  className={styles.extra__class}
                  style={{ textTransform: "lowercase" }}
                >
                  {translations?.get_token_in_menu}
                </span>
              </div>
              <LinkQuery href="/profile" passHref>
                <a className="image__icon">
                  <CryptoIcon />
                </a>
              </LinkQuery>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HomePageNavbar;
