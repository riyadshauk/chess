import Store from '../store/store';
import View from '../view/view';
import { Board, Box, Piece, EmptyPiece, StoreState, PLAYER_WHITE, PLAYER_BLACK } from '../types';
import { PieceGameLogic } from '../model/piecegamelogic';

/**
 * Note that the Controller is the only module which shall know about any and all of the Model, Store, and View.
 * The Controller shall simply relay user events from the View to the Model, taking the purely functional
 * output from the Model and storing it in the Store. The Controller then notifies the View of the updated
 * state (via this.store.state, no more, no less), and the View updates. The loop continues as such.
 * 
 * This is a simple paradigm once thought out. The Controller shall be as simple as possible, delegating
 * as much of the game logic as possible to the Model, and as much as the graphical appearance as possible
 * to the View, while storing the updates to the relevant state of the game (as needed by the View) in 
 * the Store (which contains virtually no logic, acting much like a simple NoSQL document).
 */

/**
 * Deserialize the HTML data into a JS object.
 * https://stackoverflow.com/questions/5660050/what-is-serialization-and-deserialization-conceptually
 * @param {Element} box The raw html box from the view
 * @returns {Box} the contents of the box as a structured JS object
 */
const deserializeBoxContents = (boxElem: Element): { box: Box, piece: Piece } => {
    let boxPos = Number(boxElem.getAttribute('data-pos'));
    const r = Math.floor(boxPos / 8);
    const c = boxPos % 8;
    const box: Box = { r, c };
    const piece = <Piece>JSON.parse(boxElem.getAttribute('piece'));
    return { box, piece };
}

const deserializeCapturedPiece = (pieceElem: Element): Piece => PieceGameLogic.getType(pieceElem.querySelector('div').getAttribute('class').replace('white', '').replace('black', ''));

export default class Controller {
    private store: Store;
    private view: View;
    private _selectedBox: { box: Box, piece: Piece };
    private _lastSelectedBox: { box: Box, piece: Piece };
    private _selectedCapturedPiece: Piece;
    private createAndShowInitialBoard() {
        const newState: StoreState = new StoreState;
        newState.board = PieceGameLogic.convertGSBoardToPieceBoard(newState.gameState);
        this.store.state = newState;
        this.showBoardAndBindBoxes();
    }
    public setStoreState(newState: StoreState): void {
      newState.board = PieceGameLogic.convertGSBoardToPieceBoard(newState.gameState);
      this.store.state = newState;
    }
    constructor() {
        this.store = new Store;
        this.view = new View;
        this._selectedBox = { box: { r: -1, c: -1 }, piece: new EmptyPiece };
        this._lastSelectedBox = { box: { r: -1, c: -1 }, piece: new EmptyPiece };
        this._selectedCapturedPiece = new EmptyPiece;
        this.createAndShowInitialBoard();
        // this.view.bindUndoMove(this.undoMove.bind(this));
        // this.view.bindRedoMove(this.redoMove.bind(this));
    }

    /**
     * Set the HTML board in View, bind this.selectBox to each box in View.
     * @param {Void}
     * @returns {Void}
     */
    showBoardAndBindBoxes(): void {
        this.view.showBoard(this.store.state);
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                let box = this.view.$board.children[0].children[r].children[c];
                this.view.bindSelectBox(box, this.selectBox.bind(this));
            }
        }
    }

    /**
     * Set the HTML captures in View, bind this.selectCapturedPiece to each captured piece in View.
     * @param {Void}
     * @returns {Void}
     */
    showAndBindCapturedPieces(): void {
        let captures = this.store.state.captures;
        this.view.showCaptures(this.store.state);
        let whiteIdx = 0;
        let blackIdx = 0;
        for (let i = 0; i < captures.length; i++) {
            if (captures[i].color && captures[i].color.indexOf('black') == 0) {
                let piece = this.view.$capturedblack.children[0].children[blackIdx++];
                if (piece != undefined) this.view.bindCapturedPiece(piece, i, this.selectCapturedPiece.bind(this));
            }
            else if (captures[i].color && captures[i].color.indexOf('white') == 0) {
                let piece = this.view.$capturedwhite.children[0].children[whiteIdx++];
                if (piece != undefined) this.view.bindCapturedPiece(piece, i, this.selectCapturedPiece.bind(this));
            }
        }
    }

    /**
     * @description Notifies PGL based on new state of this._selectedBox and this._lastSelectedBox.
     * @helper This is extracted functionality from Controller.selectBox.
     */
    moveXorGetPossibleMoves(): void {
      if (!(this._lastSelectedBox.piece instanceof EmptyPiece)) {
        const updatedMoveState = PieceGameLogic.makeLegalMove(this.store.state.gameState, this._lastSelectedBox.box, this._selectedBox.box, this.store.state.prevMove, this._selectedCapturedPiece);
        const newState = new StoreState(this.store.state);
        newState.gameState = updatedMoveState.gameState;
        const capturedPiece = updatedMoveState.capturedPiece;
        if (this.store.state.gameState !== newState.gameState) {
          newState.possibleDestBoxes = this.store.state.initializeFalseGrid(8);
          newState.prevMove = { src: this._lastSelectedBox.box, dst: this._selectedBox.box };
          newState.gameState.player = this.store.state.gameState.player === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
          if (updatedMoveState.wasPromotion) newState.gameState.player = newState.gameState.player === PLAYER_WHITE ? PLAYER_BLACK : PLAYER_WHITE;
          if (!(capturedPiece instanceof EmptyPiece)) {
            newState.captures.push(capturedPiece);
          }
        } else {
          const possibleMoves = PieceGameLogic.getPossibleMoves(this.store.state.gameState, this._selectedBox.box, this.store.state.prevMove);
          newState.possibleDestBoxes = this.store.state.initializeFalseGrid(8);
          possibleMoves.forEach((box: Box) => {
            newState.possibleDestBoxes[box.r][box.c] = true;
          });
        }
        this.setStoreState(newState);
      }
      this._selectedCapturedPiece = undefined;
    }

    /**
     * Update selectedPiece after seting lastSelectedPiece to current selectedPiece.
     * 
     * @param {!Element} box div of the selected box
     */
    selectBox(box: Element): void {
      this._lastSelectedBox = this._selectedBox;
      this._selectedBox = deserializeBoxContents(box);

      this.showAndBindCapturedPieces();
      this.showBoardAndBindBoxes();

      this.moveXorGetPossibleMoves();

      this.showAndBindCapturedPieces();
      this.showBoardAndBindBoxes();
    }

    /**
     * 
     * @param {Element} pieceElem
     * @param {number} i Index of captured piece.
     */
    selectCapturedPiece(pieceElem: Element, i: number): void {
        this._selectedCapturedPiece = this.store.state.captures[i];
        this.showAndBindCapturedPieces();
        this.showBoardAndBindBoxes();
    }

    /**
     * @todo Look into FEN, PGN, SAN and common implementations of keeping history
     */
    undoMove(): void {

    }

    redoMove(): void {

    }

    /**
     * @todo Consider FEN, PGN, SAN, etc for this.
     */
    loadBoard(): void {

    }
    saveBoard(): void {

    }
}