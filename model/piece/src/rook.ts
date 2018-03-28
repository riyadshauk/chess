import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class Rook implements Piece {
  public name: string;
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