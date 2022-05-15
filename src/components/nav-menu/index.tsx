import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import NavMenuIcon from "../assets/icons/NavMenuIcon";
import SearchIcon from "../assets/icons/SearchIcon";
import CloseIcon from "../assets/icons/CloseIcon";
import { NavMenuItem } from "./nav-menu-item";
import { getData } from "../../api/BaseApi";
import TranslationContext from "../../providers/translation-context";
import styles from "./style.module.css";

interface MenuProp {
  readonly id?: number;
  readonly childrenData?: MenuChildrenProp[];
  readonly link: number | undefined;
  readonly title: string;
}

export interface MenuChildrenProp extends MenuProp {
  readonly childrenData?: MenuChildrenProp[];
  readonly link: number | undefined;
  readonly title: string;
  readonly setShowMenu?: (showMenu: boolean) => void;
}

const NavMenu = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menu, setMenu] = useState([]);
  const [term, setTerm] = useState("");
  const navigate = useRouter();
  const { translations } = useContext(TranslationContext);

  useEffect(() => {
    getData("/categories/?", navigate.locale, "")
      .then((res) => setMenu(res.data))
      .catch((err) => console.log(err));
  }, [navigate.locale, navigate.query.country]);

  function onSearch(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    navigate.push(`/search?term=${term}&country=${navigate.query.country}`);
  }

  return (
    <div className={styles["nav-menu"]}>
      <NavMenuIcon
        onClick={() => setShowMenu((menu) => !menu)}
        className={styles.nav__icon}
      />
      <nav className={showMenu ? styles["active"] : ""}>
        <div className={styles.nav__header}>
          <h4>{translations?.categories}</h4>
          <span onClick={() => setShowMenu((menu) => !menu)}>
            <CloseIcon />
          </span>
        </div>
        <form onSubmit={onSearch}>
          <input
            placeholder={translations?.search}
            type="search"
            required={true}
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <button type="submit" onClick={() => setShowMenu(false)}>
            <SearchIcon />
          </button>
        </form>
        <ul className={styles.nav__parent}>
          {menu?.map(({ id, title, childrenData }: MenuProp) => (
            <NavMenuItem
              link={id}
              title={title}
              childrenData={childrenData}
              key={id}
              setShowMenu={setShowMenu}
            />
          ))}
        </ul>
      </nav>
      <div
        className={styles.nav__overlay}
        style={showMenu ? { opacity: "1", visibility: "visible" } : {}}
        onClick={() => setShowMenu(false)}
      />
    </div>
  );
};

export default NavMenu;
