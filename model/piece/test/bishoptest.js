import initialGameState, {GameState} from '../../gamestate';
// import {Bishop} from '../src/bishop';

// const GameState = require('../../gamestate_es5.js').GameState;
// const initialGameState = require('../../gamestate_es5.js').initialGameState;
// const Bishop = require('../src/bishop.js');
const assert = require('assert');

function testBishopCannotGoThroughOwnPiece() {
  let gameState = initialGameState();
  const src = {r:7,c:2};
  const dst = {r:5,c:0};
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testBishopCanMoveWhenPathFree() {
  let gameState = initialGameState();
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
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testBishopCanMoveWhenDestIsEnemy() {
  let gameState = initialGameState;
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
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,true);
}

function testBishopCannotMoveWhenDestIsOwnTeam() {
  let gameState = initialGameState();
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
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testBishopCannotGoStraightForwardWithPieceInFront() {
  let gameState = initialGameState();
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
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

function testBishopCannotGoStraightForwardWithClearPath() {
  let gameState = initialGameState();
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
  let isPossibleToMoveTo = Bishop.getPossibleMoves(gameState,src,0);
  let possible = isPossibleToMoveTo(dst);
  assert.equal(possible,false);
}

testBishopCannotGoThroughOwnPiece();
testBishopCanMoveWhenPathFree();
testBishopCanMoveWhenDestIsEnemy();
testBishopCannotMoveWhenDestIsOwnTeam();
testBishopCannotGoStraightForwardWithPieceInFront();
testBishopCannotGoStraightForwardWithClearPath();
