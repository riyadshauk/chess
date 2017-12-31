var Rook = {};
Rook.getPossibleMoves = (gameState,src,numMoves) => {
  const isPossibleToMoveTo = dst =>
    PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
    PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) : false;
  return isPossibleToMoveTo;
}
module.exports = Rook;
const PieceHelper = require('./piecehelper.js');
