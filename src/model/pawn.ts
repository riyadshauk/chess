import { Box, Piece, GameState, PLAYER_WHITE } from '../types';
import { PieceHelper } from './piecehelper';

export default class Pawn implements Piece {
  public name: string;
  public color: string;
  public getPossibleMoves: (gameState: GameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
  constructor(color: string) {
    this.name = 'pawn';
    this.color = color;
    this.getPossibleMoves = (gameState: GameState, src: Box,numMoves?: number): (dst: Box) => boolean => {
      if (numMoves === undefined) numMoves = PieceHelper.getNumMoves(gameState,src);
      const forwardDirectionOfCurrentPlayer = () => gameState.player == PLAYER_WHITE ? -1 : 1;
      /**
       * @param {!Box} dst 
       * @yields {boolean} Returns a (curried) function that returns a boolean (when applied).
       */
      const isPossibleToMoveTo = (dst: Box): boolean => {
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