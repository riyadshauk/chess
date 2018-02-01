'use strict';

var assert = require('assert');
var Pawn = require('../src/pawn.js');

function testWhitePawnCanMove1ForwardWhenNumMovesIsZero() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 5, c: 0 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testWhitePawnCanMove2ForwardWhenNumMovesIsZero() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 4, c: 0 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testWhitePawnCannotMove2ForwardWhenNumMovesIsNotZero() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 4, c: 0 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState, src, 1);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testWhitePawnCannotMove3Forward() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 3, c: 0 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testWhitePawnCannotGoRight1() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 6, c: 1 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testWhitePawnCannotGoDiagonalWithNoAttack() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 5, c: 1 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testWhitePawnCanAttack() {
  var gameState2 = {};
  gameState2.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', ' ', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'p0', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState2.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState2.board.colLength = 8;
  gameState2.playerWhite = 0;
  gameState2.playerBlack = 1;
  gameState2.player = gameState2.playerWhite;
  var src = { r: 6, c: 0 };
  var dst = { r: 5, c: 1 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testBlackPawnCannotGoBack1() {
  var gameState2 = {};
  gameState2.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', ' ', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'p0', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState2.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState2.board.colLength = 8;
  gameState2.playerWhite = 0;
  gameState2.playerBlack = 1;
  gameState2.player = gameState2.playerBlack;
  var src = { r: 5, c: 1 };
  var dst = { r: 4, c: 1 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2, src, 1);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testBlackPawnCanGoForward1() {
  var gameState2 = {};
  gameState2.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', ' ', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'p0', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState2.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState2.board.colLength = 8;
  gameState2.playerWhite = 0;
  gameState2.playerBlack = 1;
  gameState2.player = gameState2.playerBlack;
  var src = { r: 4, c: 1 };
  var dst = { r: 5, c: 1 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2, src, 1);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testBlackPawnCannotGoHorizontal() {
  var gameState2 = {};
  gameState2.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', ' ', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'p0', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState2.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState2.board.colLength = 8;
  gameState2.playerWhite = 0;
  gameState2.playerBlack = 1;
  gameState2.player = gameState2.playerBlack;
  var src = { r: 4, c: 1 };
  var dst = { r: 4, c: 2 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2, src, 1);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testNoFriendlyFire() {
  var gameState2 = {};
  gameState2.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', 'H0', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', ' ', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState2.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState2.board.colLength = 8;
  gameState2.playerWhite = 0;
  gameState2.playerBlack = 1;
  gameState2.player = gameState2.playerBlack;
  var src = { r: 5, c: 1 };
  var dst = { r: 4, c: 2 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testNoVeryStrangeFriendlyFire() {
  var gameState2 = {};
  gameState2.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', 'H0', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', ' ', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState2.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState2.board.colLength = 8;
  gameState2.playerWhite = 0;
  gameState2.playerBlack = 1;
  gameState2.player = gameState2.playerBlack;
  var src = { r: 5, c: 2 };
  var dst = { r: 4, c: 2 };
  var isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

// run tests
testWhitePawnCanMove1ForwardWhenNumMovesIsZero();
testWhitePawnCanMove2ForwardWhenNumMovesIsZero();
testWhitePawnCannotMove2ForwardWhenNumMovesIsNotZero();
testWhitePawnCannotMove3Forward();
testWhitePawnCannotGoRight1();
testWhitePawnCannotGoDiagonalWithNoAttack();
testWhitePawnCanAttack();
testBlackPawnCannotGoBack1();
testBlackPawnCanGoForward1();
testBlackPawnCannotGoHorizontal();
testNoFriendlyFire();
testNoVeryStrangeFriendlyFire();