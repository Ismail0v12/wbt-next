import React, { useContext } from "react";
import { LinkQuery } from "../../../components/link-query";
import Logo from "../../../components/assets/logos/logo.png";
import UserIcon from "../../../components/assets/icons/UserIcon";
import TranslationContext from "../../../providers/translation-context";
import { SocialSubscription } from "../components/social-subscription";
import styles from "../style.module.css";

const UserPageNavbar = () => {
  const { translations } = useContext(TranslationContext);

  return (
    <div className={styles.user__nav}>
      <nav>
        <div className="container">
          <ul className={styles.user__ul}>
            <li>
              <LinkQuery href="/" passHref>
                <a>
                  <img src={Logo.src} alt="whitebridge.club" />
                </a>
              </LinkQuery>
            </li>
            <li>
              <span>{translations?.contact_us}</span>
              <SocialSubscription />
            </li>
            <li>
              <LinkQuery href="/profile" passHref>
                <a className="rounded-icons">
                  <UserIcon />
                </a>
              </LinkQuery>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export { UserPageNavbar };
