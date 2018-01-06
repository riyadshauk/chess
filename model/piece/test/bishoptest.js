const assert = require('assert');
const Bishop = require('../src/bishop.js');

function testBishopCannotGoThroughOwnPiece() {
  let gameState = {};
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
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testBishopCanMoveWhenPathFree() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0',' ','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testBishopCanMoveWhenDestIsEnemy() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    [' ','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0',' ',' ',' ',' ',' ',' ',' '],
    ['p0',' ','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testBishopCannotMoveWhenDestIsOwnTeam() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testBishopCannotGoStraightForwardWithPieceInFront() {
  let gameState = {};
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
  const src = {r:7,c:2};
  const dst = {r:5,c:5};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testBishopCannotGoStraightForwardWithClearPath() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0',' ',' ',' ','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:2};
  const dst = {r:5,c:5};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

testBishopCannotGoThroughOwnPiece();
testBishopCanMoveWhenPathFree();
testBishopCanMoveWhenDestIsEnemy();
testBishopCannotMoveWhenDestIsOwnTeam();
testBishopCannotGoStraightForwardWithPieceInFront();
testBishopCannotGoStraightForwardWithClearPath();
