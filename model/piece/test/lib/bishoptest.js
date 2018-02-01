'use strict';

var _gamestate = require('../../gamestate');

var _gamestate2 = _interopRequireDefault(_gamestate);

var _bishop = require('../src/bishop');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const GameState = require('../../gamestate_es5.js').GameState;
// const initialGameState = require('../../gamestate_es5.js').initialGameState;
// const Bishop = require('../src/bishop.js');
var assert = require('assert');

function testBishopCannotGoThroughOwnPiece() {
  var gameState = (0, _gamestate2.default)();
  var src = { r: 7, c: 2 };
  var dst = { r: 5, c: 0 };
  var isPossibleToMoveTo = _bishop.Bishop.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testBishopCanMoveWhenPathFree() {
  var gameState = (0, _gamestate2.default)();
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', ' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  var src = { r: 7, c: 2 };
  var dst = { r: 5, c: 0 };
  var isPossibleToMoveTo = _bishop.Bishop.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testBishopCanMoveWhenDestIsEnemy() {
  var gameState = _gamestate2.default;
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  [' ', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['p0', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', ' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  var src = { r: 7, c: 2 };
  var dst = { r: 5, c: 0 };
  var isPossibleToMoveTo = _bishop.Bishop.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, true);
}

function testBishopCannotMoveWhenDestIsOwnTeam() {
  var gameState = (0, _gamestate2.default)();
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  var src = { r: 7, c: 2 };
  var dst = { r: 5, c: 0 };
  var isPossibleToMoveTo = _bishop.Bishop.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testBishopCannotGoStraightForwardWithPieceInFront() {
  var gameState = (0, _gamestate2.default)();
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  var src = { r: 7, c: 2 };
  var dst = { r: 5, c: 5 };
  var isPossibleToMoveTo = _bishop.Bishop.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

function testBishopCannotGoStraightForwardWithClearPath() {
  var gameState = (0, _gamestate2.default)();
  gameState.board = [['r0', 'h0', 'b0', 'q0', 'k0', 'b0', 'h0', 'r0'], // lower case: black pieces
  ['p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0', 'p0'], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '], ['P0', ' ', ' ', ' ', 'P0', 'P0', 'P0', 'P0'], // upper case: white pieces
  ['R0', 'H0', 'B0', 'Q0', 'K0', 'B0', 'H0', 'R0']];
  var src = { r: 7, c: 2 };
  var dst = { r: 5, c: 5 };
  var isPossibleToMoveTo = _bishop.Bishop.getPossibleMoves(gameState, src, 0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible, false);
}

testBishopCannotGoThroughOwnPiece();
testBishopCanMoveWhenPathFree();
testBishopCanMoveWhenDestIsEnemy();
testBishopCannotMoveWhenDestIsOwnTeam();
testBishopCannotGoStraightForwardWithPieceInFront();
testBishopCannotGoStraightForwardWithClearPath();