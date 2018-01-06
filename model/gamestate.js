// this file is just for reference of how the gameState object should generally look
// JavaScript doesn't have interfaces with supported type-checking, so just putting an example usage here.

var gameState = {};
gameState.board = [
  ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
  ['P0','P0','P0','P0','P0','P0','P0','P0'],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
  ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
gameState.board.colLength = 8;
gameState.playerWhite = 0;
gameState.playerBlack = 1;
gameState.player = gameState.playerWhite;
gameState.status = 'playing';
gameState.winner = '';
gameState.tie = '';
