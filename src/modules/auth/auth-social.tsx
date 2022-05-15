import React from "react";
import { GoogleAuth } from "../../components/google-auth";
import { FacebookAuth } from "../../components/facebook-auth";

function AuthPageFormSocial() {
  return (
    <div className="login__social">
      <div className="auth__or">- OR -</div>
      <div className="auth__social-icons">
        <GoogleAuth />
        <FacebookAuth />
      </div>
    </div>
  );
}

export default AuthPageFormSocial;
