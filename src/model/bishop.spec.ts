import { initialGameState, GameState } from './gamestate';
import Bishop from './bishop';
import { PieceGameLogic } from './piecegamelogic';
import { Piece, Box } from './piece';
import { expect } from 'chai';
import 'mocha';

describe('bishop test cases', () => {
  it('testBishopCannotGoThroughOwnPiece', () => testBishopCannotGoThroughOwnPiece());
  it('testBishopCannotGoThroughOwnPiece', () => testBishopCannotGoThroughOwnPiece());
  it('testBishopCanMoveWhenPathFree', () => testBishopCanMoveWhenPathFree());
  it('testBishopCanMoveWhenDestIsEnemy', () => testBishopCanMoveWhenDestIsEnemy());
  it('testBishopCannotMoveWhenDestIsOwnTeam', () => testBishopCannotMoveWhenDestIsOwnTeam());
  it('testBishopCannotGoStraightForwardWithPieceInFront', () => testBishopCannotGoStraightForwardWithPieceInFront());
  it('testBishopCannotGoStraightForwardWithClearPath', () => testBishopCannotGoStraightForwardWithClearPath());
});

const testBishopCannotGoThroughOwnPiece = () => {
  const gameState = initialGameState();
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  const Bishop = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testBishopCanMoveWhenPathFree = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0',' ','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  const Bishop = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(true);
};

const testBishopCanMoveWhenDestIsEnemy = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    [' ','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['p0',' ',' ',' ',' ',' ',' ',' '],
    ['P0',' ','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  const Bishop = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(true);
};

const testBishopCannotMoveWhenDestIsOwnTeam = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  const Bishop = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testBishopCannotGoStraightForwardWithPieceInFront = () => {
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
  const src = {r:7,c:2};
  const dst = {r:5,c:5};
  const Bishop = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testBishopCannotGoStraightForwardWithClearPath = () => {
  const gameState = initialGameState();
  gameState.board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0',' ',' ',' ','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const src = {r:7,c:2};
  const dst = {r:5,c:5};
  const Bishop = PieceGameLogic.getType(gameState.board[src.r][src.c]);
  const isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};