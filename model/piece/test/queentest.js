const assert = require('assert');
const Queen = require('../src/queen.js');

function testQueenCannotGoThroughOwnPiece() {
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
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:3};
  const dst = {r:4,c:0};
  var isPossibleToMoveTo = Queen.getPossibleMoves(gameState,src,0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testQueenCanMoveDiagonalWhenPathNotObstructed() {
  var gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0',' ','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:3};
  const dst = {r:4,c:0};
  var isPossibleToMoveTo = Queen.getPossibleMoves(gameState,src,0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testQueenCanMoveAlongColWhenPathNotObstructed() {
  var gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0',' ','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:3};
  const dst = {r:3,c:3};
  var isPossibleToMoveTo = Queen.getPossibleMoves(gameState,src,0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testQueenCanMoveAlongRowWhenPathNotObstructed() {
  var gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0',' ',' ','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:3};
  const dst = {r:7,c:1};
  var isPossibleToMoveTo = Queen.getPossibleMoves(gameState,src,0);
  var possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

testQueenCannotGoThroughOwnPiece();
testQueenCanMoveDiagonalWhenPathNotObstructed();
testQueenCanMoveAlongColWhenPathNotObstructed();
testQueenCanMoveAlongRowWhenPathNotObstructed();
