import { useRouter } from "next/router";
import React, { createContext, useEffect, useState } from "react";
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
  const [contactLinks, setContactLinks] = useState([]);

  useEffect(() => {
    getData("/contact-links/?", "", "").then((res) =>
      setContactLinks(res.data)
    );
  }, []);

  const context = { contactLinks };

  return (
    <ContactLinksContext.Provider value={context}>
      {children}
    </ContactLinksContext.Provider>
  );
}

export default ContactLinksContext;
