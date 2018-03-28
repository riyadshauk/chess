export interface Box {
  r: number;
  c: number;
}

export interface Piece {
  getPossibleMoves: (gameState, src: Box, numMoves?: number) => (Box) => boolean;
}

export class EmptyPiece implements Piece {
  public name: string;
  constructor() {
    this.name = 'empty';
  }
  getPossibleMoves(gameState, src: Box, numMoves?: number) {
    const isPossibleToMoveTo = (dst: Box) => false;
    return isPossibleToMoveTo;
  }
}