import { WalletCards } from "lucide-react";
import { copy } from "@/i18n/copy";
import { styles } from "./setup-intro.styles";

export const SetupIntro = () => {
  const homeCopy = copy.routes.home;

  return (
    <div className={styles.header}>
      <span className={styles.headerIcon}>
        <WalletCards className={styles.cardsIcon} />
      </span>
      <div className={styles.headerText}>
        <p className={styles.kicker}>{homeCopy.kicker}</p>
        <h2 className={styles.title} id="home-title">
          {homeCopy.title}
        </h2>
        <p className={styles.intro}>{homeCopy.intro}</p>
      </div>
    </div>
  );
};
