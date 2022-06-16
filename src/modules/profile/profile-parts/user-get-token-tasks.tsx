import React, { useContext, useEffect, useMemo, useState } from "react";
import { LinkQuery } from "../../../components/link-query";
import jwtDecode from "jwt-decode";
import TranslationContext from "../../../providers/translation-context";
import { SocialSubscription } from "../components/social-subscription";
import { Button } from "../../../components/reusable/button";
import { Input } from "../../../components/reusable/input";
import ShareLinksContext from "../../../providers/share-links-context";
import { ShareLinksInterface } from "../../../Interfaces/ShareLinksInterface";
import AuthenticationContext from "../../../providers/authentication-context";
import { getData } from "../../../api/BaseApi";
import { UserDataInterface } from "../../../Interfaces/UserDataInterface";
import styles from "../style.module.css";
import { useRouter } from "next/router";

interface UserPageGetTokenTasksProps {
  readonly connectTo: boolean;
  readonly setConnect: (open: boolean) => void;
}

function UserPageGetTokenTasks({
  connectTo,
  setConnect,
}: UserPageGetTokenTasksProps) {
  const { translations } = useContext(TranslationContext);
  const { shareLinks } = useContext(ShareLinksContext);
  const [token, setToken] = useState<number | string>("");
  const [userData, setUserData] = useState<UserDataInterface | undefined>(
    undefined
  );
  const { logOut } = useContext(AuthenticationContext);
  const { locale } = useRouter();
  useEffect(() => {
    const accessSession = sessionStorage.getItem("accessSession");
    const access = localStorage.getItem("access");
    const currToken = accessSession || access;

    if (currToken !== null) {
      const decodedToken: { user_id: number } = jwtDecode(currToken);
      setToken(decodedToken.user_id);
    } else {
      logOut();
    }
  }, [logOut]);

  const tokenID = useMemo(() => {
    return token ? token : false;
  }, [token]);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (tokenID) {
      getData(`/profile/${tokenID}/?`, locale, "")
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err));
    }
  }, [tokenID, locale]);

  const [generatedLink, setGeneratedLink] = useState<{
    link: string;
    title: string;
    prefix_link?: string;
  } | null>(null);
  function generateLink(source: string, prefix_link: string) {
    const currentCountry = localStorage.getItem("country_code");
    const refLink = `${
      document.location.origin
    }/authentication?country=${currentCountry}&ref=${
      userData?.user.ref_code
    }&source=${source.toLowerCase()}`;
    setGeneratedLink({
      link: refLink,
      title: source,
      prefix_link: prefix_link,
    });
  }
  const links = shareLinks?.map((item: ShareLinksInterface) => (
    <li
      key={item.id}
      onClick={() => generateLink(item.title, item.prefix_link)}
    >
      <img src={item.icon} alt="whitebridge.club share links" />
    </li>
  ));
  return (
    <div className={styles.gettoken}>
      <div className={styles.gettoken__wrapper}>
        <h2 className={styles.gettoken__title}>
          {translations?.get_token_simple}
        </h2>
        <ol className={styles.gettoken__tasks}>
          <li className={styles.gettoken__subscribe}>
            <h4>{translations?.subscribe_to_socials}</h4>
            <SocialSubscription country="it" />
          </li>
          <li className={styles.gettoken__subscribe}>
            <h4>
              {translations?.publish_in_social}{" "}
              <a
                target="_blank"
                style={{ textTransform: "lowercase" }}
                href="https://t.me/Ismail0v12"
              >
                {translations?.admin}
              </a>
            </h4>
          </li>
          <li className={styles.gettoken__subscribe}>
            <h4>
              {translations?.buy_any}{" "}
              <LinkQuery href="/" passHref>
                <a style={{ textTransform: "lowercase" }}>
                  {translations?.goods}
                </a>
              </LinkQuery>{" "}
              <span style={{ textTransform: "lowercase" }}>
                {translations.or_uslugu}
              </span>{" "}
              <a
                target="_blank"
                style={{ textTransform: "lowercase" }}
                href="https://t.me/Ismail0v12"
              >
                {translations?.admin}
              </a>
            </h4>
          </li>
          <li className={styles.gettoken__subscribe}>
            <h4>
              {translations?.type_metamask_id}{" "}
              <a
                target="_blank"
                href="https://t.me/Ismail0v12"
                style={{ textTransform: "lowercase" }}
              >
                {translations?.tg_bot}
              </a>{" "}
              , {translations?.and_wait}
            </h4>
          </li>
          <li>
            <div className={styles.user__links}>
              <h4>{translations?.get_link_for}</h4>
              <ul>{links}</ul>
              <Input
                name="link"
                label={`${
                  generatedLink
                    ? generatedLink?.title + " " + translations?.link
                    : translations?.please_generate_link_above
                }`}
                copyText={generatedLink ? true : false}
                disabled={true}
                value={`${
                  generatedLink
                    ? generatedLink?.link
                    : translations?.generated_link_will_be_here
                }`}
                link={`${
                  generatedLink &&
                  generatedLink?.prefix_link + generatedLink?.link
                }`}
                generatedLink={`${
                  generatedLink
                    ? generatedLink?.link
                    : translations?.generated_link_will_be_here
                }`}
              />
              <Button
                onClick={() => setConnect(true)}
                text={`${translations?.total_clicks_through_link} ${userData?.total_refs}`}
                type="button"
              />
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
}

export { UserPageGetTokenTasks };
