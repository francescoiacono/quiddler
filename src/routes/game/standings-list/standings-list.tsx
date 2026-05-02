import { cx } from "@styled-system/css";
import { Crown } from "lucide-react";
import type { PlayerId, PlayerStanding } from "@/game";
import { copy } from "@/i18n/copy";
import { styles } from "./standings-list.styles";

/** Props for the player standings list. */
interface StandingsListProps {
  /** Calculated standings sorted for display. */
  standings: PlayerStanding[];
  /** Current leader id, or null when no player leads yet. */
  leaderPlayerId: PlayerId | null;
  /** Whether every Quiddler round has already been scored. */
  isGameComplete: boolean;
}

export const StandingsList = ({
  isGameComplete,
  leaderPlayerId,
  standings,
}: StandingsListProps) => {
  const gameCopy = copy.routes.game;
  const standingsTitle = isGameComplete
    ? gameCopy.leaderboard.completeTitle
    : gameCopy.leaderboard.title;
  const highlightedBadgeLabel = isGameComplete
    ? gameCopy.roster.winnerLabel
    : gameCopy.roster.leaderLabel;

  return (
    <section className={styles.standingsSection} aria-labelledby="standings-title">
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle} id="standings-title">
          {standingsTitle}
        </h2>
        <span className={styles.sectionMeta}>{gameCopy.roster.totalLabel}</span>
      </div>

      {standings.length === 0 ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>{gameCopy.empty.title}</h3>
          <p className={styles.emptyBody}>{gameCopy.empty.body}</p>
        </div>
      ) : (
        <ol className={styles.playerList}>
          {standings.map((standing, index) => {
            const isHighlighted = standing.player.id === leaderPlayerId;
            const isLeader = !isGameComplete && isHighlighted;
            const isWinner = isGameComplete && isHighlighted;

            return (
              <li
                className={cx(
                  styles.playerCard,
                  isLeader && styles.playerCardLeader,
                  isWinner && styles.playerCardWinner,
                )}
                key={standing.player.id}
              >
                <span className={styles.playerRank} aria-hidden="true">
                  {index + 1}
                </span>
                <span className={styles.playerNameGroup}>
                  <span className={cx(styles.playerName, isWinner && styles.playerNameWinner)}>
                    {standing.player.name}
                  </span>
                  {isHighlighted ? (
                    <span className={cx(styles.leaderBadge, isWinner && styles.winnerBadge)}>
                      <Crown className={styles.leaderBadgeIcon} />
                      {highlightedBadgeLabel}
                    </span>
                  ) : null}
                </span>
                <strong
                  className={cx(
                    styles.totalScore,
                    isHighlighted && styles.totalScoreHighlight,
                    isWinner && styles.totalScoreWinner,
                  )}
                >
                  {standing.total}
                </strong>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};
