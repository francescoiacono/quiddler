export {
  getCurrentLeader,
  getHasRemainingRounds,
  getNextRoundNumber,
  getPlayerStandings,
  getPlayerTotal,
  getRoundCardCount,
  maxQuiddlerPlayers,
  maxQuiddlerRounds,
  minQuiddlerPlayers,
  useGameStore,
} from "./game-store";
export type {
  Game,
  GameId,
  Player,
  PlayerId,
  PlayerStanding,
  Round,
  RoundId,
  RoundScore,
} from "./game-types";
