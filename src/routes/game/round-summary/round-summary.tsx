import { Trophy, WalletCards } from "lucide-react";
import { copy } from "@/i18n/copy";
import { styles } from "./round-summary.styles";

/** Props for the current round summary card. */
interface RoundSummaryProps {
  /** One-based round number that will be scored next. */
  roundNumber: number;
  /** Number of cards dealt in the next round. */
  cardCount: number;
  /** Current leader name, or null when no leader can be shown. */
  leaderName: string | null;
}

export const RoundSummary = ({ cardCount, leaderName, roundNumber }: RoundSummaryProps) => {
  const gameCopy = copy.routes.game;

  return (
    <section aria-label={gameCopy.summary.title} className={styles.roundSummary}>
      <div className={styles.roundSummaryText}>
        <WalletCards className={styles.cardsIcon} />
        <div>
          <p className={styles.roundTitle}>
            {gameCopy.round.label} {roundNumber}
          </p>
          <p className={styles.roundMeta}>
            {cardCount} {gameCopy.round.cardsLabel}
          </p>
        </div>
      </div>
      <div className={styles.summaryDivider} />
      <div className={styles.leaderSummary}>
        <Trophy className={styles.trophyIcon} />
        <div>
          <p className={styles.leaderLabel}>{gameCopy.leader.label}</p>
          <p className={styles.leaderName}>{leaderName ?? gameCopy.leader.empty}</p>
        </div>
      </div>
    </section>
  );
};
