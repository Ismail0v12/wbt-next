import React from "react";
import { LinkQuery } from "../../components/link-query";
import AuthPageForm from "./auth-form";
import AuthPageFormSocial from "./auth-social";
import styles from "./style.module.css";

interface AuthPageProps {
  readonly translations: any;
}

const AuthPage = ({ translations }: AuthPageProps) => {
  return (
    <section className={styles.authentication}>
      <h4 className="auth__title">{translations?.join_free_today}</h4>
      <h2 className="auth__subtitle">{translations?.create_account}</h2>
      <AuthPageForm />
      <AuthPageFormSocial />
      <div className="auth__links">
        <span>{translations?.already_have_an_account}</span>
        {translations?.log_in && (
          <LinkQuery href="/login" passHref>
            {translations?.log_in}
          </LinkQuery>
        )}
      </div>
    </section>
  );
};

export default AuthPage;
