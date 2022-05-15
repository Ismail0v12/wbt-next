import { useRouter } from "next/router";
import { useContext } from "react";
import Spinner from "../../components/spinner";
import AuthenticationContext from "../../providers/authentication-context";

interface ProfileLayoutProps {
  readonly children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  const { access } = useContext(AuthenticationContext);
  const { push, asPath } = useRouter();

  if (typeof access === "string") {
    if (access.length === 0) {
      push("/login", "/login", { shallow: false });
    }
  }

  if (typeof access === "string") {
    if (access.length === 0) {
      return <Spinner />;
    }
  }

  return <>{children}</>;
}
