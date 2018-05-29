import { Box, Piece, EmptyPiece, GameState } from '../types';
import Queen from './queen';
import { PieceGameLogic } from './piecegamelogic';
import { expect } from 'chai';
import 'mocha';

describe('queen test cases', () => {
  it('testQueenCannotGoThroughOwnPiece', () => testQueenCannotGoThroughOwnPiece());
  it('testQueenCanMoveDiagonalWhenPathNotObstructed', () => testQueenCanMoveDiagonalWhenPathNotObstructed());
  it('testQueenCanMoveAlongColWhenPathNotObstructed', () => testQueenCanMoveAlongColWhenPathNotObstructed());
  it('testQueenCanMoveAlongRowWhenPathNotObstructed', () => testQueenCanMoveAlongRowWhenPathNotObstructed());
});

const testQueenCannotGoThroughOwnPiece= () => {
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
  const src = {r:7,c:3};
  const dst = {r:4,c:0};
  const Queen = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Queen.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};

const testQueenCanMoveDiagonalWhenPathNotObstructed= () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0',' ','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:3};
  const dst = {r:4,c:0};
  const Queen = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Queen.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};

const testQueenCanMoveAlongColWhenPathNotObstructed= () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0',' ','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:3};
  const dst = {r:3,c:3};
  const Queen = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Queen.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};

const testQueenCanMoveAlongRowWhenPathNotObstructed= () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ',' ','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:3};
  const dst = {r:7,c:1};
  const Queen = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Queen.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};