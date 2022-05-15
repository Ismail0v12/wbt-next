import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Button } from "../reusable/button";
import { postData } from "../../api/BaseApi";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

const FooterForm = () => {
  const [email, setEmail] = useState("");
  const { translations } = useContext(TranslationContext);

  function emailSentHandler(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    postData("/email-list/", {
      email,
    })
      .then((res) => {
        if (res) {
          window.scrollTo(0, 0);
          setEmail("");
          toast(`${translations?.thank_you_for_your_subscribing} :)`, {
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
        if (err) {
          toast(`${translations?.please_try_again} :(`, {
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
        }
      });
  }

  return (
    <form className={styles.footer__form} onSubmit={emailSentHandler}>
      <h4>{translations?.subscribe_to_stay_tuned_for_latest_updates}</h4>
      <span>{translations?.lets_do_it}</span>
      <div>
        <input
          type="email"
          required={true}
          placeholder={translations?.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button text={translations?.subscribe} type="submit" />
      </div>
    </form>
  );
};

export { FooterForm };
