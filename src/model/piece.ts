import { GameState } from './gamestate';

export interface Box {
  r: number;
  c: number;
}

export interface Piece {
  name: string;
  color: string;
  getPossibleMoves: (gameState: GameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
}

export class EmptyPiece implements Piece {
  public name: string;
  public color: string;
  public getPossibleMoves;
  constructor(color = 'blank') {
    this.name = 'empty';
    this.color = color;
    this.getPossibleMoves = (gameState: GameState, src: Box, numMoves?: number) => {
      const isPossibleToMoveTo = (dst: Box) => false;
      return isPossibleToMoveTo;
    }
  }
}