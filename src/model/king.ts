import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class King implements Piece {
  public name: string;
  public getPossibleMoves;
  public getPossibleSpecialMoves: Function;
  constructor(specialMoves?) {
    this.name = 'king';
    this.getPossibleSpecialMoves = specialMoves;
    this.getPossibleMoves = (gameState,src: Box,numMoves?: number) => {
      const isPossibleToMoveTo = dst => {
        if (PieceHelper.isValidSourceAndDest(gameState,src,dst) && (Math.abs(dst.c-src.c)==1 || Math.abs(dst.r-src.r)==1))
          return PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst)
        else return false;
      }
      return isPossibleToMoveTo;
    };
  }
}