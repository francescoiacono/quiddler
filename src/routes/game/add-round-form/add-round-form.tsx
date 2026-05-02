import { type FormEvent, useId, useState } from "react";
import type { Game, PlayerId, RoundScore } from "@/game";
import { copy } from "@/i18n/copy";
import { createScoreEntries, type ScoreEntries } from "../game-helpers";
import { styles } from "./add-round-form.styles";

/** Props for the score entry form for the next round. */
interface AddRoundFormProps {
  /** Active game whose locked roster should receive scores. */
  game: Game;
  /** One-based round number being entered. */
  roundNumber: number;
  /** Number of cards dealt in the round being entered. */
  cardCount: number;
  /** Closes the form without saving scores. */
  onCancel: () => void;
  /** Saves validated round scores for every player. */
  onSave: (scores: RoundScore[]) => void;
}

export const AddRoundForm = ({
  cardCount,
  game,
  onCancel,
  onSave,
  roundNumber,
}: AddRoundFormProps) => {
  const gameCopy = copy.routes.game;
  const roundFormTitleId = useId();
  const roundFormErrorId = useId();
  const roundScoreHelpId = useId();
  const scoreInputPrefix = useId();
  const [scoreEntries, setScoreEntries] = useState<ScoreEntries>(() =>
    createScoreEntries(game.players.map((player) => player.id)),
  );
  const [roundError, setRoundError] = useState<string | null>(null);

  /** Updates one player's pending score field. */
  const handleScoreChange = (playerId: PlayerId, score: string) => {
    setScoreEntries((currentEntries) => ({
      ...currentEntries,
      [playerId]: score,
    }));
    setRoundError(null);
  };

  /** Validates the score form and passes complete round scores upward. */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedScores: RoundScore[] = [];

    for (const player of game.players) {
      const rawScore = scoreEntries[player.id]?.trim() ?? "";

      if (rawScore.length === 0) {
        setRoundError(gameCopy.addRound.validation.incomplete);
        return;
      }

      const score = Number(rawScore);

      if (!Number.isInteger(score)) {
        setRoundError(gameCopy.addRound.validation.invalid);
        return;
      }

      parsedScores.push({ playerId: player.id, score });
    }

    onSave(parsedScores);
    setRoundError(null);
  };

  return (
    <section aria-labelledby={roundFormTitleId} className={styles.roundFormPanel}>
      <div className={styles.roundFormHeader}>
        <div>
          <h2 className={styles.sectionTitle} id={roundFormTitleId}>
            {gameCopy.addRound.title}
          </h2>
          <p className={styles.roundMeta}>
            {gameCopy.round.label} {roundNumber} - {cardCount} {gameCopy.round.cardsLabel}
          </p>
        </div>
      </div>

      <form className={styles.roundForm} onSubmit={handleSubmit}>
        <p className={styles.helpText} id={roundScoreHelpId}>
          {gameCopy.addRound.fieldHelp}
        </p>

        {game.players.map((player) => {
          const scoreInputId = `${scoreInputPrefix}-${player.id}`;

          return (
            <div className={styles.scoreField} key={player.id}>
              <label className={styles.scoreLabel} htmlFor={scoreInputId}>
                <span>{player.name}</span>
                <span>{gameCopy.addRound.scoreLabel}</span>
              </label>
              <input
                aria-describedby={
                  roundError === null ? roundScoreHelpId : `${roundScoreHelpId} ${roundFormErrorId}`
                }
                aria-invalid={roundError === null ? undefined : true}
                className={styles.scoreInput}
                id={scoreInputId}
                inputMode="numeric"
                onChange={(event) => {
                  handleScoreChange(player.id, event.target.value);
                }}
                step="1"
                type="number"
                value={scoreEntries[player.id] ?? ""}
              />
            </div>
          );
        })}

        {roundError === null ? null : (
          <p className={styles.error} id={roundFormErrorId} role="alert">
            {roundError}
          </p>
        )}

        <div className={styles.roundFormActions}>
          <button className={styles.cancelButton} onClick={onCancel} type="button">
            {gameCopy.addRound.cancel}
          </button>
          <button className={styles.saveButton} type="submit">
            {gameCopy.addRound.submit}
          </button>
        </div>
      </form>
    </section>
  );
};
