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

function getCardById(gameState, cardId) {
  return gameState.cards.find((card) => card.instanceId === cardId);
}

export function selectCard(gameState, cardId) {
  const card = getCardById(gameState, cardId);

  if (
    !card ||
    gameState.isLocked ||
    gameState.isComplete ||
    card.isFlipped ||
    card.isMatched
  ) {
    return { type: 'ignored', cards: [] };
  }

  card.isFlipped = true;
  gameState.selectedCardIds.push(card.instanceId);

  if (gameState.selectedCardIds.length === 1) {
    return { type: 'first-card', cards: [card] };
  }

  gameState.moves += 1;

  const firstCard = getCardById(gameState, gameState.selectedCardIds[0]);
  const isMatch = firstCard.pairId === card.pairId;

  if (isMatch) {
    firstCard.isMatched = true;
    card.isMatched = true;
    gameState.matchedPairs += 1;
    gameState.selectedCardIds = [];
    gameState.isComplete = gameState.matchedPairs === PAIR_COUNT;

    return {
      type: 'match',
      cards: [firstCard, card],
      isComplete: gameState.isComplete,
    };
  }

  gameState.isLocked = true;

  return { type: 'mismatch', cards: [firstCard, card] };
}

export function closeMismatchedCards(gameState) {
  const cardsToClose = gameState.selectedCardIds
    .map((cardId) => getCardById(gameState, cardId))
    .filter(Boolean);

  cardsToClose.forEach((card) => {
    card.isFlipped = false;
  });

  gameState.selectedCardIds = [];
  gameState.isLocked = false;
  gameState.mismatchTimerId = null;

  return cardsToClose;
}
