import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import { Input } from "../../components/reusable/input";
import { Button } from "../../components/reusable/button";
import { postData } from "../../api/BaseApi";
import AuthenticationContext from "../../providers/authentication-context";
import TranslationContext from "../../providers/translation-context";
import * as Yup from "yup";
import styles from "./style.module.css";
import { LinkQuery } from "../../components/link-query";

function LoginPageForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [remember, setRemember] = useState(false);
  const { logIn } = useContext(AuthenticationContext);
  const navigate = useRouter();
  const { translations } = useContext(TranslationContext);
  const [isLoading, setIsLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(`${translations?.invalid_email}`)
      .required(`${translations?.required}`),
    password: Yup.string()
      .min(5, `${translations?.too_short}`)
      .required(`${translations?.please_fill_out_this_field}`),
  });
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setFieldError, setFieldValue }) => {
          setIsLoading(true);
          postData("/token/", values)
            .then(async (res) => {
              if (res) {
                const resLogin = {
                  access: res.data.access,
                  refresh: res.data.refresh,
                  remember,
                };
                await logIn(resLogin);
                setIsLoading(false);
                navigate.push("/profile");
              }
            })
            .catch((err) => {
              if (err) {
                setFieldError(
                  "email",
                  `${translations?.password_or_email_incorrect}`
                );
                setFieldValue("password", "");
                setIsLoading(false);
              }
            });
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form className={styles.login}>
            <Input
              name="email"
              label={translations?.email}
              required={true}
              type="email"
              autoComplete="username"
              value={values.email}
              onChange={handleChange}
              errorName={errors.email}
              labelClass={styles.input}
            />
            <Input
              name="password"
              label={translations?.password}
              type={showPassword ? "text" : "password"}
              required={true}
              isTypePassword={true}
              setShowPassword={setShowPassword}
              autoComplete="current-password"
              value={values.password}
              onChange={handleChange}
              errorName={errors.password}
            />
            <div className="auth__checkbox">
              <label htmlFor="remember">
                <input
                  type="checkbox"
                  id="remember"
                  onChange={() => setRemember((checked) => !checked)}
                  checked={remember}
                />
                <span>{translations?.remember_me}</span>
              </label>
              <LinkQuery href="/reset-password">
                <a>{translations?.forgot_password}</a>
              </LinkQuery>
            </div>
            <Button
              text={translations?.log_in}
              type="submit"
              isLoading={isLoading}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export { LoginPageForm };
