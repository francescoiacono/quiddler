import { type KeyboardEvent, type SyntheticEvent, useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import type { Game, PlayerId, RoundScore } from "@/game";
import { copy } from "@/i18n/copy";
import {
  createScoreEntries,
  createScoreEntry,
  type ScoreEntries,
  type ScoreEntry,
} from "../game-helpers";
import { styles } from "./add-round-form.styles";

/** Selector for controls that can receive focus inside the modal. */
const focusableControlSelector =
  'button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])';

/** Returns keyboard-focusable controls inside a modal element. */
const getFocusableControls = (modalElement: HTMLElement) =>
  Array.from(modalElement.querySelectorAll<HTMLElement>(focusableControlSelector)).filter(
    (control) => control.offsetParent !== null,
  );

/** Returns only the typed numeric digits from a score field value. */
const getScoreDigits = (score: string) => score.replace(/\D/g, "");

/** Formats a pending score entry for the controlled input value. */
const formatScoreEntry = (scoreEntry: ScoreEntry) => {
  const sign = scoreEntry.isNegative ? "-" : "";

  return `${sign}${scoreEntry.digits}`;
};

/** Updates score digits while preserving the separately controlled sign intent. */
const updateScoreEntryFromInput = (score: string, scoreEntry: ScoreEntry): ScoreEntry => {
  if (score.trim().length === 0) {
    return createScoreEntry();
  }

  const trimmedScore = score.trimStart();
  const startsWithNegativeSign = trimmedScore.startsWith("-");
  const startsWithPositiveSign = trimmedScore.startsWith("+");
  const digits = getScoreDigits(score);
  const preservesPendingNegativeSign =
    scoreEntry.isNegative &&
    scoreEntry.digits.length === 0 &&
    digits.length > 0 &&
    !startsWithPositiveSign;

  return {
    digits,
    isNegative: startsWithNegativeSign || preservesPendingNegativeSign,
  };
};

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstScoreInputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const [scoreEntries, setScoreEntries] = useState<ScoreEntries>(() =>
    createScoreEntries(game.players.map((player) => player.id)),
  );
  const [roundError, setRoundError] = useState<string | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const focusableControls =
      dialogRef.current === null ? [] : getFocusableControls(dialogRef.current);

    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    firstScoreInputRef.current?.focus();

    if (firstScoreInputRef.current === null) {
      focusableControls[0]?.focus();
    }

    return () => {
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, []);

  /** Updates one player's pending score field. */
  const handleScoreChange = (playerId: PlayerId, score: string) => {
    setScoreEntries((currentEntries) => {
      const currentScoreEntry = currentEntries[playerId] ?? createScoreEntry();

      return {
        ...currentEntries,
        [playerId]: updateScoreEntryFromInput(score, currentScoreEntry),
      };
    });
    setRoundError(null);
  };

  /** Toggles one player's pending score between positive and negative entry. */
  const handleToggleScoreSign = (playerId: PlayerId) => {
    setScoreEntries((currentEntries) => {
      const currentScoreEntry = currentEntries[playerId] ?? createScoreEntry();

      return {
        ...currentEntries,
        [playerId]: {
          ...currentScoreEntry,
          isNegative: !currentScoreEntry.isNegative,
        },
      };
    });
    setRoundError(null);
  };

  /** Validates the score form and passes complete round scores upward. */
  const handleSubmit = (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsedScores: RoundScore[] = [];

    for (const player of game.players) {
      const scoreEntry = scoreEntries[player.id] ?? createScoreEntry();

      if (scoreEntry.digits.length === 0) {
        setRoundError(gameCopy.addRound.validation.incomplete);
        return;
      }

      const unsignedScore = Number(scoreEntry.digits);
      const score = scoreEntry.isNegative && unsignedScore !== 0 ? -unsignedScore : unsignedScore;

      if (!Number.isInteger(score)) {
        setRoundError(gameCopy.addRound.validation.invalid);
        return;
      }

      parsedScores.push({ playerId: player.id, score });
    }

    onSave(parsedScores);
    setRoundError(null);
  };

  /** Keeps keyboard focus inside the modal and supports Escape to close. */
  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      onCancel();
      return;
    }

    if (event.key !== "Tab" || dialogRef.current === null) {
      return;
    }

    const focusableControls = getFocusableControls(dialogRef.current);
    const firstControl = focusableControls[0];
    const lastControl = focusableControls.at(-1);

    if (firstControl === undefined || lastControl === undefined) {
      return;
    }

    if (event.shiftKey && document.activeElement === firstControl) {
      event.preventDefault();
      lastControl.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === lastControl) {
      event.preventDefault();
      firstControl.focus();
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <section
        aria-labelledby={roundFormTitleId}
        aria-modal="true"
        className={styles.roundFormPanel}
        onKeyDown={handleDialogKeyDown}
        ref={dialogRef}
        role="dialog"
      >
        <div className={styles.roundFormHeader}>
          <div>
            <h2 className={styles.sectionTitle} id={roundFormTitleId}>
              {gameCopy.addRound.title}
            </h2>
            <p className={styles.roundMeta}>
              {gameCopy.round.label} {roundNumber} - {cardCount} {gameCopy.round.cardsLabel}
            </p>
          </div>
          <button
            aria-label={gameCopy.addRound.cancel}
            className={styles.closeButton}
            onClick={onCancel}
            type="button"
          >
            <X className={styles.closeIcon} />
          </button>
        </div>

        <form className={styles.roundForm} onSubmit={handleSubmit}>
          <p className={styles.helpText} id={roundScoreHelpId}>
            {gameCopy.addRound.fieldHelp}
          </p>

          {game.players.map((player, index) => {
            const scoreInputId = `${scoreInputPrefix}-${player.id}`;
            const scoreEntry = scoreEntries[player.id] ?? createScoreEntry();

            return (
              <div className={styles.scoreField} key={player.id}>
                <label className={styles.scoreLabel} htmlFor={scoreInputId}>
                  <span>{player.name}</span>
                  <span>{gameCopy.addRound.scoreLabel}</span>
                </label>
                <div className={styles.scoreControl}>
                  <button
                    aria-label={`${gameCopy.addRound.signToggleLabel} ${player.name}`}
                    aria-pressed={scoreEntry.isNegative}
                    className={styles.signToggleButton}
                    onClick={() => {
                      handleToggleScoreSign(player.id);
                    }}
                    type="button"
                  >
                    +/-
                  </button>
                  <input
                    aria-describedby={
                      roundError === null
                        ? roundScoreHelpId
                        : `${roundScoreHelpId} ${roundFormErrorId}`
                    }
                    aria-invalid={roundError === null ? undefined : true}
                    autoComplete="off"
                    className={styles.scoreInput}
                    enterKeyHint={index === game.players.length - 1 ? "done" : "next"}
                    id={scoreInputId}
                    inputMode="numeric"
                    onChange={(event) => {
                      handleScoreChange(player.id, event.target.value);
                    }}
                    ref={index === 0 ? firstScoreInputRef : undefined}
                    type="text"
                    value={formatScoreEntry(scoreEntry)}
                  />
                </div>
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
    </div>
  );
};
