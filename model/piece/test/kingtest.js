const assert = require('assert');
const King = require('../src/king.js');

function testKingCannotGoThroughOwnPiece() {
  let gameState = {};
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:6,c:4};
  let isPossibleToMoveTo = King.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testKingCanMoveDiagonalWhenPathNotObstructed() {
  let gameState = {};
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0',' ','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:6,c:3};
  let isPossibleToMoveTo = King.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testKingCanMoveStraightWhenPathNotObstructed() {
  let gameState = {};
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0',' ','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:6,c:4};
  let isPossibleToMoveTo = King.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

testKingCannotGoThroughOwnPiece();
testKingCanMoveDiagonalWhenPathNotObstructed();
testKingCanMoveStraightWhenPathNotObstructed();
