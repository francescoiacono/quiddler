export const en = {
  app: {
    documentTitle: "Quiddler",
    navigation: {
      game: "Game",
      primaryLabel: "Primary",
      wordChecker: "Word Checker",
    },
  },
  routes: {
    game: {
      addRound: {
        cancel: "Cancel",
        fieldHelp: "Use 0 for players who did not score.",
        scoreLabel: "Score",
        submit: "Save round",
        title: "Add round",
        validation: {
          incomplete: "Enter a score for every player.",
          invalid: "Scores must be whole numbers.",
        },
      },
      actions: {
        addRound: "Add Round",
        gameComplete: "Game complete",
        viewRounds: "View Rounds",
      },
      empty: {
        title: "Add players",
        body: "Build the table before scoring starts.",
      },
      header: {
        newGame: "New game",
        wordCheckerLabel: "Open word checker",
      },
      history: {
        empty: "No rounds scored yet.",
        title: "Round history",
        total: "Round total",
        unknownPlayer: "Unknown player",
      },
      leaderboard: {
        title: "Standings",
      },
      leader: {
        empty: "No leader yet",
        label: "Leader",
      },
      round: {
        cardsLabel: "cards",
        label: "Round",
      },
      roster: {
        leaderLabel: "Leader",
        playerCountLabel: "Players",
        title: "Players",
        totalLabel: "Total",
      },
      summary: {
        roundsLabel: "Rounds",
        title: "Game summary",
      },
    },
    wordChecker: {
      definitions: {
        exampleLabel: "Example",
        title: "Definitions",
      },
      form: {
        checking: "Checking",
        label: "Word",
        placeholder: "Check a word",
        submit: "Check",
      },
      header: {
        gameLabel: "Open game",
        title: "Word Checker",
      },
      result: {
        error: "Could not check that word. Try again.",
        invalid: "Not found in the dictionary.",
        valid: "Valid word.",
      },
      validation: "Enter a word to check.",
    },
    home: {
      form: {
        playerNameLabel: "Player name",
        playerNamePlaceholder: "Player name",
        submit: "Create game",
      },
      intro: "Add everyone before the first round. The roster locks when the game starts.",
      kicker: "Quiddler scorekeeper",
      players: {
        add: "Add",
        countLabel: "players",
        limit: "Quiddler supports 1 to 8 players.",
        limitReached: "Player limit reached.",
        remove: "Remove player",
        title: "Players",
      },
      title: "Start a game",
      validation: {
        duplicatePlayer: "That player is already in the game.",
        playerLimit: "Quiddler allows up to 8 players.",
        playerRequired: "Enter a player name.",
        rosterRequired: "Add at least one player to start.",
      },
    },
  },
} as const;
