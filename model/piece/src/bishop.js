import {Piece, emptyPiece} from './piece';
import {PieceHelper} from './piecehelper';

export default class Bishop {
  constructor() {
    this.name = 'bishop';
  }
  getPossibleMoves(gameState,src,numMoves) {
    const isPossibleToMoveTo = function(dst) {
      return PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
      PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
    }
    return isPossibleToMoveTo;
  }
}