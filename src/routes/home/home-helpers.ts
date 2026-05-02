/** Returns a trimmed player name suitable for roster comparison and storage. */
export const normalizePlayerName = (playerName: string) => playerName.trim();

/** Checks whether a name already exists in the setup roster. */
export const hasPlayerName = (playerNames: string[], playerName: string) =>
  playerNames.some(
    (currentPlayerName) =>
      currentPlayerName.localeCompare(playerName, undefined, { sensitivity: "accent" }) === 0,
  );
