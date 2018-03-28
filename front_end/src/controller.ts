import Store from './store';
import View from './view';
import {Board, Box, emptyBox, Piece, initializePiece, Location} from './box';

/**
 * Deserialize the HTML data into a JS object.
 * https://stackoverflow.com/questions/5660050/what-is-serialization-and-deserialization-conceptually
 * @param {Element} box The raw html box from the view
 * @returns {Box} the contents of the box as a structured JS object
 */
const deserializeBoxContents = (box: Element): Box => {
    let ret = emptyBox(Number(box.getAttribute('data-pos')));
    if (box.querySelector('div')) {
        ret.piece = initializePiece(box.querySelector('div').getAttribute('class'));
    }
    return ret;
}

const deserializeCapturedPiece = (pieceElem) => initializePiece(pieceElem.firstChild.getAttribute('class'));

/**
 * @param {Box} box
 * @returns {Location} location of box on board
 */
const extractLocationFromBox = (box: Box): Location => {
    return {r: box.r, c: box.c}
}

export default class Controller {
    private store: Store;
    private view: View;
    private _selectedBox: Box;
    private _lastSelectedBox: Box;
    private _selectedCapturedPiece: Piece;
    /**
     * @param {!Store} store A store instance
     * @param {!View} view a View instance
     */
    constructor(store: Store, view: View) {
        /**
         * @type {!Store}
         */
        this.store = store;
        /**
         * @type {!View}
         */
        this.view = view;
        /**
         * @type {!Box}
         */
        this._selectedBox = emptyBox(-1);
        /**
         * @type {!Box}
         */
        this._lastSelectedBox = emptyBox(-1);
        /**
         * @type {!Piece}
         */
        this._selectedCapturedPiece = initializePiece(null);
        this.view.bindUndoMove(this.undoMove.bind(this));
        this.view.bindRedoMove(this.redoMove.bind(this));
    }

