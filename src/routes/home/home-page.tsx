import { copy } from "@/i18n/copy";
import { styles } from "./home-page.styles";

export const HomePage = () => (
  <main className={styles.page}>
    <h1 className={styles.title}>{copy.routes.home.title}</h1>
  </main>
);
