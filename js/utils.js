export function getRandomItem(items) {
  if (items.length === 0) {
    throw new Error('Cannot select an item from an empty array.');
  }

  const randomIndex = Math.floor(Math.random() * items.length);
  return items[randomIndex];
}

export function shuffle(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}
