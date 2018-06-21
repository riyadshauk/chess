# chess
[![Build Status](https://travis-ci.org/riyadshauk/chess.svg?branch=master)](https://travis-ci.org/riyadshauk/chess)
Though I made this game for fun, I was able to include [an online demo here](http://web.engr.illinois.edu/~shauk2/), from my alma mater's domain (working while I still have access to the domain : )

Updated Demo: I also have a [Heroku app, here](https://chess-riyad.herokuapp.com/), that automatically pulls and deploys the latest version of the chess game on this repository.

This is a chess game written in ES6 TypeScript, HTML 5, CSS (no fancy/modular Flexbox, CSS Grid Layout, or media queries in this simple game... maybe down the road), and bundled with the Webpack (4.10.0 / latest as of now). The View is modeled after [the vanilla ES6 TodoMVC example](http://todomvc.com/examples/vanilla-es6/).
![Chessplay GIF](chessplay.gif)  

#### Local Setup (copy-paste the following into a shell):
```shell
git clone https://github.com/riyadshauk/chess
cd chess
npm install
npm test # * optional step * should see all 65+ tests passing in shell : )
npm run build
open public/index.html # (open is a macos command, opens file in default browser)
```

**Note:** The game source files are already bundled into one javascript file, so it works locally without needing to install anything. Just open chess/front_end/public/index.html in a browser to play.  

#### Todo: Codebase
- [x] heavily refactor codebase (make more modular, less coupled) (update: designed to MVCS pattern)
- [x] extract out logic from controller, make simpler / more concise / more readable (update: game logic is now contained in calls to Model)
- [x] revisit the decision to use Google Closure Compiler, refactor (update: Closure Compiler no longer used here!)
- [x] make tests forward-compatible with ES6 and look into testing libraries (ie mocha/chai)
- [x] refactor to use TypeScript (update: 100% TS with noImplicitAny: true)
- [x] simplify file heirarchy to more straightforward MVC structure (update: MVCS structure, naturally since Model is purely functional)
- [x] remove superfluous interfaces / abstraction, simplify; consider using a standardized interface / notation
- [ ] make a version of this game where the VCS (in MVCS) is in React (naturally, using .tsx files)

#### Todo: Chess Gameplay Features
- [ ] add game-end condition recognition
- [ ] add undo/redo functionality (consider use of FEN, PGN, SAN)
- [ ] add ability to load/save game
- [ ] game timer
- [ ] be able to play against computer/AI

#### Todo: General Project Features
- [ ] users & client/server
- [ ] chat
- [ ] ML?
- [ ] live extensibility
