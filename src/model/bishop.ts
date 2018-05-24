import { Piece, Box, EmptyPiece } from './piece';
import { PieceHelper } from './piecehelper';

export default class Bishop implements Piece {
  public name: string;
  public getPossibleMoves;
  constructor() {
    this.name = 'bishop';
    this.getPossibleMoves = function(gameState, src: Box, numMoves?: number) {
      const isPossibleToMoveTo = (dst: Box) => {
        return PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
        PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
      };
      return isPossibleToMoveTo;
    }
  }
}