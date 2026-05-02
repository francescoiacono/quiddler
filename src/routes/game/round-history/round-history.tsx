import { cx } from "@styled-system/css";
import { ChevronRight, List } from "lucide-react";
import { getRoundCardCount, type Game } from "@/game";
import { copy } from "@/i18n/copy";
import { getPlayerById, getRoundTotal } from "../game-helpers";
import { styles } from "./round-history.styles";

/** Props for the collapsible scored-round history. */
interface RoundHistoryProps {
  /** Active game whose completed rounds should be shown. */
  game: Game;
  /** Whether the round history panel is currently visible. */
  isOpen: boolean;
  /** Toggles the round history panel. */
  onToggle: () => void;
}

export const RoundHistory = ({ game, isOpen, onToggle }: RoundHistoryProps) => {
  const gameCopy = copy.routes.game;

  return (
    <>
      <button
        aria-controls="round-history"
        aria-expanded={isOpen}
        className={styles.historyButton}
        onClick={onToggle}
        type="button"
      >
        <List className={styles.actionIcon} />
        <span>{gameCopy.actions.viewRounds}</span>
        <ChevronRight className={cx(styles.chevronIcon, isOpen && styles.chevronIconOpen)} />
      </button>

      {isOpen ? (
        <section className={styles.historyPanel} id="round-history" aria-labelledby="history-title">
          <h2 className={styles.sectionTitle} id="history-title">
            {gameCopy.history.title}
          </h2>

          {game.rounds.length === 0 ? (
            <p className={styles.historyEmpty}>{gameCopy.history.empty}</p>
          ) : (
            <ol className={styles.historyList}>
              {game.rounds.toReversed().map((round) => (
                <li className={styles.historyItem} key={round.id}>
                  <div className={styles.historyItemHeader}>
                    <div>
                      <h3 className={styles.historyRoundTitle}>
                        {gameCopy.round.label} {round.number}
                      </h3>
                      <p className={styles.historyRoundMeta}>
                        {getRoundCardCount(round.number)} {gameCopy.round.cardsLabel}
                      </p>
                    </div>
                    <p className={styles.historyTotal}>
                      {gameCopy.history.total}: {getRoundTotal(round)}
                    </p>
                  </div>
                  <dl className={styles.historyScores}>
                    {round.scores.map((roundScore) => {
                      const player = getPlayerById(game.players, roundScore.playerId);

                      return (
                        <div className={styles.historyScore} key={roundScore.playerId}>
                          <dt>{player?.name ?? gameCopy.history.unknownPlayer}</dt>
                          <dd>{roundScore.score}</dd>
                        </div>
                      );
                    })}
                  </dl>
                </li>
              ))}
            </ol>
          )}
        </section>
      ) : null}
    </>
  );
};
