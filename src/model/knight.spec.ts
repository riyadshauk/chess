import { Box, Piece, EmptyPiece, GameState } from '../types';
import Knight from './knight';
import { PieceGameLogic } from './piecegamelogic';
import { expect } from 'chai';
import 'mocha';

describe('knight test cases', () => {
  it('testKnightCanMoveToValidPiece', () => testKnightCanMoveToValidPiece())
  it('testKnightCannotMoveToInvalidBoxOnOwnPiece', () => testKnightCannotMoveToInvalidBoxOnOwnPiece())
  it('testKnightCannotMoveToInvalidEmptyBox', () => testKnightCannotMoveToInvalidEmptyBox())
  it('testKnightCannotFriendlyFireToValieBox', () => testKnightCannotFriendlyFireToValieBox())
});

const testKnightCanMoveToValidPiece = () => {
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
  const src = {r:7,c:1};
  const dst = {r:5,c:2};
  const Knight = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Knight.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(true);
};
const testKnightCannotMoveToInvalidBoxOnOwnPiece = () => {
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
  const src = {r:7,c:1};
  const dst = {r:6,c:1};
  const Knight = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Knight.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};
const testKnightCannotMoveToInvalidEmptyBox = () => {
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
  const src = {r:7,c:1};
  const dst = {r:4,c:1};
  const Knight = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Knight.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};
const testKnightCannotFriendlyFireToValieBox = () => {
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
  const src = {r:7,c:1};
  const dst = {r:6,c:3};
  const Knight = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibconstoMoveTo = Knight.getPossibleMoves(gameState,src,0);
  const possible = isPossibconstoMoveTo(dst);
  expect(possible).to.equal(false);
};