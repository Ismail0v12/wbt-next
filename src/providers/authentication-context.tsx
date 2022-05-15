import { createContext, useEffect, useState } from "react";
import { postDataWithToken } from "../api/BaseApi";
import { useRouter } from "next/router";

interface LogInProps {
  readonly access: string;
  readonly refresh: string;
  readonly remember: boolean;
}

interface AuthenticationContextProviderProps {
  readonly children: React.ReactNode;
}

interface Props {
  isAuthorized: boolean;
  access: string | false | null;
  refresh: string | false | null;
  logIn: ({ access, refresh, remember }: LogInProps) => void;
  logOut: () => void;
}

const AuthenticationContext = createContext<Props>({
  isAuthorized: false,
  access: "",
  refresh: "",
  logIn: ({ access, refresh, remember }: LogInProps) => {},
  logOut: () => {},
});

export function AuthenticationContextProvider({
  children,
}: AuthenticationContextProviderProps) {
  const ISSERVER = typeof window === "undefined";
  const accessSession =
    !ISSERVER && window.sessionStorage.getItem("accessSession");
  const refreshSession =
    !ISSERVER && window.sessionStorage.getItem("refreshSession");
  const accessToken = !ISSERVER && window.localStorage.getItem("access");
  const refrehsToken = !ISSERVER && window.localStorage.getItem("refresh");
  const isAuthenticated: boolean =
    accessToken !== false &&
    refrehsToken !== false &&
    accessSession !== false &&
    refreshSession !== false;

  const [authenticated, setAuthenticated] = useState<boolean>(isAuthenticated);
  const router = useRouter();

  function logIn({ access, refresh, remember }: LogInProps) {
    if (access && refresh) {
      setAuthenticated(true);
      if (remember && !ISSERVER) {
        localStorage.setItem("access", access);
        localStorage.setItem("refresh", refresh);
      } else {
        if (!ISSERVER) {
          sessionStorage.setItem("accessSession", access);
          sessionStorage.setItem("refreshSession", refresh);
        }
      }
    }
  }

  function logOut() {
    setAuthenticated(false);
    if (!ISSERVER) {
      sessionStorage.setItem("accessSession", "");
      sessionStorage.setItem("refreshSession", "");
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      const countryCode = localStorage.getItem("country_code");
      router.push(`/login?country=${countryCode}`);
    }
  }

  const context = {
    isAuthorized: authenticated,
    access: accessToken ? accessToken : accessSession,
    refresh: refrehsToken ? refrehsToken : refreshSession,
    logIn,
    logOut,
  };

  useEffect(() => {
    const thirtyMinutes: number = 1000 * 60 * 50;
    if (authenticated) {
      setInterval(() => {
        if (refreshSession) {
          postDataWithToken("/token/refresh/", {
            refresh: refreshSession,
          })
            .then((res) => {
              if (!ISSERVER) {
                sessionStorage.setItem("accessSession", res.data.access);
              }
            })
            .catch((err) => {
              if (err && !ISSERVER) {
                setAuthenticated(false);
                window.location.replace("/login");
              }
            });
        } else if (refrehsToken) {
          postDataWithToken("/token/refresh/", {
            refresh: refrehsToken,
          })
            .then((res) => {
              if (!ISSERVER) {
                localStorage.setItem("access", res.data.access);
              }
            })
            .catch((err) => {
              if (err) {
                setAuthenticated(false);
                document.location.replace("/login");
              }
            });
        }
      }, thirtyMinutes);
    }
  }, [authenticated, refrehsToken, refreshSession, ISSERVER]);

  return (
    <AuthenticationContext.Provider value={context}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContext;
