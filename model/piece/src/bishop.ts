import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class Bishop implements Piece {
  public name: string;
  constructor() {
    this.name = 'bishop';
  }
  getPossibleMoves(gameState, src: Box, numMoves: number) {
    const isPossibleToMoveTo = (dst: Box) => {
      return PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
      PieceHelper.canGoAlongDiagonalToDest(gameState,src,dst) : false;
    };
    return isPossibleToMoveTo;
  }
}