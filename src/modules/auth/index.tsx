import React, { useState } from "react";
import { SentEmailIcon } from "../../components/assets/icons/SentEmailIcon";
import { LinkQuery } from "../../components/link-query";
import AuthPageForm from "./auth-form";
import AuthPageFormSocial from "./auth-social";
import styles from "./style.module.css";

interface AuthPageProps {
  readonly translations: any;
}

const AuthPage = ({ translations }: AuthPageProps) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [inbox, setInbox] = useState("");
  return (
    <section className={styles.authentication}>
      {isSuccess && (
        <div className="check__email">
          <h4 className="auth__subtitle check__email-title">
            Check your email
          </h4>
          <div className="check__email-img">
            <SentEmailIcon />
          </div>
          <p className="check__email-text">
            Check your <strong>{inbox}</strong> inbox for instructions from us
            on <br /> how to verify your account.
          </p>
          {translations?.log_in && (
            <LinkQuery href="/login" passHref>
              <a className="check__email-text">Go to login screen</a>
            </LinkQuery>
          )}
        </div>
      )}
      {!isSuccess && (
        <>
          <h4 className="auth__title">{translations?.join_free_today}</h4>
          <h2 className="auth__subtitle">{translations?.create_account}</h2>
          <AuthPageForm setIsSuccess={setIsSuccess} setInbox={setInbox} />
          <AuthPageFormSocial />
          <div className="auth__links">
            <span>{translations?.already_have_an_account}</span>
            {translations?.log_in && (
              <LinkQuery href="/login" passHref>
                {translations?.log_in}
              </LinkQuery>
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default AuthPage;
