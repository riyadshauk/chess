import { Piece, emptyPiece } from './piece';
import { PieceHelper } from './piecehelper';
/**
 * @type {!Piece}
 */
let King = emptyPiece;
King.getPossibleMoves = (gameState, src, numMoves) => {
  const isPossibleToMoveTo = dst => PieceHelper.isValidSourceAndDest(gameState, src, dst) && (Math.abs(dst.c - src.c) == 1 || Math.abs(dst.r - src.r) == 1) ? PieceHelper.canGoAlongRowToDest(gameState, src, dst) || PieceHelper.canGoAlongColToDest(gameState, src, dst) || PieceHelper.canGoAlongDiagonalToDest(gameState, src, dst)
  /*|| PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst)*/ // fix this design bug..? Don't want circular dep anymore...
  : false;
  return isPossibleToMoveTo;
};
export { King };