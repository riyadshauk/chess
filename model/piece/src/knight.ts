import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class Knight implements Piece {
  public name: string;
  constructor() {
    this.name = 'knight';
  }
  getPossibleMoves(gameState,src,numMoves) {
    const isPossibleToMoveTo = dst =>
      PieceHelper.isValidSourceAndDest(gameState,src,dst) &&
      ((Math.abs(src.r-dst.r) == 1 && Math.abs(src.c-dst.c) == 2) || (Math.abs(src.c-dst.c) == 1 && Math.abs(src.r-dst.r) == 2)) ?
      true : false;
    return isPossibleToMoveTo;
  }
}