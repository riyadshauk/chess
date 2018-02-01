'use strict';

var assert = require('assert');
var Rook = require('../src/rook.js');

function testRookCanForwardWithNoObstruction() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 4, c: 0 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testRookCannotGoForwardWithObstruction() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 4, c: 0 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testRookCanGoHorizontalWithoutObstruction() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', ' ', ' ', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 7, c: 2 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testRookCannotGoHorizontalWithObstruction() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', ' ', ' ', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 7, c: 3 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testRookCanGoForwardAndCaptureEnemyPiece() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 1, c: 0 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testRookCannotGoForwardThrough2EnemyPieces() {
  var gameState = {};
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 0, c: 0 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testRookCannotGoForwardThrough1EnemyPiece() {
  var gameState = {};
  gameState.board = [[' ', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  var src = { r: 7, c: 0 };
  var dst = { r: 0, c: 0 };
  var isPossibleToMoveTo = Rook.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

testRookCanForwardWithNoObstruction();
testRookCannotGoForwardWithObstruction();
testRookCanGoHorizontalWithoutObstruction();
testRookCannotGoHorizontalWithObstruction();
testRookCanGoForwardAndCaptureEnemyPiece();
testRookCannotGoForwardThrough2EnemyPieces();
testRookCannotGoForwardThrough1EnemyPiece();