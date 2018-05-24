import {Piece, Box} from './piece';
import {PieceHelper} from './piecehelper';

export default class Rook implements Piece {
  public name: string;
  public getPossibleMoves;
  constructor() {
    this.name = 'rook';
    this.getPossibleMoves = (gameState,src: Box,numMoves?: number) => {
      const isPossibleToMoveTo = dst =>
        PieceHelper.isValidSourceAndDest(gameState,src,dst) ?
        PieceHelper.canGoAlongRowToDest(gameState,src,dst) || PieceHelper.canGoAlongColToDest(gameState,src,dst) : false;
      return isPossibleToMoveTo;
    };
  }
}