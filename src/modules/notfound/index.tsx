import React from "react";
import { LinkQuery } from "../../components/link-query";
import styles from "./style.module.css";

const NotFoundPage = () => {
  return (
    <div>
      <section className={styles.page_404}>
        <div className={styles.four_zero_four_bg}>
          <h1 className="text-center">404</h1>
        </div>
        <div className={styles.contant_box_404}>
          <h3 className={styles.h2}>Look like you're lost</h3>
          <p>the page you are looking for not avaible!</p>
          <LinkQuery href="/" passHref>
            <a className={styles.link_404}>Go to Home</a>
          </LinkQuery>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
