import { Box, Piece, EmptyPiece, GameState, PLAYER_BLACK, Board } from '../types';
import { PieceGameLogic } from './piecegamelogic';
import { expect } from 'chai';
import 'mocha';
import Knight from './knight';
import Pawn from './pawn';

// This module was separated from the Piece module to remove all circular dependencies in original architecture.

describe('PieceGameLogic Test Suite', () => {
  describe('castling', () => {
    it('testKingCanCastleRookWhenNeitherHaveMoved', () => testKingCanCastleRookWhenNeitherHaveMoved());
    it('testKingCannotCastleRookWhenOneHasMoved', () => testKingCannotCastleRookWhenOneHasMoved());
    it('testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved', () => testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved());
    it('testCastlingIsNotCapture', () => testCastlingIsNotCapture());
  });
  describe('check', () => {
    it('testIsInCheck', () => testIsInCheck());
    it('testIsNotInCheck', () => testIsNotInCheck());
    it('testIsInCheckmate', () => testIsInCheckmate());
    it('testIsNotInCheckmate', () => testIsNotInCheckmate());
  });
  describe('capture', () => {
    it('testIsCapture', () => testIsCapture());
    it('testInvalidCaptureIsNotCapture', () => testInvalidCaptureIsNotCapture());
    it('testValidNonCaptureIsNotCapture', () => testValidNonCaptureIsNotCapture());
  });
  describe('EnPassant', () => {
    it('testPawnCannotEnPassantWhenCorrectTurn', () => testPawnCannotEnPassantWhenCorrectTurn());
    it('testPawnCanEnPassantWhenCorrectTurn', () => testPawnCanEnPassantWhenCorrectTurn());
    it('testPawnCannotEnPassantWhenPrevDstIsSrc', () => testPawnCannotEnPassantWhenPrevDstIsSrc());
  });
  describe('Promotion', () => {
    it('testGetBoxOfPromotablePieceWhenNotPossible', () => testGetBoxOfPromotablePieceWhenNotPossible());
    it('testGetBoxOfPromotablePieceWhenPossible', () => testGetBoxOfPromotablePieceWhenPossible());
    it('testPromoteIfPossibleWhenNotInCorrectPosition', () => testPromoteIfPossibleWhenNotInCorrectPosition());
    it('testPromoteIfPossibleWhenInCorrectPositionWithIncorrectColor', () => testPromoteIfPossibleWhenInCorrectPositionWithIncorrectColor());
    it('testPromoteIfPossibleWhenInCorrectPositionWithCorrectColor', () => testPromoteIfPossibleWhenInCorrectPositionWithCorrectColor());
  });
  /**
   * When testing getPossibleMoves:
   * Note the use of a set rather than (very incorrectly) assuming row-major order
   * shall always be used in constructing possibleMoves.
   */
  describe('getPossibleMoves', () => {
    it('testGetPossibleMovesStartingPawn', () => testGetPossibleMovesStartingPawn());
    it('testGetPossibleMovesWithCapture', () => testGetPossibleMovesWithCapture());
    it('testGetPossibleMovesWithEnPassant', () => testGetPossibleMovesWithEnPassant());
    it('testGetPossibleMovesWithCastling', () => testGetPossibleMovesWithCastling());
  });
  /**
   * Note that makeLegalMove requires a prevMove; however, on the very first move of a game, that doesn't make sense.
   * For that, any move is fine as a prevMove, but preferrably one with in-bound indices to avoid potential
   * runtime errors from accessing a GameState at an out-of-bounds positiong of the Array<Array<Box>>.
   * So, I decided to choose `const prevMove = { src: { r: 0, c: 0 }, dst: { r: 0, c: 0 } };` 
   * to signify the first move being played, at least while testing.
   */
  describe('makeLegalMove', () => {
    it('testMakeLegalMoveStartingPawn', () => testMakeLegalMoveStartingPawn());
    it('testMakeLegalMoveEnPassant', () => testMakeLegalMoveEnPassant());
    it('testMakeLegalMoveBlackCaptureNotTurn', () => testMakeLegalMoveBlackCaptureNotTurn());
    it('testMakeLegalMoveBlackCaptureBlacksTurn', () => testMakeLegalMoveBlackCaptureBlacksTurn());
  });
  /**
   * @todo
   */
  describe('Ensure this module has no side effects', () => {
    // @todo test makeLegalMove, makeEnPassant, castling here
    it('should work', () => testPGLHasNoSideEffects1());
  });
});

const testKingCanCastleRookWhenNeitherHaveMoved = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0',' ',' ','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  const canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  expect(canCastle).to.equal(true);
};

const testKingCannotCastleRookWhenOneHasMoved = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','k1',' ',' ','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  const canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  expect(canCastle).to.equal(false);
};

const testKingCanCastleRookFromOtherSideWhenNeitherHaveMoved = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ',' ',' ','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:4};
  const dst = {r:7,c:0};
  const canCastle = PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst);
  expect(canCastle).to.equal(true);
};

const testIsInCheck = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:5,c:1};
  const isInCheck = PieceGameLogic.isInCheck(gameState,src);
  expect(isInCheck).to.equal(true);
};

