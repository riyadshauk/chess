var Bishop = {};
Bishop.getPossibleMoves = (gameState,src,numMoves) => {
  const isPossibleToMoveTo = dst =>
    PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
    PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
  return isPossibleToMoveTo;
}
module.exports = Bishop;
const PieceHelper = require('./piecehelper.js');
