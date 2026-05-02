import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router";
import { BottomNav } from "@/app/bottom-nav";
import {
  getHasRemainingRounds,
  getNextRoundNumber,
  getPlayerStandings,
  getRoundCardCount,
  maxQuiddlerRounds,
  minQuiddlerPlayers,
  useGameStore,
  type RoundScore,
} from "@/game";
import { copy } from "@/i18n/copy";
import { AddRoundForm } from "./add-round-form";
import { styles } from "./game-page.styles";
import { RoundHistory } from "./round-history";
import { RoundSummary } from "./round-summary";
import { StandingsList } from "./standings-list";

export const GamePage = () => {
  const activeGame = useGameStore((state) => state.activeGame);
  const addRound = useGameStore((state) => state.addRound);
  const resetGame = useGameStore((state) => state.resetGame);
  const navigate = useNavigate();
  const gameCopy = copy.routes.game;
  const [isRoundFormOpen, setIsRoundFormOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  /** Opens the score-entry panel for the next round. */
  const handleOpenRoundForm = () => {
    if (activeGame === null || !getHasRemainingRounds(activeGame)) {
      return;
    }

    setIsRoundFormOpen(true);
  };

  /** Closes the score-entry panel without saving scores. */
  const handleCancelRound = () => {
    setIsRoundFormOpen(false);
  };

  /** Records validated scores for the next round. */
  const handleSaveRound = (scores: RoundScore[]) => {
    addRound(scores);
    setIsRoundFormOpen(false);
  };

  /** Toggles the completed-round history panel. */
  const handleToggleHistory = () => {
    setIsHistoryOpen((currentValue) => !currentValue);
  };

  /** Clears the active game and returns to the setup route. */
  const handleNewGame = () => {
    resetGame();
    void navigate("/");
  };

  if (activeGame === null) {
    return <Navigate to="/" replace />;
  }

  const standings = getPlayerStandings(activeGame);
  const hasScoredRounds = activeGame.rounds.length > 0;
  const leader = hasScoredRounds ? (standings[0] ?? null) : null;
  const nextRoundNumber = getNextRoundNumber(activeGame);
  const hasRemainingRounds = getHasRemainingRounds(activeGame);
  const isGameComplete = !hasRemainingRounds;
  const displayedRoundNumber = hasRemainingRounds ? nextRoundNumber : maxQuiddlerRounds;
  const displayedRoundCardCount = getRoundCardCount(displayedRoundNumber);
  const isAddRoundDisabled = activeGame.players.length < minQuiddlerPlayers || !hasRemainingRounds;

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>{copy.app.documentTitle}</h1>
          <Link
            aria-label={gameCopy.header.wordCheckerLabel}
            className={styles.iconButton}
            to="/word-checker"
          >
            <Search className={styles.headerIcon} />
          </Link>
        </header>

        <RoundSummary
          cardCount={displayedRoundCardCount}
          isGameComplete={isGameComplete}
          leaderName={leader?.player.name ?? null}
          roundNumber={displayedRoundNumber}
        />

        <StandingsList
          isGameComplete={isGameComplete}
          leaderPlayerId={leader?.player.id ?? null}
          standings={standings}
        />

        <RoundHistory game={activeGame} isOpen={isHistoryOpen} onToggle={handleToggleHistory} />

        <button
          className={styles.addRoundButton}
          disabled={isAddRoundDisabled}
          onClick={handleOpenRoundForm}
          type="button"
        >
          <Plus className={styles.addRoundIcon} />
          {hasRemainingRounds ? gameCopy.actions.addRound : gameCopy.actions.gameComplete}
        </button>

        {isRoundFormOpen && hasRemainingRounds ? (
          <AddRoundForm
            cardCount={displayedRoundCardCount}
            game={activeGame}
            onCancel={handleCancelRound}
            onSave={handleSaveRound}
            roundNumber={displayedRoundNumber}
          />
        ) : null}

        <button className={styles.newGameButton} onClick={handleNewGame} type="button">
          {gameCopy.header.newGame}
        </button>
      </div>
      <BottomNav />
    </main>
  );
};