const testIsNotInCheck = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:4,c:1};
  const isInCheck = PieceGameLogic.isInCheck(gameState,src);
  expect(isInCheck).to.equal(false);
};

const testIsInCheckmate = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:5,c:1};
  const isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
  expect(isInCheckmate).to.equal(true);
};

const testIsNotInCheckmate = () => {
  const board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:5,c:1};
  gameState.player = 1;
  const isInCheckmate = PieceGameLogic.isInCheckmate(gameState,src);
  expect(isInCheckmate).to.equal(false);
};

const testIsCapture = () => {
  const board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h1',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  gameState.player = PLAYER_BLACK;
  const src = {r:5,c:1};
  const dst = {r:7,c:2};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(true);
};

const testInvalidCaptureIsNotCapture = () => {
  const board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:5,c:1};
  const dst = {r:7,c:5};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(false);
};

const testCastlingIsNotCapture = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0',' ',' ','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:4};
  const dst = {r:7,c:7};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(false);
};

const testValidNonCaptureIsNotCapture = () => {
  const board = [
    ['r0',' ','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','h0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:6,c:3};
  const dst = {r:4,c:3};
  const isCapture = PieceGameLogic.isACapture(gameState,src,dst);
  expect(isCapture).to.equal(false);
};

const testPawnCannotEnPassantWhenCorrectTurn = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ','P1',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:4,c:6};
  const prevMove = { src: { r: 1, c: 3 }, dst: { r: 3, c: 3 } };
  const possible = PieceGameLogic.isEnPassantPossible(gameState, src, prevMove);
  expect(possible).to.equal(false);
};

const testPawnCanEnPassantWhenCorrectTurn = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ','P2','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:3,c:6};
  const prevMove = { src: { r: 1, c: 7 }, dst: { r: 3, c: 7 } };
  const possible = PieceGameLogic.isEnPassantPossible(gameState, src, prevMove);
  expect(possible).to.equal(true);
};

const testPawnCannotEnPassantWhenPrevDstIsSrc = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ','P2','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:3,c:6};
  const prevMove = { src: { r: 4, c: 6 }, dst: { r: 3, c: 6 } };
  const possible = PieceGameLogic.isEnPassantPossible(gameState, src, prevMove);
  expect(possible).to.equal(false);
};

const testGetBoxOfPromotablePieceWhenNotPossible = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0',' ','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0','P2',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ',' ','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const possibleBox = PieceGameLogic.getBoxOfPromotablePieceIfPossible(gameState);
  expect(possibleBox).to.equal(undefined);
};

const testGetBoxOfPromotablePieceWhenPossible = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','P2','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ',' ','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const box = { r: 0, c: 6 };
  const possibleBox = PieceGameLogic.getBoxOfPromotablePieceIfPossible(gameState);
  expect(possibleBox.r).to.equal(box.r);
  expect(possibleBox.c).to.equal(box.c);
};

const testPromoteIfPossibleWhenNotInCorrectPosition = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0',' ','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0','P2',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ',' ','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const box = { r: 1, c: 6 };
  const gs = PieceGameLogic.promoteIfPossible(gameState, box, (new Knight('white')));
  expect(PieceGameLogic.getType(gs.getEncoding(box)).name).to.equal('pawn');
};

const testPromoteIfPossibleWhenInCorrectPositionWithIncorrectColor = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','P2','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ',' ','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const box = { r: 0, c: 6 };
  const gs = PieceGameLogic.promoteIfPossible(gameState, box, (new Knight('black')));
  expect(PieceGameLogic.getType(gs.getEncoding(box)).name).to.equal('pawn');
};

const testPromoteIfPossibleWhenInCorrectPositionWithCorrectColor = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','P2','r0'], // lower case: black pieces
    ['p0','p0',' ','p0','p0','p0',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','p1',' ',' ',' ',' ','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const box = { r: 0, c: 6 };
  const gs = PieceGameLogic.promoteIfPossible(gameState, box, (new Knight('white')));
  expect(PieceGameLogic.getType(gs.getEncoding(box)).name).to.equal('knight');
};

const testGetPossibleMovesStartingPawn = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 6, c: 5 };
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState, src);
  expect(Array.isArray(possibleMoves));
  expect(possibleMoves.length === 2);
  expect(possibleMoves[0].c).to.equal(5);
  expect(possibleMoves[1].c).to.equal(5);
  const c5set = new Set();
  c5set.add(possibleMoves[0].r);
  c5set.add(possibleMoves[1].r);
  expect(c5set.has(4)).to.be.true;
  expect(c5set.has(5)).to.be.true;
};

const testGetPossibleMovesWithCapture = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ','p0'],
    [' ',' ',' ',' ',' ',' ','P0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 4, c: 6 };
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState, src);
  expect(Array.isArray(possibleMoves));
  expect(possibleMoves.length === 2);
  const set = new Set();
  possibleMoves.forEach((move: Box) => set.add(JSON.stringify(move)));
  const move1 = JSON.stringify({ r: 3, c: 6 });
  const move2 = JSON.stringify({ r: 3, c: 7 });
  expect(set.has(move1)).to.be.true;
  expect(set.has(move2)).to.be.true;
};

