import { Box, Piece, EmptyPiece, GameState } from '../types';
import King from './king';
import { PieceGameLogic } from './piecegamelogic';
import { expect } from 'chai';
import 'mocha';

describe('king test cases', () => {
  it('testKingCannotGoThroughOwnPiece', () => testKingCannotGoThroughOwnPiece());
  it('testKingCanMoveDiagonalWhenPathNotObstructed', () => testKingCanMoveDiagonalWhenPathNotObstructed());
  it('testKingCanMoveStraightWhenPathNotObstructed', () => testKingCanMoveStraightWhenPathNotObstructed());
});

const testKingCannotGoThroughOwnPiece = () => {
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
  const src = {r:7,c:4};
  const dst = {r:6,c:4};
  const King = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = King.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};

const testKingCanMoveDiagonalWhenPathNotObstructed = () => {
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
  const src = {r:7,c:4};
  const dst = {r:6,c:3};
  const King = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = King.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};

const testKingCanMoveStraightWhenPathNotObstructed = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0',' ','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState = new GameState(board);
  const src = {r:7,c:4};
  const dst = {r:6,c:4};
  const King = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = King.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};