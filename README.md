# Memory Game

Memory Game is a responsive browser game in which the player opens cards and
finds all matching pairs in as few moves as possible.

The application uses one of two randomly selected image collections for every
new game. Each collection contains eight unique images, and every image appears
twice on the board.

## Features

- 4 × 4 board with eight matching pairs
- random image collection and card order for every new game
- move and matched-pair counters
- temporary board lock while mismatched cards are visible
- restart without reloading the page
- reusable victory and leaderboard dialog
- persistent top-10 leaderboard stored in `localStorage`
- keyboard-accessible controls
- responsive layout for desktop and mobile screens
- reduced-motion support

## How to play

1. Open one card and remember its image.
2. Open a second card.
3. Matching cards remain open. Mismatched cards close after a short delay.
4. Find all eight pairs to finish the game.

One move is counted whenever the second available card is opened, whether the
two cards match or not.

## Technologies

- HTML5
- CSS3
- JavaScript ES modules
- Web Storage API
- native HTML `<dialog>` element

The interface and game logic are implemented without third-party libraries or
frameworks. All application markup is generated with `document.createElement`.

## Local setup

No dependency installation or build step is required. Clone the repository,
switch to the `memory-game` branch, and start any local static server.

For example, with Python:

```bash
git clone https://github.com/KateKaliaha/memory-game.git
cd memory-game
git switch memory-game
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000) in a browser.

Alternatively, use Live Server in your code editor or run:

```bash
npx serve .
```

Opening `index.html` directly is not recommended because the project uses ES
modules.

## Project structure

```text
assets/images/   card image collections
css/styles.css   responsive interface and card animations
js/data.js       card collection data
js/dom.js        DOM element helper
js/game.js       game state and matching rules
js/leaderboard.js leaderboard persistence and sorting
js/modal.js      shared dialog component
js/utils.js      shuffle and date utilities
js/main.js       application rendering and event handling
```

## Assets

The card illustrations were generated for this project and converted to
optimized WebP files.
