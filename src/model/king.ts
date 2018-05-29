import { Box, Piece, GameState } from '../types';
import { PieceHelper } from './piecehelper';

export default class King implements Piece {
  public name: string;
  public color: string;
  public getPossibleMoves: (gameState: GameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
  public getPossibleSpecialMoves: Function;
  constructor(color: string, specialMoves?: Function) {
    this.name = 'king';
    this.color = color;
    this.getPossibleSpecialMoves = specialMoves;
    this.getPossibleMoves = (gameState: GameState, src: Box,numMoves?: number) => {
      const isPossibleToMoveTo = (dst: Box): boolean => {
        if (PieceHelper.isValidSourceAndDest(gameState,src,dst) && (Math.abs(dst.c-src.c)==1 || Math.abs(dst.r-src.r)==1))
          return PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst)
        else return false;
      }
      return isPossibleToMoveTo;
    };
  }
}