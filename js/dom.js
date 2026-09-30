export function createElement(
  tagName,
  { classNames = [], text, attributes = {}, dataset = {}, children = [] } = {},
) {
  const element = document.createElement(tagName);
  const normalizedClassNames = Array.isArray(classNames)
    ? classNames
    : [classNames];

  element.classList.add(...normalizedClassNames.filter(Boolean));

  if (text !== undefined) {
    element.textContent = text;
  }

  Object.entries(attributes).forEach(([name, value]) => {
    if (value === false || value === null || value === undefined) {
      return;
    }

    if (value === true) {
      element.setAttribute(name, '');
      return;
    }

    element.setAttribute(name, String(value));
  });

  Object.entries(dataset).forEach(([name, value]) => {
    element.dataset[name] = String(value);
  });

  element.append(...children);

  return element;
}
