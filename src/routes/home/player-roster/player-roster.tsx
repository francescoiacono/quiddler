import { X } from "lucide-react";
import { maxQuiddlerPlayers } from "@/game";
import { copy } from "@/i18n/copy";
import { styles } from "./player-roster.styles";

/** Props for the setup roster list. */
interface PlayerRosterProps {
  /** Player names currently queued for the next game. */
  playerNames: string[];
  /** Removes a queued player by display name. */
  onRemovePlayer: (playerName: string) => void;
}

export const PlayerRoster = ({ onRemovePlayer, playerNames }: PlayerRosterProps) => {
  const homeCopy = copy.routes.home;

  return (
    <section className={styles.roster} aria-labelledby="setup-roster-title">
      <div className={styles.rosterHeader}>
        <h2 className={styles.rosterTitle} id="setup-roster-title">
          {homeCopy.players.title}
        </h2>
        <p className={styles.playerCount}>
          {playerNames.length}/{maxQuiddlerPlayers} {homeCopy.players.countLabel}
        </p>
      </div>

      {playerNames.length === 0 ? (
        <p className={styles.emptyRoster}>{homeCopy.validation.rosterRequired}</p>
      ) : (
        <ol className={styles.playerList}>
          {playerNames.map((currentPlayerName) => (
            <li className={styles.playerItem} key={currentPlayerName}>
              <span className={styles.playerName}>{currentPlayerName}</span>
              <button
                aria-label={`${homeCopy.players.remove} ${currentPlayerName}`}
                className={styles.removeButton}
                onClick={() => {
                  onRemovePlayer(currentPlayerName);
                }}
                type="button"
              >
                <X className={styles.removeIcon} />
              </button>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
};
