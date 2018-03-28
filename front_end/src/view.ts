import { Board, Location, Box, Piece } from './box';
import { qs, $on } from './helpers';
import Template from './template';

export default class View {
    private template: Template;
    private $board: Element;
    private $capturedwhite: Element;
    private $capturedblack: Element;
    private $main: Element;
    private $undobtn: Element;
    private $redobtn: Element;
    /**
     * @param {Template} template A Template instance
     */
    constructor(template: Template) {
        this.template = template;
        this.$board = qs('.chessboard');
        this.$capturedwhite = qs('.capturedwhite');
        this.$capturedblack = qs('.capturedblack');
        this.$main = qs('.main');
        this.$undobtn = qs('.undo');
        this.$redobtn = qs('.redo');
    }

    public get$board() {
        return this.$board;
    }
    public get$capturedwhite() {
        return this.$capturedwhite;
    }
    public get$capturedblack() {
        return this.$capturedblack;
    }

    /**
     * Updates the chessboard html.
     * @param {Board} board 
     */
    showBoard(board: Board) {
        this.$board.replaceChild(this.template.Board(board), this.$board.firstChild);
    }

    /**
     * Updates the captured pieces in the html.
     * @param {Array<Piece>} captures 
     */
    showCaptures(captures: Array<Piece>) {
        this.$capturedwhite.replaceChild(this.template.CapturedWhite(captures), this.$capturedwhite.firstChild);
        this.$capturedblack.replaceChild(this.template.CapturedBlack(captures), this.$capturedblack.firstChild);
    }

    /**
     * Binds handler to box, calling handler when the synthetic 'click' event is fired.
     * @param {Element} box 
     * @param {Function} handler 
     */
    bindSelectBox(box: Element, handler: Function) {
        $on(box, 'click', (({target}) => handler(box)));
    }

    /**
     * Binds handler to piece, calling handler when the synthetic 'click' event is fired.
     * @param {Element} piece 
     * @param {Function} handler 
     */
    bindCapturedPiece(piece: Element, i: number, handler: Function) {
        $on(piece, 'click', () => handler(piece, i));
    }

    bindUndoMove(handler) {
        // $on(this.$undobtn, 'click', () => handler());
    }

    bindRedoMove(handler) {
        // $on(this.$redobtn, 'click', () => handler());
    }
}