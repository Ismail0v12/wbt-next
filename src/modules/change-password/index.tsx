import React, { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import jwtDecode from "jwt-decode";
import { Input } from "../../components/reusable/input";
import { Button } from "../../components/reusable/button";
import { postDataWithToken } from "../../api/BaseApi";
import AuthenticationContext from "../../providers/authentication-context";
import styles from "./style.module.css";

const ValidationSchema = Yup.object({
  old_password: Yup.string()
    .min(5, "Too Short!")
    .required("Please fill out this field!"),
  new_password: Yup.string()
    .min(5, "Too Short!")
    .required("Please fill out this field!"),
  confirm_password: Yup.string()
    .min(5, "Too Short!")
    .required("Please fill out this field!")
    .oneOf([Yup.ref("new_password"), null], "Passwords must match"),
});

const ChangePasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userId, setUserId] = useState<number>();
  const { logOut } = useContext(AuthenticationContext);

  useEffect(() => {
    const token =
      (sessionStorage.getItem("accessSession") as string) ||
      (localStorage.getItem("access") as string);
    if (token) {
      const decodedToken: { user_id: number } = jwtDecode(token);
      setUserId(decodedToken.user_id);
    }
  }, []);

  return (
    <section className={styles["change-password"]}>
      <h4 className="auth__title">Want to change password?</h4>
      <h2 className="auth__subtitle mb-4">Change password</h2>
      <Formik
        initialValues={{
          old_password: "",
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={ValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values) => {
          postDataWithToken("/profile/change-password/", {
            old_password: values.old_password,
            new_password: values.new_password,
            user_id: userId,
          })
            .then((res) => {
              if (res) {
                toast("Successfully changed ;)", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  type: "success",
                });
                logOut();
              }
            })
            .catch((err) => {
              if (err) {
                toast("Old password is incorrect :(", {
                  position: "top-center",
                  autoClose: 3000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  type: "error",
                });
              }
            });
        }}
      >
        {({ errors, handleChange, values }) => (
          <Form>
            <Input
              onChange={handleChange}
              name="old_password"
              label="Old Password"
              value={values.old_password}
              isTypePassword={true}
              type={showPassword ? "text" : "password"}
              errorName={errors.old_password}
              setShowPassword={setShowPassword}
            />
            <Input
              onChange={handleChange}
              value={values.new_password}
              name="new_password"
              label="New Password"
              isTypePassword={true}
              type={showPassword ? "text" : "password"}
              errorName={errors.new_password}
            />
            <Input
              onChange={handleChange}
              value={values.confirm_password}
              name="confirm_password"
              label="New Password Again"
              isTypePassword={true}
              type={showPassword ? "text" : "password"}
              errorName={errors.confirm_password}
            />
            <Button text="Save" type="submit" />
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ChangePasswordPage;
