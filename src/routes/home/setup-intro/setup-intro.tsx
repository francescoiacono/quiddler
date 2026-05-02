import { WalletCards } from "lucide-react";
import { copy } from "@/i18n/copy";
import { styles } from "./setup-intro.styles";

export const SetupIntro = () => {
  const homeCopy = copy.routes.home;

  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <span className={styles.headerIcon}>
          <WalletCards className={styles.cardsIcon} />
        </span>
        <h2 className={styles.title} id="home-title">
          {homeCopy.title}
        </h2>
      </div>
      <p className={styles.intro}>{homeCopy.intro}</p>
    </div>
  );
};
