import type { Player, PlayerId, Round } from "@/game";

/** Editable score value for one player before a round is saved. */
export interface ScoreEntry {
  /** Digits typed into the score field without any sign prefix. */
  digits: string;
  /** Whether the score should be saved as a negative value. */
  isNegative: boolean;
}

/** Editable score values keyed by player id. */
export type ScoreEntries = Record<PlayerId, ScoreEntry>;

/** Builds an empty editable score field. */
export const createScoreEntry = (): ScoreEntry => ({
  digits: "",
  isNegative: false,
});

/** Builds empty score fields for the current player roster. */
export const createScoreEntries = (playerIds: PlayerId[]): ScoreEntries =>
  Object.fromEntries(playerIds.map((playerId) => [playerId, createScoreEntry()])) as ScoreEntries;

/** Returns the combined score entered for a completed round. */
export const getRoundTotal = (round: Round) =>
  round.scores.reduce((total, score) => total + score.score, 0);

/** Finds a player by id inside a locked game roster. */
export const getPlayerById = (players: Player[], playerId: PlayerId) =>
  players.find((player) => player.id === playerId);
