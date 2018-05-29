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
  public getPossibleMoves: (gameState: GameState, src: Box, numMoves?: number) => (dst: Box) => boolean;
  constructor(color = 'blank') {
    this.name = 'empty';
    this.color = color;
    this.getPossibleMoves = (gameState: GameState, src: Box, numMoves?: number) => {
      const isPossibleToMoveTo = (dst: Box) => false;
      return isPossibleToMoveTo;
    }
  }
}

/**
 * @typedef {{board: Array<Array<string>>, numRows: number, numCols: number, playerWhite: number, playerBlack: number, player: number}}
 */
// export interface GameState {
//   board: Array<Array<string>>, player: Player, getEncoding: ((box: Box) => string);
// };

export class Board {
  private _board: Array<Array<string>>;
  /**
   * @description Creates a copy of a board (which can be safely mutated in FP paradigm).
   */
  public get board(): Array<Array<string>> {
    const boardCopy = Object.assign([], this._board);
    return boardCopy;
  }
  public get rankCount(): number {
    return this._board.length;
  }
  public get fileCount(): number {
    return this._board[0].length > 0 ? this._board[0].length : 1;
  }
  // protected set board(board: Array<Array<string>>) {
  //   this._board = board;
  // }
  public readonly getEncoding: (box: Box) => string;
  public readonly setEncoding: (box: Box, enc: string) => void;
  constructor(board?: Array<Array<string>>|Board ) {
    if (board instanceof Board) this._board = board._board;
    else if (board) this._board = board;
    else this._board = [
      ['r0','h0','b0','q0','k0','b0','h0','r0'], // lower case: black pieces
      ['p0','p0','p0','p0','p0','p0','p0','p0'],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      [' ',' ',' ',' ',' ',' ',' ',' '],
      ['P0','P0','P0','P0','P0','P0','P0','P0'], // upper case: white pieces
      ['R0','H0','B0','Q0','K0','B0','H0','R0'] ];
    this.getEncoding = (box: Box): string => {
      return this._board[box.r][box.c];
    }
    this.setEncoding = (box: Box, enc: string): void => {
      if (box.r > -1 && box.r < this._board.length && box.c > -1 && box.c < this._board[0].length) {
        this._board[box.r][box.c] = enc;
      } else if (process.env.NODE_ENV === 'TEST') {
        console.warn('this._board.length', this._board.length);
        console.warn('this._board[0].length', this._board[0].length);
        console.warn(`Attempting to incorrectly set encoding (${enc}) to board at box ({r: ${box.r}, c: ${box.c}}). For board the following board ${JSON.stringify(this._board)}. Please fix this bug.`);
      }
    };
  }
};

/**
 * @function
 * @returns {GameState}
 */
export class GameState {
  private _board: Board;
  private _player: Player;
  // private setEncoding; // hide 
  public readonly getEncoding: (box: Box) => string;
  get player(): Player {
    return this._player;
  }
  set player(newPlayer: Player) {
    if (process.env.NODE_ENV === 'TEST') {
      console.warn(`player is being changed from Player ${this._player} to Player ${newPlayer}.`);
    }
    this._player = newPlayer;
  }
  /**
   * @description Creates a copy of a board (which can be safely mutated in FP paradigm).
   */
  get board(): Array<Array<string>> {
    return this._board.board;
  }
  /**
   * @description Number of 'rows' on chessboard.
   */
  public readonly rankCount: number;
  /**
   * @description Number of 'columns' on chessboard.
   */
  public readonly fileCount: number;
  constructor(board?: Board|Array<Array<string>>) {
    this._board = new Board(board);
    this.getEncoding = (box: Box): string => {
      return this._board.getEncoding(box);
    }
    this._player = PLAYER_WHITE;
    this.rankCount = this._board.rankCount;
    this.fileCount = this._board.fileCount;
  }
}

export class StoreState {
  public gameState: GameState;
  public selectedBoxes: Array<Array<boolean>>;
  public possibleDestBoxes: Array<Array<boolean>>;
  public prevMove: { src: Box, dst: Box };
  public captures: Array<Piece>;
  public selectedCaptures: Array<boolean>;
  public board: Array<Array<Piece>>;
  private array2d(d: number, v: any): Array<Array<any>> {
    const arr = [];
    for (let i = 0; i < d; i++) {
      arr.push([]);
      for (let j = 0; j < d; j++) {
        arr[i].push(v);
      }
    }
    return arr;
  }
  public initializeFalseGrid(d: number): Array<Array<boolean>> {
    return this.array2d(d, false);
  }
  constructor(state?: StoreState) {
    this.gameState = state ? state.gameState : new GameState;
    this.selectedBoxes = state ? state.selectedBoxes : this.initializeFalseGrid(8);
    this.possibleDestBoxes = state ? state.possibleDestBoxes : this.initializeFalseGrid(8);
    this.prevMove = state ? state.prevMove : { src: { r: -1, c: -1 }, dst: { r: -1, c: -1 }};
    this.captures = state ? state.captures : [];
    this.selectedCaptures = state ? state.selectedCaptures : [];
    this.board = state ? state.board : [];
  }
}

/**
 * @typedef {!number}
 */
export type Player = number;

/**
 * @type {!Player}
 */
export const PLAYER_WHITE: Player = 0;

/**
 * @type {!Player}
 */
export const PLAYER_BLACK: Player = 1;

/**
 * @typedef {!Array<Box>}
 */
// export type Board = Array<Box>;