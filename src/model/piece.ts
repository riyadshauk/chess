export interface Box {
  r: number;
  c: number;
}

export interface Piece {
  name: string;
  getPossibleMoves: (gameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
}

export class EmptyPiece implements Piece {
  public name: string;
  public getPossibleMoves;
  constructor() {
    this.name = 'empty';
    this.getPossibleMoves = (gameState, src: Box, numMoves?: number) => {
      const isPossibleToMoveTo = (dst: Box) => false;
      return isPossibleToMoveTo;
    }
  }
}