import { initialGameState, GameState } from './gamestate';
import Rook from './rook';
import { PieceGameLogic } from './piecegamelogic';
import { Piece, Box } from './piece';
import { expect } from 'chai';
import 'mocha';

describe('rook test cases', () => {
  it('testRookCanForwardWithNoObstruction', () => testRookCanForwardWithNoObstruction());
  it('testRookCannotGoForwardWithObstruction', () => testRookCannotGoForwardWithObstruction());
  it('testRookCanGoHorizontalWithoutObstruction', () => testRookCanGoHorizontalWithoutObstruction());
  it('testRookCannotGoHorizontalWithObstruction', () => testRookCannotGoHorizontalWithObstruction());
  it('testRookCanGoForwardAndCaptureEnemyPiece', () => testRookCanGoForwardAndCaptureEnemyPiece());
  it('testRookCannotGoForwardThrough2EnemyPieces', () => testRookCannotGoForwardThrough2EnemyPieces());
  it('testRookCannotGoForwardThrough1EnemyPiece', () => testRookCannotGoForwardThrough1EnemyPiece());
});

const testRookCanForwardWithNoObstruction = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:4,c:0};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};

const testRookCannotGoForwardWithObstruction = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:4,c:0};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};

const testRookCanGoHorizontalWithoutObstruction = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ',' ','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:7,c:2};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};

const testRookCannotGoHorizontalWithObstruction = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ',' ','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:7,c:3};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};

const testRookCanGoForwardAndCaptureEnemyPiece = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:1,c:0};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};

const testRookCannotGoForwardThrough2EnemyPieces = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:0,c:0};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};

const testRookCannotGoForwardThrough1EnemyPiece = () => {
  const gameState = initialGameState();
  gameState.board = [
    [' ','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
   const src = {r:7,c:0};
  const dst = {r:0,c:0};
  const Rook = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibconstoMoveTo = Rook.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};