import { type SyntheticEvent, useId, useState } from "react";
import { copy } from "@/i18n/copy";
import { styles } from "./player-name-form.styles";

/** Props for the setup form that adds one player name at a time. */
interface PlayerNameFormProps {
  /** Current validation error shown below the player field. */
  error: string | null;
  /** Whether the setup roster has reached the player limit. */
  isRosterFull: boolean;
  /** Adds a submitted player name and returns whether it was accepted. */
  onAddPlayer: (playerName: string) => boolean;
  /** Clears stale validation errors while the user edits the field. */
  onClearError: () => void;
}

export const PlayerNameForm = ({
  error,
  isRosterFull,
  onAddPlayer,
  onClearError,
}: PlayerNameFormProps) => {
  const homeCopy = copy.routes.home;
  const playerNameId = useId();
  const errorId = useId();
  const helperId = useId();
  const [playerName, setPlayerName] = useState("");

  /** Submits the pending player name to the setup roster. */
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onAddPlayer(playerName)) {
      setPlayerName("");
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor={playerNameId}>
          {homeCopy.form.playerNameLabel}
        </label>
        <div className={styles.addPlayerRow}>
          <input
            aria-describedby={error === null ? helperId : `${helperId} ${errorId}`}
            aria-invalid={error === null ? undefined : true}
            autoComplete="name"
            className={styles.input}
            disabled={isRosterFull}
            id={playerNameId}
            onChange={(event) => {
              setPlayerName(event.target.value);
              onClearError();
            }}
            placeholder={homeCopy.form.playerNamePlaceholder}
            type="text"
            value={playerName}
          />
          <button className={styles.addButton} disabled={isRosterFull} type="submit">
            {homeCopy.players.add}
          </button>
        </div>
        <p className={styles.helper} id={helperId}>
          {isRosterFull ? homeCopy.players.limitReached : homeCopy.players.limit}
        </p>
      </div>

      {error === null ? null : (
        <p className={styles.error} id={errorId} role="alert">
          {error}
        </p>
      )}
    </form>
  );
};
