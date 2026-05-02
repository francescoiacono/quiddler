import { copy } from "@/i18n/copy";
import { styles } from "./setup-intro.styles";

export const SetupIntro = () => {
  const homeCopy = copy.routes.home;

  return (
    <div className={styles.header}>
      <h1 className={styles.title} id="home-title">
        {homeCopy.title}
      </h1>
      <p className={styles.intro}>{homeCopy.intro}</p>
    </div>
  );
};
