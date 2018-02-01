import { Piece, emptyPiece } from './piece';
import { PieceHelper } from './piecehelper';
/**
 * @type {!Piece}
 */
let Queen = emptyPiece;
Queen.getPossibleMoves = (gameState, src, numMoves) => {
  const isPossibleToMoveTo = dst => PieceHelper.isValidSourceAndDest(gameState, src, dst) ? PieceHelper.canGoAlongRowToDest(gameState, src, dst) || PieceHelper.canGoAlongColToDest(gameState, src, dst) || PieceHelper.canGoAlongDiagonalToDest(gameState, src, dst) : false;
  return isPossibleToMoveTo;
};
export { Queen };