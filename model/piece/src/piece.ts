// /**
//  * @typedef {!{getPossibleMoves: Function}}
//  */
// export var Piece;

// /**
//  * @type {!Piece}
//  */
// export var emptyPiece = {getPossibleMoves: (dst)=>false};

// /**
//  * @typedef {!{isEmpty: Function, isPieceOfGivenPlayer: Function, bothPiecesBelongToSamePlayer: Function, isPieceOfCurrentPlayer: Function, isBoxOnBoard: Function, isValidSourceAndDest: Function, canGoAlongRowToDest: Function, canGoAlongColToDest: Function, canGoAlongLineToDest: Function, canGoAlongDiagonalToDest: Function}}
//  */
// export var PieceHelper;

// /**
//  * @type {!PieceHelper}
//  */
// export var emptyPieceHelper = {isEmpty: ()=>null, isPieceOfGivenPlayer: ()=>null, bothPiecesBelongToSamePlayer: ()=>null, isPieceOfCurrentPlayer: ()=>null, isBoxOnBoard: ()=>null, isValidSourceAndDest: ()=>null, canGoAlongRowToDest: ()=>null, canGoAlongColToDest: ()=>null, canGoAlongLineToDest: ()=>null, canGoAlongDiagonalToDest: ()=>null}

export interface Box {
  r: number;
  c: number;
}

// interface emptyPiece {
//   getPossibleMoves: ((dst) => false) | ((gameState, src: Box, numMoves: number) => (Box) => boolean);
// };

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