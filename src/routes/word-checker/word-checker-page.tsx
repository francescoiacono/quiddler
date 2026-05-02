import { type FormEvent, useId, useRef, useState } from "react";
import { Home } from "lucide-react";
import { Link } from "react-router";
import { BottomNav } from "@/app/bottom-nav";
import { useGameStore } from "@/game";
import { copy } from "@/i18n/copy";
import { styles } from "./word-checker-page.styles";

/** Possible outcomes from the dictionary word lookup. */
type WordCheckStatus = "error" | "invalid" | "valid";

/** A definition extracted from the dictionary API response. */
interface WordDefinition {
  /** Part of speech attached to the definition. */
  partOfSpeech: string;
  /** Dictionary definition text. */
  definition: string;
  /** Optional usage example attached to the definition. */
  example?: string;
}

/** The maximum number of definitions shown for a checked word. */
const maxDefinitions = 4;

/** Builds the Free Dictionary API URL for an English word lookup. */
const getDictionaryUrl = (word: string) =>
  `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`;

/** Checks whether an unknown value can be safely read as an object. */
const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

/** Converts a Free Dictionary API response into displayable definitions. */
const getDefinitionsFromResponse = (payload: unknown): WordDefinition[] => {
  if (!Array.isArray(payload)) {
    return [];
  }

  const definitions: WordDefinition[] = [];

  for (const entry of payload) {
    if (!isRecord(entry) || !Array.isArray(entry.meanings)) {
      continue;
    }

    for (const meaning of entry.meanings) {
      if (!isRecord(meaning) || !Array.isArray(meaning.definitions)) {
        continue;
      }

      const partOfSpeech = typeof meaning.partOfSpeech === "string" ? meaning.partOfSpeech : "";

      for (const definitionEntry of meaning.definitions) {
        if (!isRecord(definitionEntry) || typeof definitionEntry.definition !== "string") {
          continue;
        }

        definitions.push({
          definition: definitionEntry.definition,
          example:
            typeof definitionEntry.example === "string" ? definitionEntry.example : undefined,
          partOfSpeech,
        });

        if (definitions.length === maxDefinitions) {
          return definitions;
        }
      }
    }
  }

  return definitions;
};

export const WordCheckerPage = () => {
  const activeGame = useGameStore((state) => state.activeGame);
  const wordCheckerCopy = copy.routes.wordChecker;
  const wordInputId = useId();
  const errorId = useId();
  const latestWordRef = useRef("");
  const [word, setWord] = useState("");
  const [status, setStatus] = useState<WordCheckStatus | null>(null);
  const [definitions, setDefinitions] = useState<WordDefinition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isChecking, setIsChecking] = useState(false);

  /** Checks the current word against the dictionary API. */
  const checkWord = async () => {
    const trimmedWord = word.trim();
    latestWordRef.current = word;

    /** Checks whether the active lookup still matches the input field. */
    const isLatestLookup = () => latestWordRef.current.trim() === trimmedWord;

    if (trimmedWord.length === 0) {
      setError(wordCheckerCopy.validation);
      setDefinitions([]);
      setStatus(null);
      return;
    }

    setError(null);
    setIsChecking(true);

    try {
      const response = await fetch(getDictionaryUrl(trimmedWord));

      if (response.ok) {
        const payload: unknown = await response.json();

        if (!isLatestLookup()) {
          return;
        }

        setDefinitions(getDefinitionsFromResponse(payload));
        setStatus("valid");
        return;
      }

      if (!isLatestLookup()) {
        return;
      }

      setDefinitions([]);
      setStatus(response.status === 404 ? "invalid" : "error");
    } catch {
      if (!isLatestLookup()) {
        return;
      }

      setDefinitions([]);
      setStatus("error");
    } finally {
      setIsChecking(false);
    }
  };

  /** Runs the word lookup from the form submit action. */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void checkWord();
  };

  const resultText = status === null ? null : wordCheckerCopy.result[status];
  const gamePath = activeGame === null ? "/" : "/game";

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.appHeader}>
          <h1 className={styles.appTitle}>{wordCheckerCopy.header.title}</h1>
          <Link
            aria-label={wordCheckerCopy.header.gameLabel}
            className={styles.iconButton}
            to={gamePath}
          >
            <Home className={styles.headerIcon} />
          </Link>
        </header>

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.label} htmlFor={wordInputId}>
            {wordCheckerCopy.form.label}
          </label>
          <div className={styles.inputRow}>
            <input
              aria-describedby={error === null ? undefined : errorId}
              aria-invalid={error === null ? undefined : true}
              autoCapitalize="none"
              autoComplete="off"
              className={styles.input}
              id={wordInputId}
              onChange={(event) => {
                const nextWord = event.target.value;

                latestWordRef.current = nextWord;
                setWord(nextWord);
                setDefinitions([]);
                setError(null);
                setStatus(null);
              }}
              placeholder={wordCheckerCopy.form.placeholder}
              type="text"
              value={word}
            />
            <button className={styles.submitButton} disabled={isChecking} type="submit">
              {isChecking ? wordCheckerCopy.form.checking : wordCheckerCopy.form.submit}
            </button>
          </div>
        </form>

        {error === null ? null : (
          <p className={styles.error} id={errorId} role="alert">
            {error}
          </p>
        )}

        {resultText === null ? null : (
          <section className={styles.result} role="status">
            <p className={styles.resultText}>{resultText}</p>

            {definitions.length === 0 ? null : (
              <div className={styles.definitions}>
                <h2 className={styles.definitionsTitle}>{wordCheckerCopy.definitions.title}</h2>
                <ol className={styles.definitionList}>
                  {definitions.map((definition, index) => (
                    <li
                      className={styles.definitionItem}
                      key={`${definition.partOfSpeech}-${index}`}
                    >
                      {definition.partOfSpeech.length === 0 ? null : (
                        <p className={styles.partOfSpeech}>{definition.partOfSpeech}</p>
                      )}
                      <p className={styles.definitionText}>{definition.definition}</p>
                      {definition.example === undefined ? null : (
                        <p className={styles.example}>
                          <span>{wordCheckerCopy.definitions.exampleLabel}: </span>
                          {definition.example}
                        </p>
                      )}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </section>
        )}
      </div>
      <BottomNav />
    </main>
  );
};
