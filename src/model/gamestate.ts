import { Box } from './piece';

/**
 * @typedef {{board: Array<Array<string>>, numRows: number, numCols: number, playerWhite: number, playerBlack: number, player: number}}
 */
export var GameState;

/**
 * @function
 * @returns {GameState}
 */
export function initialGameState() {
  return {
    board: [
      ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
      ['p0','p0','p0','p0','p0','p0','p0','p0'],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
      ['R0','H0','B0','Q0','K0','B0','H0','R0'] ], 
    numRows: 8, 
    numCols: 8, 
    playerWhite: 0, 
    playerBlack: 1, 
    player: 0
  };
}