import { Piece, emptyPiece } from './piece';
import { PieceHelper } from './piecehelper';
/**
 * @type {Piece}
 */
var Bishop = emptyPiece;
Bishop.getPossibleMoves = function (gameState, src, numMoves) {
  const isPossibleToMoveTo = function (dst) {
    return PieceHelper.isValidSourceAndDest(gameState, src, dst) ? PieceHelper.canGoAlongDiagonalToDest(gameState, src, dst) : false;
  };
  return isPossibleToMoveTo;
};
export { Bishop };