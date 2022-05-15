import React, { useContext } from "react";
import ContactLinksContext from "../../../../providers/contact-links-context";
import { ContactLinksInterface } from "../../../../Interfaces/ContactLinksInterface";

function SocialSubscription() {
  const { contactLinks } = useContext(ContactLinksContext);
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
