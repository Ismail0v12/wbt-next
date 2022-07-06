import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";
import * as Yup from "yup";
import { Input } from "../../components/reusable/input";
import { Button } from "../../components/reusable/button";
import { postData } from "../../api/BaseApi";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

interface AuthPageFormProps {
  readonly setIsSuccess: (isSuccess: boolean) => void;
  readonly setInbox: (inbox: string) => void;
}

function AuthPageForm({ setIsSuccess, setInbox }: AuthPageFormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [cookie, setCookie, removeCookie] = useCookies(["referal"]);
  const [isUploading, setIsUploading] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useRouter();
  const parsedRef = navigate.query.ref;
  const parsedSource = navigate.query.source;
  const { translations } = useContext(TranslationContext);

  const AuthPageFormSchema = Yup.object().shape({
    full_name: Yup.string()
      .min(4, `${translations?.too_short}`)
      .required(`${translations?.please_fill_out_this_field}`),
    email: Yup.string()
      .email(`${translations?.invalid_email}`)
      .required(`${translations?.please_fill_out_this_field}`),
    password: Yup.string()
      .min(5, `${translations?.too_short}`)
      .required(`${translations?.please_fill_out_this_field}`),
  });

  useEffect(() => {
    if (typeof cookie.referal == "undefined") {
      if (parsedRef != null && parsedSource != null) {
        setCookie(
          "referal",
          { ref: parsedRef, source: parsedSource },
          { path: "/auth", sameSite: false }
        );
      }
    }
  }, [cookie.referal, parsedRef, parsedSource, setCookie]);

  return (
    <>
      <Formik
        initialValues={{
          full_name: "",
          email: "",
          password: "",
        }}
        validationSchema={AuthPageFormSchema}
        validateOnBlur={false}
        validateOnChange={false}
        enableReinitialize={true}
        onSubmit={(values, { setFieldError, setFieldValue }) => {
          const data = {
            fullname: values.full_name,
            user: {
              email: values.email,
              password: values.password,
              ref: cookie.referal ? cookie.referal.ref : 0,
              source: cookie.referal ? cookie.referal.source : 0,
            },
          };
          setInbox(values.email);
          setIsUploading(true);
          postData("/profile/", data)
            .then((res) => {
              if (res) {
                removeCookie("referal", { path: "/authentication" });
                setIsSuccess(true);

                setIsUploading(false);
              }
            })
            .catch(() => {
              setIsUploading(false);
              setFieldError("email", translations.user_email_is_exist);
              setFieldValue("password", "");
              console.clear();
            });
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <Input
              name="full_name"
              label={translations?.full_name}
              required={true}
              type="text"
              value={values.full_name}
              onChange={handleChange}
              errorName={errors.full_name}
              labelClass={styles.auth_input_1}
            />
            <Input
              name="email"
              label={translations?.email}
              required={true}
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={handleChange}
              errorName={errors.email}
              labelClass={styles.auth_input_2}
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
                  onChange={() => setAgree((checked) => !checked)}
                  checked={agree}
                  required={true}
                />
                <span>
                  {translations?.i_agree_terms_of_use_and_privacy_policy}
                </span>
              </label>
            </div>
            <Button
              text={translations?.sign_up}
              type="submit"
              disabled={!agree}
              isLoading={isUploading}
            />
          </Form>
        )}
      </Formik>
    </>
  );
}

export default AuthPageForm;
