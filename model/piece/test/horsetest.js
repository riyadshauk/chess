const assert = require('assert');
const Horse = require('../src/horse.js');

function testHorseCanMoveToValidPiece() {
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
  const src = {r:7,c:1};
  const dst = {r:5,c:2};
  let isPossibleToMoveTo = Horse.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}
function testHorseCannotMoveToInvalidBoxOnOwnPiece() {
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
  const src = {r:7,c:1};
  const dst = {r:6,c:1};
  let isPossibleToMoveTo = Horse.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}
function testHorseCannotMoveToInvalidEmptyBox() {
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
  const src = {r:7,c:1};
  const dst = {r:4,c:1};
  let isPossibleToMoveTo = Horse.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}
function testHorseCannotFriendlyFireToValieBox() {
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
  const src = {r:7,c:1};
  const dst = {r:6,c:3};
  let isPossibleToMoveTo = Horse.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

testHorseCanMoveToValidPiece();
testHorseCannotMoveToInvalidBoxOnOwnPiece();
testHorseCannotMoveToInvalidEmptyBox();
testHorseCannotFriendlyFireToValieBox();
