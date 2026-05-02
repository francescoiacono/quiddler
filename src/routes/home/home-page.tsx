import { useState } from "react";
import { WalletCards } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { BottomNav } from "@/app/bottom-nav";
import { maxQuiddlerPlayers, minQuiddlerPlayers, useGameStore } from "@/game";
import { copy } from "@/i18n/copy";
import { hasPlayerName, normalizePlayerName } from "./home-helpers";
import { styles } from "./home-page.styles";
import { PlayerNameForm } from "./player-name-form";
import { PlayerRoster } from "./player-roster";
import { SetupIntro } from "./setup-intro";

export const HomePage = () => {
  const activeGame = useGameStore((state) => state.activeGame);
  const createGame = useGameStore((state) => state.createGame);
  const navigate = useNavigate();
  const homeCopy = copy.routes.home;
  const [playerNames, setPlayerNames] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const isRosterFull = playerNames.length >= maxQuiddlerPlayers;
  const canStartGame = playerNames.length >= minQuiddlerPlayers;

  /** Adds a player to the setup roster before the game starts. */
  const handleAddPlayer = (playerName: string) => {
    const trimmedPlayerName = normalizePlayerName(playerName);

    if (trimmedPlayerName.length === 0) {
      setError(homeCopy.validation.playerRequired);
      return false;
    }

    if (isRosterFull) {
      setError(homeCopy.validation.playerLimit);
      return false;
    }

    if (hasPlayerName(playerNames, trimmedPlayerName)) {
      setError(homeCopy.validation.duplicatePlayer);
      return false;
    }

    setPlayerNames((currentPlayerNames) => [...currentPlayerNames, trimmedPlayerName]);
    setError(null);
    return true;
  };

  /** Removes a player from the setup roster before game creation. */
  const handleRemovePlayer = (playerNameToRemove: string) => {
    setPlayerNames((currentPlayerNames) =>
      currentPlayerNames.filter((currentPlayerName) => currentPlayerName !== playerNameToRemove),
    );
    setError(null);
  };

  /** Clears the setup form validation error. */
  const handleClearError = () => {
    setError(null);
  };

  /** Creates a game from the setup roster and opens the active game route. */
  const handleCreateGame = () => {
    if (!canStartGame) {
      setError(homeCopy.validation.rosterRequired);
      return;
    }

    const gameId = createGame(playerNames);

    if (gameId !== null) {
      void navigate("/game");
    }
  };

  if (activeGame !== null) {
    return <Navigate to="/game" replace />;
  }

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.appHeader}>
          <div className={styles.brand}>
            <span className={styles.brandMark}>
              <WalletCards className={styles.brandIcon} />
            </span>
            <p className={styles.appTitle}>{copy.app.documentTitle}</p>
          </div>
        </header>

        <section aria-labelledby="home-title" className={styles.setupPanel}>
          <SetupIntro />
          <PlayerNameForm
            error={error}
            isRosterFull={isRosterFull}
            onAddPlayer={handleAddPlayer}
            onClearError={handleClearError}
          />
          <PlayerRoster onRemovePlayer={handleRemovePlayer} playerNames={playerNames} />

          <button
            className={styles.submit}
            disabled={!canStartGame}
            onClick={handleCreateGame}
            type="button"
          >
            {homeCopy.form.submit}
          </button>
        </section>
      </div>
      <BottomNav />
    </main>
  );
};