const testGetPossibleMovesWithEnPassant = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ','P0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 3, c: 6 };
  const prevMove = { src: { r: 1, c: 7 }, dst: { r: 3, c: 7 } };
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState, src, prevMove);
  expect(Array.isArray(possibleMoves));
  expect(possibleMoves.length === 2);
  const set = new Set();
  possibleMoves.forEach((move: Box) => set.add(JSON.stringify(move)));
  const move1 = JSON.stringify({ r: 2, c: 6 });
  const move2 = JSON.stringify({ r: 2, c: 7 });
  expect(set.has(move1)).to.be.true;
  expect(set.has(move2)).to.be.true;
};

const testGetPossibleMovesWithCastling = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ','P0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0',' ',' ',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0',' ',' ','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 7, c: 4 };
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState, src);
  expect(Array.isArray(possibleMoves));
  expect(possibleMoves.length === 4);
  const set = new Set();
  possibleMoves.forEach((move: Box) => set.add(JSON.stringify(move)));
  const moves = [ 
    JSON.stringify({ r: 6, c: 4 }),
    JSON.stringify({ r: 6, c: 5 }),
    JSON.stringify({ r: 7, c: 7 }),
    JSON.stringify({ r: 7, c: 7 }) // 'castle' move
  ];
  expect(set.has(moves[0]) && set.has(moves[1]) && set.has(moves[2]) && set.has(moves[3])).to.be.true;
};

const testMakeLegalMoveStartingPawn = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 6, c: 5 };
  const dst = { r: 4, c: 5 };
  const prevMove = { src: { r: 0, c: 0 }, dst: { r: 0, c: 0 } };
  const ret = PieceGameLogic.makeLegalMove(gameState, src, dst, prevMove);
  expect(ret.capturedPiece instanceof EmptyPiece).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(src)) instanceof EmptyPiece).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(dst)) instanceof Pawn).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(dst)).color).to.equal('white');
  expect(ret.gameState.getEncoding(dst)).to.equal('P1');
};

const testMakeLegalMoveEnPassant = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ','P2','p1'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 3, c: 6 };
  const dst = { r: 2, c: 7 };
  const prevMove = { src: { r: 1, c: 7 }, dst: { r: 3, c: 7 } };
  const ret = PieceGameLogic.makeLegalMove(gameState, src, dst, prevMove);
  expect(ret.capturedPiece instanceof Pawn).to.be.true;
  expect(ret.capturedPiece.color).to.equal('black');
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(src)) instanceof EmptyPiece).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(prevMove.dst)) instanceof EmptyPiece).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(dst)) instanceof Pawn).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(dst)).color).to.equal('white');
  expect(ret.gameState.getEncoding(dst)).to.equal('P3');
};

const testMakeLegalMoveBlackCaptureNotTurn = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ','P2'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 1, c: 6 };
  const dst = { r: 2, c: 7 };
  const prevMove = { src: { r: 3, c: 6 }, dst: { r: 2, c: 7 } };
  const ret = PieceGameLogic.makeLegalMove(gameState, src, dst, prevMove);
  expect(ret.capturedPiece instanceof Pawn).to.be.false;
};

const testMakeLegalMoveBlackCaptureBlacksTurn = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ','P2'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 1, c: 6 };
  const dst = { r: 2, c: 7 };
  const prevMove = { src: { r: 3, c: 6 }, dst: { r: 2, c: 7 } };
  gameState.player = 1;
  const ret = PieceGameLogic.makeLegalMove(gameState, src, dst, prevMove);
  expect(ret.capturedPiece instanceof Pawn).to.be.true;
  expect(ret.capturedPiece.color).to.equal('white');
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(src)) instanceof EmptyPiece).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(dst)) instanceof Pawn).to.be.true;
  expect(PieceGameLogic.getType(ret.gameState.getEncoding(dst)).color).to.equal('black');
  expect(ret.gameState.getEncoding(dst)).to.equal('p1');
};

const testPGLHasNoSideEffects1 = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0',' '],
    [' ',' ',' ',' ',' ',' ',' ','P2'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0',' ','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = { r: 1, c: 6 };
  const dst = { r: 2, c: 7 };
  const prevMove = { src: { r: 3, c: 6 }, dst: { r: 2, c: 7 } };
  gameState.player = 1;

  const ret1 = PieceGameLogic.makeLegalMove(gameState, src, dst, prevMove);
  const ret2 = PieceGameLogic.castleKingWithGivenRook(gameState,  src, dst);
  const ret3 = PieceGameLogic.promoteIfPossible(gameState, src, PieceGameLogic.getType(gameState.getEncoding(dst)));
  const ret4 = PieceGameLogic.makeLegalMove(gameState, src, dst, prevMove);

  expect(gameState).to.not.equal(ret1.gameState);
  expect(gameState).to.equal(ret2); // because King can't castle in this circumstance. @todo test the other branch.
  expect(gameState).to.not.equal(ret3);
  expect(gameState).to.not.equal(ret4);
};