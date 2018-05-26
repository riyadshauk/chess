import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

/**
 * @class Queen
 * @type {Piece}
 */
export default class Queen implements Piece {
  public name: string;
  public color: string;
  public getPossibleMoves;
  constructor(color: string) {
    this.name = 'queen';
    this.color = color;
    this.getPossibleMoves = (gameState,src: Box,numMoves?: number) => {
      const isPossibleToMoveTo = dst =>
        PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
        PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
      return isPossibleToMoveTo;
    };
  }
}