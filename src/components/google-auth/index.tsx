import { useContext, useState } from "react";
import { useRouter } from "next/router";
import GoogleLogin, {
  GoogleLoginResponseOffline,
  GoogleLoginResponse,
} from "react-google-login";
import AuthenticationContext from "../../providers/authentication-context";
import GoogleIcon from "../assets/icons/GoogleIcon";
import { postData } from "../../api/BaseApi";
import Spinner from "../spinner";

interface GoogleInterface {
  readonly response: GoogleLoginResponse | GoogleLoginResponseOffline;
  readonly responseSuccess: (response: GoogleInterface) => Promise<void>;
}

function GoogleAuth() {
  const { logIn } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const responseGoogle = (response: any) => {
    postData("/google/", {
      ...response,
      auth_token: "",
    })
      .then(async (res) => {
        await logIn({
          access: res.data.access,
          refresh: res.data.refresh,
          remember: true,
        });
        setLoading(false);
        navigate.push(`/profile?country=${navigate.query.country}`);
      })
      .catch((err) => {
        if (err) {
          setLoading(false);
        }
      });
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <GoogleLogin
      clientId="53294661229-m43e0gvh0btfa0uvmcrinuphie187na3.apps.googleusercontent.com"
      onRequest={() => setLoading(true)}
      onFailure={() => setLoading(false)}
      onSuccess={responseGoogle}
      render={(renderProps) => (
        <span onClick={renderProps.onClick}>
          <GoogleIcon />
        </span>
      )}
      redirectUri="https://whitebridge.site/api/google/"
    />
  );
}

export { GoogleAuth };
