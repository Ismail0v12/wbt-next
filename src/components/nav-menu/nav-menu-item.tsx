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
  const { locale } = useRouter();

  return (
    <li className={styles["nav-menu__item"]}>
      <div onClick={() => setShowMenu && setShowMenu(false)}>
        <LinkQuery href={"/category/" + link} passHref locale={locale}>
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
                  <a>{item.title}</a>
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
