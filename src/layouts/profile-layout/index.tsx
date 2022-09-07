import { useRouter } from "next/router";
import { useContext } from "react";
import { Footer } from "../../components/footer";
import Spinner from "../../components/spinner";
import AuthenticationContext from "../../providers/authentication-context";

interface ProfileLayoutProps {
  readonly children: React.ReactNode;
}

export function ProfileLayout({ children }: ProfileLayoutProps) {
  const { access } = useContext(AuthenticationContext);
  const { push } = useRouter();

  if (typeof access === "string") {
    if (access.length === 0 || access === null) {
      push("/login");
    }
  }

  if (typeof access === "string") {
    if (access.length === 0 || access === null) {
      return <Spinner />;
    }
  }

  return (
    <>
      {children}
      {access?.toString().length !== 0 && <Footer />}
    </>
  );
}
