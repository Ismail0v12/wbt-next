import { useRouter } from "next/router";
import React, { createContext } from "react";
import useSWR from "swr";
import { getData } from "../api/BaseApi";

interface ContactLinksContextProps {
  readonly children: React.ReactNode;
}

const ContactLinksContext = createContext({
  contactLinks: [],
});

export function ContactLinksContextProvider({
  children,
}: ContactLinksContextProps) {
  const { locale } = useRouter();

  const { data } = useSWR("/contact-links/?", (url) =>
    getData(url, locale || "en", "")
  );
  const context = { contactLinks: data?.data };

  return (
    <ContactLinksContext.Provider value={context}>
      {children}
    </ContactLinksContext.Provider>
  );
}

export default ContactLinksContext;
