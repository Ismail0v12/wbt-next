import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode";
import { Input } from "../../../components/reusable/input";
import { UserPageNavbar } from "./user-navbar";
import { Button } from "../../../components/reusable/button";
import CameraIcon from "../../../components/assets/icons/CameraIcon";
import { ParticlesAnime } from "../../../components/particles-anime";
import ChevronDownIcon from "../../../components/assets/icons/ChevronDownIcon";
import { UserDataInterface } from "../../../Interfaces/UserDataInterface";
import { getData, putData } from "../../../api/BaseApi";
import Spinner from "../../../components/spinner";
import TranslationContext from "../../../providers/translation-context";
import default_image_user from "../../../components/assets/images/default_user_image.png";
import styles from "../style.module.css";

const UserPageForm = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<number | string>("");
  const [gender, setGender] = useState<
    { id: number | null; title: string }[] | undefined
  >(undefined);
  const [userData, setUserData] = useState<UserDataInterface | undefined>(
    undefined
  );
  const [image, setImage] = useState<any>(undefined);

  const navigate = useRouter();
  const { translations } = useContext(TranslationContext);

  useEffect(() => {
    const token =
      sessionStorage.getItem("accessSession") || localStorage.getItem("access");
    if (token !== null) {
      const decodedToken: { user_id: number } = jwtDecode(token);
      setUserId(decodedToken.user_id);
    }
  }, []);

  useEffect(() => {
    getData("/genders/?", navigate.locale, "")
      .then((res) => setGender(res.data))
      .catch((err) => console.log(err));
    getData(`/profile/${userId}/?`, navigate.locale, "")
      .then((res) => {
        setUserData(res.data);
        setImage(res.data.photo);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [userId, navigate.locale]);

  async function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files != null) {
      const formData = new FormData();
      formData.append("photo", e.target.files[0]);

      putData(`/profile/${userData?.id}/`, formData, "multipart/form-data")
        .then((res) => setImage(res.data.photo))
        .catch((err) => console.log(err));
    }
  }

  function handleUserChange(data: object) {
    putData(`/profile/${userData?.id}/`, data)
      .then((res) => {
        if (res) {
          navigate.push("/profile");
        }
      })
      .catch((err) => console.log(err));
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <section className={styles.user__form}>
      <UserPageNavbar />
      <ParticlesAnime />
      <div className="container" style={{ paddingTop: "62px" }}>
        <div className={styles["user__form-image"]}>
          <img
            src={
              image
                ? "https://whitebridge.site" + image
                : default_image_user.src
            }
            alt="whitebridge.club"
          />
          <label htmlFor="image">
            <CameraIcon />
            <input
              type="file"
              onChange={handleImage}
              accept="image/jpeg, image/png"
              id="image"
              hidden={true}
            />
          </label>
        </div>
        <Formik
          initialValues={{
            full_name: "" || userData?.fullname,
            birthday: "" || userData?.birthday,
            gender: "" || userData?.gender,
            email: "" || userData?.user.email,
            phone: "" || userData?.phone,
          }}
          enableReinitialize={true}
          onSubmit={(values) => {
            const object = {
              fullname: values.full_name,
              birthday: values.birthday,
              user: {
                email: values.email,
              },
              gender: values.gender,
              phone: values.phone,
            };
            handleUserChange(object);
          }}
        >
          {({ values, handleChange, setFieldValue }) => (
            <Form className={styles["form__grid"]}>
              <Input
                name="full_name"
                label={translations?.full_name}
                value={values.full_name}
                onChange={handleChange}
              />
              <Input
                name="birthday"
                label={translations?.birthday}
                isCalendar={true}
                type="date"
                value={values.birthday || ""}
                onChange={handleChange}
              />
              <div
                className={styles.user__dropdown}
                onClick={() => setShowDropdown((d) => !d)}
              >
                <span>{translations?.gender}</span>
                <div className={styles.dropdown__value}>
                  <span>
                    {gender?.find((item) => item.id === values.gender)?.title ||
                      translations?.please_choose_gender}
                  </span>
                  <ChevronDownIcon />
                </div>
                <div
                  className={
                    showDropdown
                      ? styles["dropdown__options"] + " " + styles["active"]
                      : styles["dropdown__options"]
                  }
                >
                  {gender?.map((item: { id: number | null; title: string }) => (
                    <span
                      onClick={() => {
                        setFieldValue("gender", item.id);
                      }}
                      key={item.id}
                      className={values.gender === item.id ? "active" : ""}
                    >
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
              <Input
                name="email"
                label={translations?.email}
                value={values.email}
                onChange={handleChange}
              />
              <Input
                name="phone"
                label={translations?.phone_number}
                value={values.phone}
                onChange={handleChange}
              />
              <Button text={translations?.save} type="submit" />
            </Form>
          )}
        </Formik>
      </div>
    </section>
  );
};

export default UserPageForm;
