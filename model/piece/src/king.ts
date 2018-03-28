import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class King implements Piece {
  public name: string;
  public getPossibleSpecialMoves?: Function; // @todo implement this in model (extract from front-end logic)
  constructor(specialMoves?) {
    this.name = 'king';
    this.getPossibleSpecialMoves = specialMoves;
  }
  getPossibleMoves(gameState,src,numMoves) {
    const isPossibleToMoveTo = dst => {
      if (PieceHelper.isValidSourceAndDest(gameState,src,dst) && (Math.abs(dst.c-src.c)==1 || Math.abs(dst.r-src.r)==1))
        return PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst)
      else return this.getPossibleSpecialMoves(gameState,src,dst);
    }
    return isPossibleToMoveTo;
  }
}