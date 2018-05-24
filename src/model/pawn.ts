import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class Pawn implements Piece {
  public name: string;
  public getPossibleMoves;
  constructor() {
    this.name = 'pawn';
    this.getPossibleMoves = (gameState,src: Box,numMoves?: number) => {
      if (numMoves === undefined) numMoves = PieceHelper.getNumMoves(gameState,src);
      const forwardDirectionOfCurrentPlayer = () => gameState.player == gameState.playerWhite ? -1 : 1;
      /**
       * @param {!Box} dst 
       * @yields {boolean} Returns a (curried) function that returns a boolean (when applied).
       */
      const isPossibleToMoveTo = dst => {
        if (!PieceHelper.isValidSourceAndDest(gameState,src,dst)) return false;
        const dir = forwardDirectionOfCurrentPlayer();
        const pawnCanMove1Forward = PieceHelper.isEmpty(gameState,dst) && src.c == dst.c && dst.r == src.r + dir;
        const inBetweenSquare = {
          r: src.r + dir,
          c: dst.c
        };
        const pawnCanMove2Forward = numMoves == 0 && PieceHelper.isEmpty(gameState,dst) && PieceHelper.isEmpty(gameState,inBetweenSquare) && src.c == dst.c && dst.r == src.r +2*dir;
        const pawnCanAttack = !PieceHelper.isPieceOfCurrentPlayer(gameState,dst) && !PieceHelper.isEmpty(gameState,dst) && dst.r == src.r + dir && (dst.c == src.c + 1 || dst.c == src.c - 1);
        return pawnCanMove1Forward || pawnCanMove2Forward || pawnCanAttack;
      }
      return isPossibleToMoveTo;
    };
  }
}