import React, { useContext } from "react";
import { GoogleAuth } from "../../components/google-auth";
import { FacebookAuth } from "../../components/facebook-auth";
import TranslationContext from "../../providers/translation-context";

function LoginPageFormSocial() {
  const { translations } = useContext(TranslationContext);
  return (
    <div className="login__social">
      <div className="auth__or">- {translations?.or} -</div>
      <div className="auth__social-icons">
        <GoogleAuth />
        <FacebookAuth />
      </div>
    </div>
  );
}

export { LoginPageFormSocial };
