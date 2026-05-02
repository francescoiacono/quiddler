import { Trophy, WalletCards } from "lucide-react";
import { copy } from "@/i18n/copy";
import { styles } from "./round-summary.styles";

/** Props for the current round summary card. */
interface RoundSummaryProps {
  /** One-based round number that will be scored next. */
  roundNumber: number;
  /** Number of cards dealt in the next round. */
  cardCount: number;
  /** Whether every Quiddler round has already been scored. */
  isGameComplete: boolean;
  /** Current leader name, or null when no leader can be shown. */
  leaderName: string | null;
}

export const RoundSummary = ({
  cardCount,
  isGameComplete,
  leaderName,
  roundNumber,
}: RoundSummaryProps) => {
  const gameCopy = copy.routes.game;
  const statusLabel = isGameComplete ? null : gameCopy.summary.nextRoundLabel;
  const roundTitle = isGameComplete
    ? gameCopy.summary.completeLabel
    : `${gameCopy.round.label} ${roundNumber}`;
  const roundMeta = isGameComplete
    ? `${roundNumber} ${gameCopy.summary.roundsScoredLabel}`
    : `${cardCount} ${gameCopy.round.cardsLabel}`;
  const resultLabel = isGameComplete ? gameCopy.leader.winnerLabel : gameCopy.leader.label;

  return (
    <section aria-label={gameCopy.summary.title} className={styles.roundSummary}>
      <div className={styles.roundSummaryText}>
        <WalletCards className={styles.cardsIcon} />
        <div>
          {statusLabel === null ? null : <p className={styles.statusLabel}>{statusLabel}</p>}
          <p className={styles.roundTitle}>{roundTitle}</p>
          <p className={styles.roundMeta}>{roundMeta}</p>
        </div>
      </div>
      <div className={styles.summaryDivider} />
      <div className={styles.leaderSummary}>
        <Trophy className={styles.trophyIcon} />
        <div>
          <p className={styles.leaderLabel}>{resultLabel}</p>
          <p className={styles.leaderName}>{leaderName ?? gameCopy.leader.empty}</p>
        </div>
      </div>
    </section>
  );
};
