const assert = require('assert');
const PieceGameLogic = require('../src/piecegamelogic.js');

// This module was separated from the Piece module to remove all circular dependencies in original architecture.
// @todo however, isPossibleToMoveTo no longer has ability to figure out if King can castle (see king.js) due to removal of circular deps...

// Piece is a general module for the chess piece modules.
// Should only test functionalities that are particularly inter-piece functionalities.

function testKingCanCastleRookWhenNeitherHaveMoved() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0',' ',' ','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  let canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  assert.equal(canCastle,true);
}

function testKingCannotCastleRookWhenOneHasMoved() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k1',' ',' ','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  let canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  assert.equal(canCastle,false);
}

function testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0',' ',' ',' ','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:7,c:0};
  let canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  assert.equal(canCastle,true);
}

function testIsInCheck() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0',' ','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:5,c:1};
  let isInCheck = PieceGameLogic.isInCheck(gameState,src);
  assert.equal(isInCheck,true);
}

function testIsNotInCheck() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0',' ','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:4,c:1};
  let isInCheck = PieceGameLogic.isInCheck(gameState,src);
  assert.equal(isInCheck,false);
}

function testIsInCheckmate() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0',' ','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:5,c:1};
  let isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
  assert.equal(isInCheckmate,true);
}

function testIsNotInCheckmate() {
  let gameState = {};
  gameState.board = [
    ['R0',' ','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','H0',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:5,c:1};
  let isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
  assert.equal(isInCheckmate,true);
}

function testIsCapture() {
  let gameState = {};
  gameState.board = [
    ['R0',' ','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','H0',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerBlack;
  const src = {r:5,c:1};
  const dst = {r:7,c:2};
  let isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  assert.equal(isCapture,true);
}

function testInvalidCaptureIsNotCapture() {
  let gameState = {};
  gameState.board = [
    ['R0',' ','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','H0',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:5,c:1};
  const dst = {r:7,c:5};
  let isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  assert.equal(isCapture,false);
}

function testCastlingIsNotCapture() {
  let gameState = {};
  gameState.board = [
    ['R0','H0','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0',' ',' ','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  let isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  assert.equal(isCapture,false);
}

function testValidNonCaptureIsNotCapture() {
  let gameState = {};
  gameState.board = [
    ['R0',' ','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
    ['P0','P0','P0','P0','P0','P0','P0','P0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','H0',' ',' ',' ',' ',' ',' '],
    ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
    ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
  gameState.board.rowLength = 8;
  gameState.board.colLength = 8;
  gameState.playerWhite = 0;
  gameState.playerBlack = 1;
  gameState.player = gameState.playerWhite;
  const src = {r:6,c:3};
  const dst = {r:4,c:3};
  let isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  assert.equal(isCapture,false);
}

// function testRandomDefensiveMove() {
//   let gameState = {};
//   gameState.board = [
//     ['R0',' ','B0','Q0','K0','B0','H0','R0'], // upper case: black pieces
//     ['P0','P0','P0','P0','P0','P0','P0','P0'],
//     [' ',' ',' ',' ',' ',' ',' ',' '],
//     [' ',' ',' ',' ',' ',' ',' ',' '],
//     [' ',' ',' ',' ',' ',' ',' ',' '],
//     [' ','H0',' ',' ',' ',' ',' ',' '],
//     ['p0','p0','p0','p0','p0','p0','p0','p0'], // lower case: white pieces
//     ['r0','h0','b0','q0','k0','b0','h0','r0'] ];
//   gameState.board.rowLength = 8;
//   gameState.board.colLength = 8;
//   gameState.playerWhite = 0;
//   gameState.playerBlack = 1;
//   gameState.player = gameState.playerWhite;
//   const src = {r:5,c:1};
//   let isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
//   assert.equal(isInCheckmate,true);
// }

testKingCanCastleRookWhenNeitherHaveMoved();
testKingCannotCastleRookWhenOneHasMoved();
testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved();
testIsInCheck();
testIsNotInCheck();
testIsInCheckmate();
testIsNotInCheckmate();
testIsCapture();
testInvalidCaptureIsNotCapture();
testCastlingIsNotCapture();
testValidNonCaptureIsNotCapture();
