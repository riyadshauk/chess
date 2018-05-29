import { Box, Piece, EmptyPiece, GameState, Board, StoreState } from '../types';

export default class Store {
  private readonly _state: StoreState;
  constructor() {
    this._state = new StoreState;
  }
  public get state() {
    return this._state;
  }
  public set state(state: StoreState) {
    this._state.gameState = state.gameState ? state.gameState : this._state.gameState;
    this._state.board = state.board ? state.board : this._state.board;
    this._state.selectedBoxes = state.selectedBoxes ? state.selectedBoxes : this._state.selectedBoxes;
    this._state.possibleDestBoxes = state.possibleDestBoxes ? state.possibleDestBoxes : this._state.possibleDestBoxes;
    this._state.prevMove = state.prevMove ? state.prevMove : this._state.prevMove;
    this._state.captures = state.captures ? state.captures : this._state.captures;
    this._state.selectedCaptures = state.selectedCaptures ? state.selectedCaptures : this._state.selectedCaptures;
  }
}