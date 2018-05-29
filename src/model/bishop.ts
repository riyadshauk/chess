import { Box, Piece, GameState } from '../types';
import { PieceHelper } from './piecehelper';

export default class Bishop implements Piece {
  public name: string;
  public color: string;
  public getPossibleMoves: (gameState: GameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
  constructor(color: string) {
    this.name = 'bishop';
    this.color = color;
    this.getPossibleMoves = function(gameState, src: Box, numMoves?: number) {
      const isPossibleToMoveTo = (dst: Box) => {
        return PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
        PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
      };
      return isPossibleToMoveTo;
    }
  }
}