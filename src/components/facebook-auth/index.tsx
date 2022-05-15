import { useContext, useState } from "react";
import { useRouter } from "next/router";
import FacebookLogin from "react-facebook-login";
import FacebookRoundedIcon from "../assets/icons/FacebookRoundedIcon";
import { postData } from "../../api/BaseApi";
import AuthenticationContext from "../../providers/authentication-context";
import Spinner from "../spinner";

function FacebookAuth() {
  const { logIn } = useContext(AuthenticationContext);
  const [loading, setLoading] = useState(false);
  const navigate = useRouter();

  const responseFacebook = (response: any) => {
    postData("/facebook/", {
      ...response,
    })
      .then(async (res) => {
        if (res) {
          await logIn({
            access: res.data.access,
            refresh: res.data.refresh,
            remember: true,
          });
          setLoading(false);
          navigate.push(`/profile?country=${navigate.query.country}`);
        }
      })
      .catch((err) => console.log(err));
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <FacebookLogin
      fields="name,email,picture,birthday,gender,phone"
      icon={<FacebookRoundedIcon />}
      callback={responseFacebook}
      textButton=""
      redirectUri="https://whitebridge.site/api/google/"
      onClick={() => setLoading(true)}
      buttonStyle={{
        width: "51px",
        height: "51px",
        padding: "0px",
        borderRadius: "100%",
        backgroundColor: "var(--white)",
        border: "1px solid transparent",
      }}
      appId="612463733384453"
    />
  );
}

export { FacebookAuth };
