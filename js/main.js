import { APP_TITLE, PAIR_COUNT } from './config.js';
import { createElement } from './dom.js';
import { createGameState } from './game.js';
import { createModal } from './modal.js';

function createButton(label, modifier) {
  return createElement('button', {
    classNames: ['button', modifier],
    text: label,
    attributes: { type: 'button' },
  });
}

function createHeader() {
  const brandMark = createElement('span', {
    classNames: 'brand__mark',
    text: 'M',
    attributes: { 'aria-hidden': 'true' },
  });
  const title = createElement('h1', {
    classNames: 'brand__title',
    text: APP_TITLE,
  });
  const brand = createElement('div', {
    classNames: 'brand',
    children: [brandMark, title],
  });
  const newGameButton = createButton('New game', 'button--primary');
  const leaderboardButton = createButton('Leaderboard');
  const actions = createElement('div', {
    classNames: 'header__actions',
    children: [newGameButton, leaderboardButton],
  });
  const header = createElement('header', {
    classNames: 'header',
    children: [brand, actions],
  });

  return { header, newGameButton, leaderboardButton };
}

function createStat(label, value) {
  const labelElement = createElement('span', {
    classNames: 'stat__label',
    text: label,
  });
  const valueElement = createElement('strong', {
    classNames: 'stat__value',
    text: value,
  });
  const element = createElement('p', {
    classNames: 'stat',
    children: [labelElement, valueElement],
  });

  return { element, valueElement };
}

function createGameArea() {
  const moves = createStat('Moves', '0');
  const pairs = createStat('Pairs', `0 / ${PAIR_COUNT}`);
  const stats = createElement('section', {
    classNames: 'stats',
    attributes: { 'aria-label': 'Game statistics' },
    children: [moves.element, pairs.element],
  });
  const board = createElement('section', {
    classNames: 'board',
    attributes: { 'aria-label': 'Memory cards' },
  });
  const main = createElement('main', {
    classNames: 'main',
    children: [stats, board],
  });

  return {
    main,
    board,
    movesValue: moves.valueElement,
    pairsValue: pairs.valueElement,
  };
}

function createCard(card, index) {
  const image = createElement('img', {
    classNames: 'memory-card__image',
    attributes: {
      src: card.src,
      alt: card.alt,
      draggable: 'false',
    },
  });
  const front = createElement('span', {
    classNames: ['memory-card__face', 'memory-card__front'],
    attributes: { 'aria-hidden': 'true' },
    children: [image],
  });
  const backMark = createElement('span', {
    classNames: 'memory-card__mark',
    text: 'M',
    attributes: { 'aria-hidden': 'true' },
  });
  const back = createElement('span', {
    classNames: ['memory-card__face', 'memory-card__back'],
    attributes: { 'aria-hidden': 'true' },
    children: [backMark],
  });
  const inner = createElement('span', {
    classNames: 'memory-card__inner',
    children: [back, front],
  });

  return createElement('button', {
    classNames: 'memory-card',
    attributes: {
      type: 'button',
      'aria-label': `Hidden memory card ${index + 1}`,
      'aria-pressed': 'false',
    },
    dataset: { cardId: card.instanceId },
    children: [inner],
  });
}

function renderBoard(board, cards) {
  const cardElements = cards.map(createCard);
  board.replaceChildren(...cardElements);
}

function createApp() {
  const header = createHeader();
  const gameArea = createGameArea();
  const app = createElement('div', {
    classNames: 'app',
    children: [header.header, gameArea.main],
  });
  const modal = createModal();

  document.body.append(app, modal.dialog);
  let gameState;

  function startNewGame() {
    gameState = createGameState();

    gameArea.movesValue.textContent = String(gameState.moves);
    gameArea.pairsValue.textContent = `${gameState.matchedPairs} / ${PAIR_COUNT}`;
    renderBoard(gameArea.board, gameState.cards);
  }

  header.newGameButton.addEventListener('click', startNewGame);
  startNewGame();
}

createApp();
