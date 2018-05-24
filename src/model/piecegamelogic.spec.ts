import { initialGameState, GameState } from './gamestate';
import { PieceGameLogic } from './piecegamelogic';
import { Piece, Box } from './piece';
import { expect } from 'chai';
import 'mocha';

// This module was separated from the Piece module to remove all circular dependencies in original architecture.
// @todo however, isPossibconstoMoveTo no longer has ability to figure out if King can castle (see king.js) due to removal of circular deps...

// Piece is a general module for the chess piece modules.
// Should only test constalities =  th=> at are particularly inter-piece constalities = .

describe('piecegamelogic test cases', () => {
  it('testKingCanCastleRookWhenNeitherHaveMoved', () => testKingCanCastleRookWhenNeitherHaveMoved());
  it('testKingCannotCastleRookWhenOneHasMoved', () => testKingCannotCastleRookWhenOneHasMoved());
  it('testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved', () => testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved());
  it('testIsInCheck', () => testIsInCheck());
  it('testIsNotInCheck', () => testIsNotInCheck());
  it('testIsInCheckmate', () => testIsInCheckmate());
  it('testIsNotInCheckmate', () => testIsNotInCheckmate());
  it('testIsCapture', () => testIsCapture());
  it('testInvalidCaptureIsNotCapture', () => testInvalidCaptureIsNotCapture());
  it('testCastlingIsNotCapture', () => testCastlingIsNotCapture());
  it('testValidNonCaptureIsNotCapture', () => testValidNonCaptureIsNotCapture());
});

const testKingCanCastleRookWhenNeitherHaveMoved = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0',' ',' ','R0'] ];
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  const canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  expect(canCastle).to.equal(true);
};

const testKingCannotCastleRookWhenOneHasMoved = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','k1',' ',' ','R0'] ];
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  const canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  expect(canCastle).to.equal(false);
};

const testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ',' ',' ','K0','B0','H0','R0'] ];
  const src = {r:7,c:4};
  const dst = {r:7,c:0};
  const canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  expect(canCastle).to.equal(true);
};

const testIsInCheck = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:5,c:1};
  const isInCheck = PieceGameLogic.isInCheck(gameState,src);
  expect(isInCheck).to.equal(true);
};

const testIsNotInCheck = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:4,c:1};
  const isInCheck = PieceGameLogic.isInCheck(gameState,src);
  expect(isInCheck).to.equal(false);
};

const testIsInCheckmate = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:5,c:1};
  const isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
  expect(isInCheckmate).to.equal(true);
};

const testIsNotInCheckmate = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:5,c:1};
  gameState.player = 1;
  const isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
  expect(isInCheckmate).to.equal(false);
};

const testIsCapture = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h1',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  gameState.player = gameState.playerBlack;
  const src = {r:5,c:1};
  const dst = {r:7,c:2};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(true);
};

const testInvalidCaptureIsNotCapture = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:5,c:1};
  const dst = {r:7,c:5};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(false);
};

const testCastlingIsNotCapture = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0',' ',' ','R0'] ];
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(false);
};

const testValidNonCaptureIsNotCapture = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:6,c:3};
  const dst = {r:4,c:3};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(false);
};

// const testRandomDefensiveMove = () => {
//   const gameState = initialGameState();
//   gameState.board = [
//     ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
//     ['p0','p0','p0','p0','p0','p0','p0','p0'],
//     [' ',' ',' ',' ',' ',' ',' ',' '],
//     [' ',' ',' ',' ',' ',' ',' ',' '],
//     [' ',' ',' ',' ',' ',' ',' ',' '],
//     [' ','h0',' ',' ',' ',' ',' ',' '],
//     ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
//     ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
// // // // // //   const src = {r:5,c:1};
//   const isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
//   expect(isInCheckmate).to.equal(true);
// };