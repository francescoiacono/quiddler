import { cx } from "@styled-system/css";
import { Home, Search } from "lucide-react";
import { NavLink } from "react-router";
import { copy } from "@/i18n/copy";
import { styles } from "./bottom-nav.styles";

/** Primary app navigation used by mobile-first routes. */
export const BottomNav = () => {
  const navCopy = copy.app.navigation;

  return (
    <nav aria-label={navCopy.primaryLabel} className={styles.nav}>
      <NavLink
        className={({ isActive }) => cx(styles.link, isActive && styles.activeLink)}
        to="/game"
      >
        <Home className={styles.icon} />
        <span>{navCopy.game}</span>
      </NavLink>
      <NavLink
        className={({ isActive }) => cx(styles.link, isActive && styles.activeLink)}
        to="/word-checker"
      >
        <Search className={styles.icon} />
        <span>{navCopy.wordChecker}</span>
      </NavLink>
    </nav>
  );
};
