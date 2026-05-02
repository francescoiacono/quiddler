import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type {
  Game,
  GameId,
  Player,
  PlayerId,
  PlayerStanding,
  Round,
  RoundId,
  RoundScore,
} from "./game-types";

/** Persistent storage key for the active local game. */
const gameStoreKey = "quiddler-game";

/** Minimum number of players supported by Quiddler. */
export const minQuiddlerPlayers = 1;

/** Maximum number of players supported by Quiddler. */
export const maxQuiddlerPlayers = 8;

/** Maximum number of scored rounds in one Quiddler game. */
export const maxQuiddlerRounds = 8;

/** Creates a browser-native stable identifier for local game records. */
const createId = () => crypto.randomUUID();

/** Returns the current time as an ISO timestamp for persisted records. */
const createTimestamp = () => new Date().toISOString();

/** State and commands for the local-first game store. */
interface GameStoreState {
  /** The current game saved on this device, or null when none exists. */
  activeGame: Game | null;
  /** Starts a fresh game and clears any previous active game. */
  createGame: (playerNames: string[]) => GameId | null;
  /** Records one full round of scores for the active game. */
  addRound: (scores: RoundScore[]) => RoundId | null;
  /** Clears the active game from persisted state. */
  resetGame: () => void;
}

/** Builds a player record from validated display text. */
const createPlayer = (name: string): Player => ({
  createdAt: createTimestamp(),
  id: createId(),
  name,
});

/** Builds a new game record from validated setup player names. */
const createGameRecord = (playerNames: string[]): Game => {
  const createdAt = createTimestamp();

  return {
    createdAt,
    id: createId(),
    players: playerNames.map(createPlayer),
    rounds: [],
    updatedAt: createdAt,
  };
};

/** Returns the one-based round number that should be scored next. */
export const getNextRoundNumber = (game: Game) => game.rounds.length + 1;

/** Returns the card count for a Quiddler round. */
export const getRoundCardCount = (roundNumber: number) => roundNumber + 2;

/** Checks whether a game can still accept another Quiddler round. */
export const getHasRemainingRounds = (game: Game) => game.rounds.length < maxQuiddlerRounds;

/** Builds a complete round record with one score entry per current player. */
const createRound = (game: Game, scores: RoundScore[]): Round => {
  const createdAt = createTimestamp();

  return {
    createdAt,
    id: createId(),
    number: getNextRoundNumber(game),
    scores: game.players.map((player) => ({
      playerId: player.id,
      score: scores.find((roundScore) => roundScore.playerId === player.id)?.score ?? 0,
    })),
  };
};

/** Calculates a player's current total across all recorded rounds. */
export const getPlayerTotal = (game: Game, playerId: PlayerId) =>
  game.rounds.reduce((total, round) => {
    const score = round.scores.find((roundScore) => roundScore.playerId === playerId);

    return total + (score?.score ?? 0);
  }, 0);

/** Calculates sorted standings for the active game. */
export const getPlayerStandings = (game: Game): PlayerStanding[] =>
  game.players
    .map((player) => ({
      player,
      total: getPlayerTotal(game, player.id),
    }))
    .toSorted((first, second) => {
      const totalDifference = second.total - first.total;

      if (totalDifference !== 0) {
        return totalDifference;
      }

      return first.player.name.localeCompare(second.player.name);
    });

/** Returns the current leader when the game has at least one player. */
export const getCurrentLeader = (game: Game) => getPlayerStandings(game)[0] ?? null;

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      activeGame: null,
      addRound: (scores) => {
        const activeGame = get().activeGame;

        if (
          activeGame === null ||
          activeGame.players.length === 0 ||
          !getHasRemainingRounds(activeGame)
        ) {
          return null;
        }

        const round = createRound(activeGame, scores);

        set({
          activeGame: {
            ...activeGame,
            rounds: [...activeGame.rounds, round],
            updatedAt: createTimestamp(),
          },
        });

        return round.id;
      },
      createGame: (playerNames) => {
        const trimmedPlayerNames = playerNames
          .map((playerName) => playerName.trim())
          .filter((playerName) => playerName.length > 0)
          .slice(0, maxQuiddlerPlayers);

        if (trimmedPlayerNames.length < minQuiddlerPlayers) {
          return null;
        }

        const game = createGameRecord(trimmedPlayerNames);

        set({ activeGame: game });

        return game.id;
      },
      resetGame: () => {
        set({ activeGame: null });
      },
    }),
    {
      name: gameStoreKey,
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
