import { LEADERBOARD_LIMIT, STORAGE_KEY } from './config.js';

function isValidResult(result) {
  return (
    result !== null &&
    typeof result === 'object' &&
    Number.isInteger(result.moves) &&
    result.moves > 0 &&
    Number.isFinite(result.completedAt) &&
    result.completedAt > 0
  );
}

export function sortResults(results) {
  return [...results].sort(
    (firstResult, secondResult) =>
      firstResult.moves - secondResult.moves ||
      firstResult.completedAt - secondResult.completedAt,
  );
}

export function loadResults(storage) {
  try {
    const activeStorage = storage ?? globalThis.localStorage;
    const storedValue = activeStorage.getItem(STORAGE_KEY);

    if (storedValue === null) {
      return [];
    }

    const parsedValue = JSON.parse(storedValue);

    if (!Array.isArray(parsedValue)) {
      return [];
    }

    return sortResults(parsedValue.filter(isValidResult)).slice(
      0,
      LEADERBOARD_LIMIT,
    );
  } catch {
    return [];
  }
}

export function saveResult(
  moves,
  storage,
  completedAt = Date.now(),
) {
  const results = sortResults([
    ...loadResults(storage),
    { moves, completedAt },
  ]).slice(0, LEADERBOARD_LIMIT);

  try {
    const activeStorage = storage ?? globalThis.localStorage;
    activeStorage.setItem(STORAGE_KEY, JSON.stringify(results));
  } catch {
    return false;
  }

  return true;
}
