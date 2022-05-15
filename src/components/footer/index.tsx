import React, { useContext } from "react";
import { LinkQuery } from "../link-query";
import Image from "next/link";
import logo from "../../components/assets/logos/logo.png";
import { FooterForm } from "./footer-form";
import ContactLinksContext from "../../providers/contact-links-context";
import { ContactLinksInterface } from "../../Interfaces/ContactLinksInterface";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

const Footer = () => {
  const { contactLinks } = useContext(ContactLinksContext);
  const { translations } = useContext(TranslationContext);

  const links = contactLinks?.map((item: ContactLinksInterface) => (
    <li key={item.id}>
      <a href={item.link} target="_blank" rel="noreferrer">
        <img src={item.icon} alt="White Bridge Club" />
      </a>
    </li>
  ));
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footer__wrapper}>
          <div className={styles.footer__logo}>
            <LinkQuery href="/" passHref>
              <a>
                <img
                  src={logo.src}
                  alt="whitebridge.club"
                  width={103}
                  height={76}
                />
              </a>
            </LinkQuery>
            <span>© 2022 {translations?.all_rights_reserved}</span>
          </div>
          <div className={styles.footer__menu}>
            <ul>
              <li>
                <LinkQuery passHref href="/privacy-policy">
                  <a>{translations?.privacy_policy ?? ""}</a>
                </LinkQuery>
              </li>
              <li>
                <LinkQuery passHref href="/term-of-use">
                  <a>{translations?.term_of_use ?? ""}</a>
                </LinkQuery>
              </li>
            </ul>
          </div>
          <div className={styles.footer__social}>
            <h4>{translations?.contact_us}</h4>
            <ul>{links}</ul>
          </div>
          <FooterForm />
        </div>
      </div>
    </footer>
  );
};

export { Footer };
