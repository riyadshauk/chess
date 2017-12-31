var Pawn = {};
Pawn.getPossibleMoves = (gameState,src,numMoves) => {
  const forwardDirectionOfCurrentPlayer = () => gameState.player == gameState.playerWhite ? -1 : 1;
  const isPossibleToMoveTo = dst => {
    if (!PieceHelper.isValidSourceAndDest(gameState,src,dst)) return false;
    const dir = forwardDirectionOfCurrentPlayer();
    const pawnCanMove1Forward = PieceHelper.isEmpty(gameState,dst) && src.c == dst.c && dst.r == src.r + dir;
    const pawnCanMove2Forward = numMoves == 0 && PieceHelper.isEmpty(gameState,dst) && src.c == dst.c && dst.r == src.r +2*dir;
    const pawnCanAttack = !PieceHelper.isPieceOfCurrentPlayer(gameState,dst) && !PieceHelper.isEmpty(gameState,dst) && dst.r == src.r + dir && (dst.c == src.c + 1 || dst.c == src.c - 1);
    return pawnCanMove1Forward || pawnCanMove2Forward || pawnCanAttack;
  }
  return isPossibleToMoveTo;
}
module.exports = Pawn;
const PieceHelper = require('./piecehelper.js');
