import Store from './store';
import View from './view';
import {Board, Box, emptyBox, emptyPiece, Location} from './box';

/**
 * Deserialize the HTML data into a JS object.
 * https://stackoverflow.com/questions/5660050/what-is-serialization-and-deserialization-conceptually
 * @param {Element} box The raw html box from the view
 * @returns {Box} the contents of the box as a structured JS object
 */
const deserializeBoxContents = box => {
    let ret = emptyBox(Number(box.getAttribute('data-pos')));
    if (box.querySelector('div')) {
        ret.piece = emptyPiece;
        ret.piece.title = box.querySelector('div').getAttribute('class')
    }
    return ret;
}

/**
 * @param {Box} box
 * @returns {Location} location of box on board
 */
const extractLocationFromBox = box => ({r: box.r, c: box.c});

export default class Controller {
    /**
     * @param {!Store} store A store instance
     * @param {!View} view a View instance
     */
    constructor(store, view) {
        this.store = store;
        this.view = view;

        // view.bindSelectBox(this.selectBox.bind(this));
        view.bindUnselectPiece(this.unselectPiece.bind(this));
        view.bindMovePieceIfPossible(this.movePieceIfPossible.bind(this));

        this._selectedBox = emptyBox(Number(null));
        this._lastSelectedBox = emptyBox(Number(null));
    }

    /**
     * 
     * @param {Board} [board] Optional board to pass in, else load from local storage.
     */
    showBoardAndBindBoxes(board) {
        let boxes = board || this.store.getLocalStorage();
        this.view.showBoard(boxes);
        for (let r = 0; r < 8; r++) {
            for (let c = 0; c < 8; c++) {
                let box = this.view.$board.children[0].children[r].children[c];
                this.view.bindSelectBox(box, this.selectBox.bind(this));
            }
        }
    }

    /**
     * Place boxes on board at initial positions.
     * Call once at the beginning of the game / on load, etc.
     */
    initializeBoard() {
        console.log('initializing the board.');

        let whiteking = {};
        whiteking.title = 'whiteking';
        let whitequeen = {};
        whitequeen.title = 'whitequeen';
        let whitebishop = {};
        whitebishop.title = 'whitebishop';
        let whiteknight = {};
        whiteknight.title = 'whiteknight';
        let whiterook = {};
        whiterook.title = 'whiterook';
        let whitepawn = {};
        whitepawn.title = 'whitepawn';
        let blackking = {};
        blackking.title = 'blackking';
        let blackqueen = {};
        blackqueen.title = 'blackqueen';
        let blackbishop = {};
        blackbishop.title = 'blackbishop';
        let blackknight = {};
        blackknight.title = 'blackknight';
        let blackrook = {};
        blackrook.title = 'blackrook';
        let blackpawn = {};
        blackpawn.title = 'blackpawn';
        let boxes = Array(64);
        for (let i = 0; i < 64; i++) boxes[i] = emptyBox(i);
        boxes[0].piece = blackrook;
        boxes[1].piece = blackknight;
        boxes[2].piece = blackbishop;
        boxes[3].piece = blackqueen;
        boxes[4].piece = blackking;
        boxes[5].piece = blackbishop;
        boxes[6].piece = blackknight;
        boxes[7].piece = blackrook;
        for (let i = 8; i < 16; i++) boxes[i].piece = blackpawn;
        for (let i = 48; i < 56; i++) boxes[i].piece = whitepawn;
        boxes[56].piece = whiterook;
        boxes[57].piece = whiteknight;
        boxes[58].piece = whitebishop;
        boxes[59].piece = whitequeen;
        boxes[60].piece = whiteking;
        boxes[61].piece = whitebishop;
        boxes[62].piece = whiteknight;
        boxes[63].piece = whiterook;

        this.store.setLocalStorage(boxes);
        this.showBoardAndBindBoxes(boxes);

        console.log('boxes when just initialized:', boxes);
    }

    /**
     * Set and render the current view.
     */
    setView() {
        console.log('setView');
        this._refreshBoard();
    }

    /**
     * Update selectedPiece after seting lastSelectedPiece to current selectedPiece.
     * 
     * @param {Element} box div of the selected box
     */
    selectBox(box) {
        this._lastSelectedBox = this._selectedBox;
        this._selectedBox = deserializeBoxContents(box);
        console.log('previously selected box:', this._lastSelectedBox);
        console.log('selected box:', this._selectedBox);

        if (this.store.attemptMove(extractLocationFromBox(this._lastSelectedBox), extractLocationFromBox(this._selectedBox))) {
            this.showBoardAndBindBoxes();
        }
    }

    /**
     * Unselect piece (undo what would've happened in this.selectPiece)
     * 
     * @param {number} id ID of piece to unselect
     */
    unselectPiece(id) {
        console.log('Controller.unselectPiece');
        this._refreshBoard();
    }

    /**
     * Move piece if possible.
     * 
     * @todo check with Store if possible to move
     * @todo update View iff possible to move in Store
     */
    movePieceIfPossible() {
        console.log('Controller.movePieceIfPossible');
        this._refreshBoard();
    }


    /**
     * Refresh the board.
     */
    _refreshBoard() {
        
    }
}