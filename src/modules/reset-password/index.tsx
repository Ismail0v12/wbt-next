import React, { useContext, useState } from "react";
import { LinkQuery } from "../../components/link-query";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import dynamic from "next/dynamic";
import { ResetPasswordInterface } from "../../Interfaces/ResetPasswordInterface";
import { Input } from "../../components/reusable/input";
import { Button } from "../../components/reusable/button";
import { postData } from "../../api/BaseApi";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

const DynamicPinInput = dynamic(() => import("./reset-password-input"), {
  ssr: false,
});

const ResetPasswordPage = () => {
  const [resetForm, setResetForm] = useState<ResetPasswordInterface>({
    email: "",
    code: "",
    password: "",
    password_confirm: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isEmailWritten, setIsEmailWritten] = useState<boolean>(true);
  const [isCodeWritten, setIsCodeWritten] = useState<boolean>(false);
  const [isPasswordWritten, setIsPasswordWritten] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | undefined>(undefined);
  const { translations } = useContext(TranslationContext);
  const [isLoading, setIsLoading] = useState(false);
  const ResetPasswordValidation = Yup.object({
    password: Yup.string()
      .min(5, `${translations?.too_short}`)
      .required(`${translations?.please_fill_out_this_field}`),
    password_confirm: Yup.string().oneOf(
      [Yup.ref("password"), null],
      `${translations?.password_must_match}`
    ),
  });

  function verfiyEmail(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    postData("/profile/reset-password1/", { email: resetForm.email })
      .then((res) => {
        if (res) {
          setIsEmailWritten(false);
          setIsCodeWritten(true);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (err) {
          setIsLoading(false);
          setEmailError(`${translations?.email_is_incorrect}`);
        }
      });
  }

  function verfiyCode(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    postData("/profile/reset-password2/", {
      email: resetForm.email,
      code: resetForm.code,
    })
      .then((res) => {
        if (res) {
          setIsCodeWritten(false);
          setIsPasswordWritten(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
        alert("Code is incorrect");
      });
  }

  return (
    <section className={styles["reset-password"]}>
      <>
        {isEmailWritten && (
          <>
            <h4 className="auth__title">{translations?.join_free_today}</h4>
            <h2 className="auth__subtitle">{translations?.forgot_password}</h2>
            <form onSubmit={verfiyEmail}>
              <Input
                name="email"
                label={translations?.email}
                required={true}
                value={resetForm.email}
                labelClass={styles["custom-input-1"]}
                onChange={(e) => {
                  setResetForm((state) => {
                    return {
                      ...state,
                      email: e.target.value,
                    };
                  });
                }}
                errorName={emailError}
              />
              <Button
                text={translations?.next}
                type="submit"
                disabled={resetForm.email.length === 0}
                isLoading={isLoading}
              />
            </form>
          </>
        )}
      </>
      <>
        {isCodeWritten && (
          <>
            <h4 className="auth__title">{translations?.code}</h4>
            <h2 className="auth__subtitle">{translations?.otp_code}</h2>
            <form onSubmit={verfiyCode}>
              <span className={styles["reset-password__code"]}>
                {translations?.sent_email_code_to_email}
              </span>
              {typeof window !== "undefined" && (
                <DynamicPinInput
                  length={5}
                  onChange={(value: any) =>
                    setResetForm((state) => {
                      return {
                        ...state,
                        code: value,
                      };
                    })
                  }
                  type="custom"
                />
              )}

              <Button
                text={translations?.next}
                type="submit"
                disabled={resetForm.code.length !== 5}
                isLoading={isLoading}
              />
            </form>
          </>
        )}
      </>
      <>
        {isPasswordWritten && (
          <>
            <h4 className="auth__title">{translations?.do_not_worry}</h4>
            <h2 className="auth__subtitle">{translations?.reset_password}</h2>
            <Formik
              initialValues={{
                password: "",
                password_confirm: "",
                email: resetForm.email,
                code: resetForm.code,
              }}
              validationSchema={ResetPasswordValidation}
              onSubmit={(values) => {
                setIsLoading(true);

                postData("/profile/reset-password3/", {
                  password: values.password,
                  email: values.email,
                  code: values.code,
                })
                  .then((res) => {
                    if (res) {
                      setIsLoading(false);
                      toast(`${translations?.successfully_changed}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        type: "success",
                      });
                    }
                  })
                  .catch((err) => {
                    if (err.response.status) {
                      toast(`${translations?.please_try_again}`, {
                        position: "top-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                        type: "error",
                      });
                      setIsLoading(false);
                    }
                  });
              }}
            >
              {({ values, handleChange }) => (
                <Form>
                  <Input
                    name="password"
                    value={values.password}
                    label={translations?.new_password}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    isTypePassword={true}
                    labelClass={styles["custom-input-1"]}
                    setShowPassword={setShowPassword}
                  />
                  <Input
                    name="password_confirm"
                    label={translations?.new_password_again}
                    value={values.password_confirm}
                    onChange={handleChange}
                    type={showPassword ? "text" : "password"}
                    isTypePassword={true}
                  />
                  <Button
                    text={translations?.next}
                    type="submit"
                    style={{ marginTop: "28px" }}
                    isLoading={isLoading}
                  />
                </Form>
              )}
            </Formik>
          </>
        )}
      </>
      <div className="auth__links">
        <span>{translations?.already_have_an_account} </span>
        <LinkQuery href="/login" passHref>
          <a>{translations?.log_in}</a>
        </LinkQuery>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