    /**
     * Set the HTML board in View, bind this.selectBox to each box in View.
     * @param {Void}
     * @returns {Void}
     */
    showBoardAndBindBoxes() {
        let board = this.store.getLocalStorage().liveBoard;
        this.view.showBoard(board);
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                let box = this.view.get$board().children[0].children[r].children[c];
                this.view.bindSelectBox(box, this.selectBox.bind(this));
            }
        }
    }

    /**
     * Set the HTML captures in View, bind this.selectCapturedPiece to each captured piece in View.
     * @param {Void}
     * @returns {Void}
     */
    showAndBindCapturedPieces() {
        let captures = this.store.getLocalStorage().liveCaptures;
        this.view.showCaptures(captures);
        let whiteIdx = 0;
        let blackIdx = 0;
        for (let i = 0; i < captures.length; i++) {
            if (captures[i].title && captures[i].title.indexOf('black') == 0) {
                let piece = this.view.get$capturedblack().children[0].children[blackIdx++];
                if (piece != undefined) this.view.bindCapturedPiece(piece, i, this.selectCapturedPiece.bind(this));
            }
            else if (captures[i].title && captures[i].title.indexOf('white') == 0) {
                let piece = this.view.get$capturedwhite().children[0].children[whiteIdx++];
                if (piece != undefined) this.view.bindCapturedPiece(piece, i, this.selectCapturedPiece.bind(this));
            }
        }
    }

    /**
     * Update selectedPiece after seting lastSelectedPiece to current selectedPiece.
     * 
     * @param {!Element} box div of the selected box
     */
    selectBox(box: Element) {
        this._lastSelectedBox = this._selectedBox;
        this._selectedBox = deserializeBoxContents(box);
        this.store.selectBox(this._selectedBox.pos);
        if (this._lastSelectedBox.pos == this._selectedBox.pos) {
            return;
        }
        let locationIfCanMove = undefined;
        if (this._lastSelectedBox.piece != null) locationIfCanMove = this.store.locationIfCanMove(extractLocationFromBox(this._lastSelectedBox), extractLocationFromBox(this._selectedBox));
        if (this._lastSelectedBox.piece != null && locationIfCanMove != false) {
            this.store.movePiece(extractLocationFromBox(this._lastSelectedBox), extractLocationFromBox(this._selectedBox));
            this.store.unselectBox(this._lastSelectedBox.pos);
            this.store.updatePossibleMoves(null);
            this._lastSelectedBox = emptyBox(-1);
            if (this.store.canPromote({r: this._selectedBox.r, c: this._selectedBox.c})) {
                alert('Promotion possible: Select the promotable pawn, then any piece of the same color as the promotable pawn to complete the promotion.');
            }
            this.store.unselectBox(this._selectedBox.pos);
            this._selectedBox = emptyBox(-1);
        }
        else if ((this._lastSelectedBox.piece != null && this._lastSelectedBox.piece.title != null
                && this._selectedBox.piece != null && this._selectedBox.piece.title != null
                && (this.store.promoteIfPossible({r: this._lastSelectedBox.r, c: this._lastSelectedBox.c}, {r: this._selectedBox.r, c: this._selectedBox.c})) 
                    || ((this._selectedCapturedPiece != null && this._selectedCapturedPiece.title != null
                        && this._lastSelectedBox.piece != null && this._lastSelectedBox.piece.title != null
                        && this.store.promoteIfPossible({r: this._lastSelectedBox.r, c: this._lastSelectedBox.c}, undefined, this._selectedCapturedPiece)))
                )) {
                    if (this._selectedBox.pos != -1) this.store.unselectBox(this._selectedBox.pos);
                    if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._lastSelectedBox.pos);
                    this.store.updatePossibleMoves(null);
                    this._lastSelectedBox = emptyBox(-1);
                    this._selectedBox = emptyBox(-1);
        }
        else if (this._selectedBox.piece != null) {
            this.store.updatePossibleMoves(null);
            const possibleMoves = this.store.getPossibleMoves(extractLocationFromBox(this._selectedBox));
            this.store.updatePossibleMoves(possibleMoves);
            if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._lastSelectedBox.pos);
            this._lastSelectedBox = emptyBox(-1);
        } else {
            this.store.updatePossibleMoves(null);
            if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._lastSelectedBox.pos);
            this._lastSelectedBox = emptyBox(-1);
            if (this.store.canPromote({r: this._selectedBox.r, c: this._selectedBox.c})) {
                // alert('Promotion possible: Select the promotable pawn, then any piece of the same color as the promotable pawn to complete the promotion.');
            }
            if (this._selectedBox.pos != -1) this.store.unselectBox(this._selectedBox.pos);
            this._selectedBox = emptyBox(-1);
        }
        if (this._selectedCapturedPiece.capturedIdx != -1) {
            this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx);
        }
        this.showAndBindCapturedPieces();
        this.showBoardAndBindBoxes();
    }

    /**
     * 
     * @param {Element} pieceElem
     * @param {number} i Index of captured piece.
     */
    selectCapturedPiece(pieceElem: Element, i: number) {
        if (this._selectedCapturedPiece.capturedIdx != -1) {
            this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx);
        }
        if (this._lastSelectedBox.piece != null || this._selectedBox.piece != null) {
            this.store.updatePossibleMoves(null);
            if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._lastSelectedBox.pos);
            if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._selectedBox.pos);
            this._lastSelectedBox = emptyBox(-1);
            this._lastSelectedBox = emptyBox(-1);
        }
        this._selectedCapturedPiece = deserializeCapturedPiece(pieceElem);
        this._selectedCapturedPiece.capturedIdx = i;
        this.store.selectCapturedPiece(i);
        this.showAndBindCapturedPieces();
        this.showBoardAndBindBoxes();
    }

    undoMove() {
        const liveStore = this.store.getLocalStorage();
        if (liveStore.liveHistory.length == 0) return;
        this.store.updatePossibleMoves(null);
        if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._lastSelectedBox.pos);
        if (this._selectedBox.pos != -1) this.store.unselectBox(this._selectedBox.pos);
        if (this._selectedCapturedPiece.capturedIdx != -1) this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx);
        this._selectedBox = emptyBox(-1);
        this._lastSelectedBox = emptyBox(-1);
        this._selectedCapturedPiece = initializePiece(null);
        this.store.undoMove();
        this.showAndBindCapturedPieces();
        this.showBoardAndBindBoxes();
    }

    redoMove() {
        const liveStore = this.store.getLocalStorage();
        if (liveStore.liveRedoHistory.length == 0) return;
        this.store.updatePossibleMoves(null);
        if (this._lastSelectedBox.pos != -1) this.store.unselectBox(this._lastSelectedBox.pos);
        if (this._selectedBox.pos != -1) this.store.unselectBox(this._selectedBox.pos);
        if (this._selectedCapturedPiece.capturedIdx != -1) this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx);
        this._selectedBox = emptyBox(-1);
        this._lastSelectedBox = emptyBox(-1);
        this._selectedCapturedPiece = initializePiece(null);
        this.store.redoMove();
        this.showAndBindCapturedPieces();
        this.showBoardAndBindBoxes();
    }
}