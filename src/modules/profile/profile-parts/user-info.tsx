import React, { useContext, useEffect, useState } from "react";
import { LinkQuery } from "../../../components/link-query";
import jwtDecode from "jwt-decode";
import { getData } from "../../../api/BaseApi";
import PencilIcon from "../../../components/assets/icons/PencilIcon";
import AuthenticationContext from "../../../providers/authentication-context";
import logo from "../../../components/assets/logos/logo.png";
import TranslationContext from "../../../providers/translation-context";
import UserInfoContext from "../../../providers/user-info-context";
import default_image_user from "../../../components/assets/images/default_user_image.png";

import styles from "../style.module.css";

interface UserPageInfoProps {
  readonly setConnect: (open: boolean) => void;
}

function imageUrlValidator(image: string | undefined) {
  if (
    (image && image.indexOf("https://") !== -1) ||
    (image && image.indexOf("http://") !== -1)
  ) {
    return image;
  } else {
    return "https://whitebridge.site" + image;
  }
}

const UserPageInfo = ({ setConnect }: UserPageInfoProps) => {
  const [token, setToken] = useState<number | string>("");
  const { setUserData, userData } = useContext(UserInfoContext);
  const { logOut } = useContext(AuthenticationContext);

  useEffect(() => {
    const accessSession = sessionStorage.getItem("accessSession");
    const access = localStorage.getItem("access");
    const currToken = accessSession || access;
    if (currToken !== null) {
      const decodedToken: { user_id: number } = jwtDecode(currToken);
      setToken(decodedToken.user_id);
    }
  }, []);

  const { translations } = useContext(TranslationContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (token) {
      getData(`/profile/${token}/?`, "", "")
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err));
    }
  }, [token, setUserData]);

  return (
    <div className={styles.user__info}>
      <div className={styles.user__card}>
        <div>
          <img
            src={
              userData?.photo
                ? imageUrlValidator(userData?.photo)
                : default_image_user.src
            }
            alt="whitebridge.club"
          />
        </div>
        <div className={styles.user__title}>
          <h4>
            {!userData?.fullname ? "-----" : userData?.fullname}
            <LinkQuery href="/profile/edit" passHref>
              <a>
                <PencilIcon />
              </a>
            </LinkQuery>
          </h4>
          <ul>
            <li>
              E-mail: {!userData?.user?.email ? "-----" : userData?.user?.email}
            </li>
            <li>
              {translations?.number}:{" "}
              {!userData?.phone ? "-----" : userData?.phone}
            </li>
            <li>
              {translations?.birthday}:{" "}
              {!userData?.birthday ? "-----" : userData?.birthday}
            </li>
            <li>
              {translations?.gender}:{" "}
              {!userData?.gender_text ? "-----" : userData?.gender_text}
            </li>
          </ul>
          <LinkQuery passHref href="/change-password">
            <a className={styles.user__edit}>{translations?.change_password}</a>
          </LinkQuery>
          <button onClick={logOut} className={styles.user__button}>
            {translations?.leave_profile}
          </button>
        </div>
      </div>
      <div className={styles.user__logo}>
        <img src={logo.src} alt="White Bridge Club" />
      </div>
    </div>
  );
};

export { UserPageInfo };
