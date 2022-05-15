import React from "react";
import { LoginPageForm } from "./login-form";
import { LoginPageFormSocial } from "./login-form-social";
import { LinkQuery } from "../../components/link-query";
import styles from "./style.module.css";

const Login = (props: any) => {
  const { translations } = props;
  return (
    <section id="login" className={styles.login}>
      <h4 className="auth__title">{translations?.welcome}</h4>
      <h2 className="auth__subtitle">{translations?.log_in_to_your_account}</h2>
      <LoginPageForm />
      <LoginPageFormSocial />
      <div className="auth__links">
        <span>{translations?.dont_have_an_account}</span>
        {translations?.join_free_today && (
          <LinkQuery href="/authentication" passHref>
            {translations?.join_free_today}
          </LinkQuery>
        )}
      </div>
    </section>
  );
};

export default Login;
