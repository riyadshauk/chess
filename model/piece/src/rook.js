import {Piece, emptyPiece} from './piece';
import {PieceHelper} from './piecehelper';

export default class Rook {
  constructor() {
    this.name = 'rook';
  }
  getPossibleMoves(gameState,src,numMoves) {
    const isPossibleToMoveTo = dst =>
      PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
      PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) : false;
    return isPossibleToMoveTo;
  }
}