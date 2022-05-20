import React, { useContext, useEffect, useState } from "react";
import ContactLinksContext from "../../../../providers/contact-links-context";
import { ContactLinksInterface } from "../../../../Interfaces/ContactLinksInterface";
import { getData } from "../../../../api/BaseApi";

interface SocialSubscriptionProps {
  readonly country?: string;
}

function SocialSubscription({ country = "" }: SocialSubscriptionProps) {
  const [contactLinks, setContactLinks] = useState([]);
  useEffect(() => {
    getData("/contact-links/?", "en", country).then((res) =>
      setContactLinks(res.data)
    );
  }, [country]);
  const links = contactLinks?.map((item: ContactLinksInterface) => (
    <li key={item.id}>
      <a href={item.link} target="_blank" rel="noreferrer">
        <img src={item.icon} alt="whitebridge.club contact" />
      </a>
    </li>
  ));
  return <ul>{links}</ul>;
}

export { SocialSubscription };
