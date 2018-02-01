import {Piece, emptyPiece} from './piece';
import {PieceHelper} from './piecehelper';

/**
 * @class Queen
 * @type {Piece}
 */
export default class Queen {
  constructor() {
    this.name = 'queen';
  }
  getPossibleMoves(gameState,src,numMoves) {
    const isPossibleToMoveTo = dst =>
      PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
      PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
    return isPossibleToMoveTo;
  }
}