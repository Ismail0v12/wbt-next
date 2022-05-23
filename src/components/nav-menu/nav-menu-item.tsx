import { LinkQuery } from "../link-query";
import { useRouter } from "next/router";
import ChevronRightIcon from "../../components/assets/icons/ChevronRightIcon";
import { MenuChildrenProp } from "./index";
import styles from "./style.module.css";

const NavMenuItem = ({
  link,
  title,
  childrenData,
  setShowMenu,
}: MenuChildrenProp) => {
  const { locale, pathname, asPath, query } = useRouter();
  const activeClassName =
    asPath === `/category/${link}?country=${query.country}`;

  return (
    <li className={styles["nav-menu__item"]}>
      <div
        onClick={() => setShowMenu && setShowMenu(false)}
        className={activeClassName ? styles.active : ""}
      >
        <LinkQuery href={`/category/${link}`} passHref locale={locale}>
          <a>{title}</a>
        </LinkQuery>
        {childrenData && childrenData?.length !== 0 && (
          <span>
            <ChevronRightIcon />
          </span>
        )}
      </div>
      {childrenData && childrenData?.length !== 0 && (
        <ul className={styles.first__children}>
          {childrenData?.map((item, index) => (
            <li key={index}>
              <div onClick={() => setShowMenu && setShowMenu(false)}>
                <LinkQuery
                  href={"/category/" + item.id}
                  passHref
                  locale={locale}
                >
                  <a
                    className={
                      pathname === `/category/${item.id}` ? "active" : ""
                    }
                  >
                    {item.title}
                  </a>
                </LinkQuery>
              </div>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};

export { NavMenuItem };
