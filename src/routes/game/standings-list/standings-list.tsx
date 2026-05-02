import { cx } from "@styled-system/css";
import { Crown, User } from "lucide-react";
import type { PlayerId, PlayerStanding } from "@/game";
import { copy } from "@/i18n/copy";
import { styles } from "./standings-list.styles";

/** Props for the player standings list. */
interface StandingsListProps {
  /** Calculated standings sorted for display. */
  standings: PlayerStanding[];
  /** Current leader id, or null when no player leads yet. */
  leaderPlayerId: PlayerId | null;
}

export const StandingsList = ({ leaderPlayerId, standings }: StandingsListProps) => {
  const gameCopy = copy.routes.game;

  return (
    <section className={styles.standingsSection} aria-labelledby="standings-title">
      <h2 className={styles.visuallyHidden} id="standings-title">
        {gameCopy.leaderboard.title}
      </h2>

      {standings.length === 0 ? (
        <div className={styles.emptyState}>
          <h3 className={styles.emptyTitle}>{gameCopy.empty.title}</h3>
          <p className={styles.emptyBody}>{gameCopy.empty.body}</p>
        </div>
      ) : (
        <ol className={styles.playerList}>
          {standings.map((standing) => {
            const isLeader = standing.player.id === leaderPlayerId;

            return (
              <li
                className={cx(styles.playerCard, isLeader && styles.playerCardLeader)}
                key={standing.player.id}
              >
                <span className={styles.avatar}>
                  <User className={styles.avatarIcon} />
                </span>
                <span className={styles.playerNameGroup}>
                  <span className={styles.playerName}>{standing.player.name}</span>
                  {isLeader ? (
                    <span className={styles.leaderBadge}>
                      <Crown className={styles.leaderBadgeIcon} />
                      {gameCopy.roster.leaderLabel}
                    </span>
                  ) : null}
                </span>
                <strong className={styles.totalScore}>{standing.total}</strong>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
};
