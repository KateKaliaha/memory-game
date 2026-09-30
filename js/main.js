import { APP_TITLE, PAIR_COUNT } from './config.js';
import { createElement } from './dom.js';
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
  const placeholder = createElement('p', {
    classNames: 'board__placeholder',
    text: 'Cards will appear here.',
  });
  const board = createElement('section', {
    classNames: 'board',
    attributes: { 'aria-label': 'Memory cards' },
    children: [placeholder],
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

function createApp() {
  const header = createHeader();
  const gameArea = createGameArea();
  const app = createElement('div', {
    classNames: 'app',
    children: [header.header, gameArea.main],
  });
  const modal = createModal();

  document.body.append(app, modal.dialog);
}

createApp();
