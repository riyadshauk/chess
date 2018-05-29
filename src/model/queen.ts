import { Box, Piece, GameState } from '../types';
import { PieceHelper } from './piecehelper';

/**
 * @class Queen
 * @type {Piece}
 */
export default class Queen implements Piece {
  public name: string;
  public color: string;
  public getPossibleMoves: (gameState: GameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
  constructor(color: string) {
    this.name = 'queen';
    this.color = color;
    this.getPossibleMoves = (gameState: GameState, src: Box,numMoves?: number) => {
      const isPossibleToMoveTo = (dst: Box): boolean =>
        PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
        PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
      return isPossibleToMoveTo;
    };
  }
}