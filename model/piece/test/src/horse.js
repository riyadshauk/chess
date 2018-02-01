import { Piece, emptyPiece } from './piece';
import { PieceHelper } from './piecehelper';
/**
 * @description Horse AKA Knight (I named it as Horse because King starts with the letter 'K').
 * @type {!Piece}
 */
let Horse = emptyPiece;
Horse.getPossibleMoves = (gameState, src, numMoves) => {
  const isPossibleToMoveTo = dst => PieceHelper.isValidSourceAndDest(gameState, src, dst) && (Math.abs(src.r - dst.r) == 1 && Math.abs(src.c - dst.c) == 2 || Math.abs(src.c - dst.c) == 1 && Math.abs(src.r - dst.r) == 2) ? true : false;
  return isPossibleToMoveTo;
};
export { Horse };