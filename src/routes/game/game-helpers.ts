import type { Player, PlayerId, Round } from "@/game";

/** Editable score values keyed by player id. */
export type ScoreEntries = Record<PlayerId, string>;

/** Builds empty score fields for the current player roster. */
export const createScoreEntries = (playerIds: PlayerId[]): ScoreEntries =>
  Object.fromEntries(playerIds.map((playerId) => [playerId, ""])) as ScoreEntries;

/** Returns the combined score entered for a completed round. */
export const getRoundTotal = (round: Round) =>
  round.scores.reduce((total, score) => total + score.score, 0);

/** Finds a player by id inside a locked game roster. */
export const getPlayerById = (players: Player[], playerId: PlayerId) =>
  players.find((player) => player.id === playerId);
