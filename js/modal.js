import { createElement } from './dom.js';

export function createModal() {
  const title = createElement('h2', {
    classNames: 'modal__title',
    attributes: { id: 'modal-title' },
  });
  const content = createElement('div', { classNames: 'modal__content' });
  const actions = createElement('div', { classNames: 'modal__actions' });
  const surface = createElement('div', {
    classNames: 'modal__surface',
    children: [title, content, actions],
  });
  const dialog = createElement('dialog', {
    classNames: 'modal',
    attributes: { 'aria-labelledby': 'modal-title' },
    children: [surface],
  });

  return { dialog, surface, title, content, actions };
}
