/** Unique identifier for a saved Quiddler game. */
export type GameId = string;

/** Unique identifier for a game player. */
export type PlayerId = string;

/** Unique identifier for a scored round. */
export type RoundId = string;

/** A player participating in the active game. */
export interface Player {
  /** Stable player identifier used by scores and standings. */
  id: PlayerId;
  /** Player display name shown throughout the scorekeeper. */
  name: string;
  /** ISO timestamp for when the player joined the game. */
  createdAt: string;
}

/** One player's score entry for a round. */
export interface RoundScore {
  /** Identifier of the player this score belongs to. */
  playerId: PlayerId;
  /** Signed score value entered by the game master. */
  score: number;
}

/** A completed Quiddler round. */
export interface Round {
  /** Stable round identifier. */
  id: RoundId;
  /** One-based round number in play order. */
  number: number;
  /** Scores entered for each player in the round. */
  scores: RoundScore[];
  /** ISO timestamp for when the round was recorded. */
  createdAt: string;
}

/** A local-first Quiddler game record. */
export interface Game {
  /** Stable game identifier. */
  id: GameId;
  /** Players currently participating in the game. */
  players: Player[];
  /** Completed scoring rounds. */
  rounds: Round[];
  /** ISO timestamp for when the game was created. */
  createdAt: string;
  /** ISO timestamp for the latest game update. */
  updatedAt: string;
}

/** A player's calculated position in the current game. */
export interface PlayerStanding {
  /** Player represented by this standing. */
  player: Player;
  /** Current total score across all completed rounds. */
  total: number;
}
