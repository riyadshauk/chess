import { Box, Piece, EmptyPiece, GameState, PLAYER_BLACK, PLAYER_WHITE } from '../types';
import Pawn from './pawn';
import { PieceGameLogic } from './piecegamelogic';
import { expect } from 'chai';
import 'mocha';

describe('pawn test cases', () => {
  it('testWhitePawnCanMove1ForwardWhenNumMovesIsZero', () => testWhitePawnCanMove1ForwardWhenNumMovesIsZero());
  it('testWhitePawnCanMove2ForwardWhenNumMovesIsZero', () => testWhitePawnCanMove2ForwardWhenNumMovesIsZero());
  it('testWhitePawnCannotMove2ForwardWhenNumMovesIsNotZero', () => testWhitePawnCannotMove2ForwardWhenNumMovesIsNotZero());
  it('testWhitePawnCannotMove3Forward', () => testWhitePawnCannotMove3Forward());
  it('testWhitePawnCannotGoRight1', () => testWhitePawnCannotGoRight1());
  it('testWhitePawnCannotGoDiagonalWithNoAttack', () => testWhitePawnCannotGoDiagonalWithNoAttack());
  it('testWhitePawnCanAttack', () => testWhitePawnCanAttack());
  it('testBlackPawnCannotGoBack1', () => testBlackPawnCannotGoBack1());
  it('testBlackPawnCanGoForward1', () => testBlackPawnCanGoForward1());
  it('testBlackPawnCannotGoHorizontal', () => testBlackPawnCannotGoHorizontal());
  it('testNoFriendlyFire', () => testNoFriendlyFire());
  it('testNoVeryStrangeFriendlyFire', () => testNoVeryStrangeFriendlyFire());
});

const testWhitePawnCanMove1ForwardWhenNumMovesIsZero = () => {
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
  const src = {r:6,c:0};
  const dst = {r:5,c:0};
  const Pawn = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(true);
};

const testWhitePawnCanMove2ForwardWhenNumMovesIsZero = () => {
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
  const src = {r:6,c:0};
  const dst = {r:4,c:0};
  const Pawn = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(true);
};

const testWhitePawnCannotMove2ForwardWhenNumMovesIsNotZero = () => {
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
  const src = {r:6,c:0};
  const dst = {r:4,c:0};
  const Pawn = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState,src,1);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testWhitePawnCannotMove3Forward = () => {
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
  const src = {r:6,c:0};
  const dst = {r:3,c:0};
  const Pawn = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testWhitePawnCannotGoRight1 = () => {
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
  const src = {r:6,c:0};
  const dst = {r:6,c:1};
  const Pawn = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testWhitePawnCannotGoDiagonalWithNoAttack = () => {
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
  const src = {r:6 ,c:0};
  const dst = {r:5,c:1};
  const Pawn = PieceGameLogic.getType(gameState.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testWhitePawnCanAttack = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState2 = new GameState(board);
  gameState2 .player = PLAYER_WHITE;
  const src = {r:6,c:0};
  const dst = {r:5,c:1};
  const Pawn = PieceGameLogic.getType(gameState2.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(true);
};

const testBlackPawnCannotGoBack1 = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState2 = new GameState(board);
  gameState2.player = PLAYER_BLACK;
  const src = {r:5,c:1};
  const dst = {r:4,c:1};
  const Pawn = PieceGameLogic.getType(gameState2.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2,src,1);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testBlackPawnCanGoForward1 = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState2 = new GameState(board);
  gameState2.player = PLAYER_BLACK;
  const src = {r:4,c:1};
  const dst = {r:5,c:1};
  const Pawn = PieceGameLogic.getType(gameState2.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2,src,1);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(true);
};

const testBlackPawnCannotGoHorizontal = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0',' ','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ','p0',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
  const gameState2 = new GameState(board);
  gameState2.player = PLAYER_BLACK;
  const src = {r:4,c:1};
  const dst = {r:4,c:2};
  const Pawn = PieceGameLogic.getType(gameState2.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2,src,1);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testNoFriendlyFire = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','H0',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ','B0','Q0','K0','B0','H0','R0'] ];
  const gameState2 = new GameState(board);
  gameState2.player = PLAYER_BLACK;
  const src = {r:5,c:1};
  const dst = {r:4,c:2};
  const Pawn = PieceGameLogic.getType(gameState2.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};

const testNoVeryStrangeFriendlyFire = () => {
  const board = [
    ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
    ['p0','p0','p0','p0','p0','p0','p0','p0'],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ',' ',' ',' ',' ',' ',' '],
    [' ',' ','H0',' ',' ',' ',' ',' '],
    ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
    ['R0',' ','B0','Q0','K0','B0','H0','R0'] ];
  const gameState2 = new GameState(board);
  gameState2.player = PLAYER_BLACK;
  const src = {r:5,c:2};
  const dst = {r:4,c:2};
  const Pawn = PieceGameLogic.getType(gameState2.getEncoding(src));
  const isPossibleToMoveTo = Pawn.getPossibleMoves(gameState2,src,0);
  const possible = isPossibleToMoveTo(dst);
  expect(possible).to.equal(false);
};