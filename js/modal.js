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
  let returnFocusElement = null;

  function closeModal() {
    if (dialog.open) {
      dialog.close();
    }
  }

  function openModal({
    heading,
    contentNodes = [],
    actionNodes = [],
    initialFocus = null,
    returnFocus = null,
  }) {
    title.textContent = heading;
    content.replaceChildren(...contentNodes);
    actions.replaceChildren(...actionNodes);
    returnFocusElement =
      returnFocus ??
      (document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null);
    document.body.classList.add('modal-open');

    if (!dialog.open) {
      dialog.showModal();
    }

    initialFocus?.focus();
  }

  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) {
      return;
    }

    const surfaceBounds = surface.getBoundingClientRect();
    const isInsideSurface =
      event.clientX >= surfaceBounds.left &&
      event.clientX <= surfaceBounds.right &&
      event.clientY >= surfaceBounds.top &&
      event.clientY <= surfaceBounds.bottom;

    if (!isInsideSurface) {
      closeModal();
    }
  });

  dialog.addEventListener('close', () => {
    document.body.classList.remove('modal-open');

    if (
      returnFocusElement?.isConnected &&
      !returnFocusElement.matches(':disabled')
    ) {
      returnFocusElement.focus();
    }

    returnFocusElement = null;
  });

  return { dialog, openModal, closeModal };
}
