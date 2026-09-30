import { PAIR_COUNT } from './config.js';
import { CARD_GROUPS } from './data.js';
import { getRandomItem, shuffle } from './utils.js';

function createDeck(cardGroup) {
  const selectedCards = cardGroup.cards.slice(0, PAIR_COUNT);
  const pairedCards = selectedCards.flatMap((card) =>
    [1, 2].map((copyNumber) => ({
      ...card,
      pairId: card.id,
      instanceId: `${card.id}-${copyNumber}`,
      isFlipped: false,
      isMatched: false,
    })),
  );

  return shuffle(pairedCards);
}

export function createGameState() {
  const cardGroup = getRandomItem(CARD_GROUPS);

  return {
    themeId: cardGroup.id,
    cards: createDeck(cardGroup),
    selectedCardIds: [],
    moves: 0,
    matchedPairs: 0,
    isLocked: false,
    isComplete: false,
    mismatchTimerId: null,
    resultSaved: false,
  };
}
