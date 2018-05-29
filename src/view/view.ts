import { Board, Box, Piece, StoreState } from '../types';
import { qs, $on } from './helpers';
import Template from './template';

export default class View {
    private _template: Template;
    private _$board: Element;
    private _$capturedwhite: Element;
    private _$capturedblack: Element;
    private _$main: Element;
    private _$undobtn: Element;
    private _$redobtn: Element;

    constructor() {
        this._template = new Template;
        this._$board = qs('.chessboard');
        this._$capturedwhite = qs('.capturedwhite');
        this._$capturedblack = qs('.capturedblack');
        this._$main = qs('.main');
        this._$undobtn = qs('.undo');
        this._$redobtn = qs('.redo');
    }

    public get $board() {
        return this._$board;
    }
    public get $capturedwhite() {
        return this._$capturedwhite;
    }
    public get $capturedblack() {
        return this._$capturedblack;
    }

    /**
     * @description Updates the chessboard html.
     */
    showBoard(state: StoreState): void {
        this.$board.replaceChild(this._template.Board(state), this.$board.firstChild);
    }

    /**
     * @description Updates the captured pieces in the html.
     */
    showCaptures(state: StoreState): void {
        this.$capturedwhite.replaceChild(this._template.CapturedWhite(state), this.$capturedwhite.firstChild);
        this.$capturedblack.replaceChild(this._template.CapturedBlack(state), this.$capturedblack.firstChild);
    }

    /**
     * @description Binds handler to box, calling handler when the synthetic 'click' event is fired.
     */
    bindSelectBox(box: Element, handler: (box: Element) => void): void {
        $on(box, 'click', () => handler(box));
    }

    /**
     * @description Binds handler to piece, calling handler when the synthetic 'click' event is fired.
     */
    bindCapturedPiece(piece: Element, i: number, handler: (piece: Element, i: number) => void): void {
        $on(piece, 'click', () => handler(piece, i));
    }

    bindUndoMove(handler: Function): void {
        // $on(this.$undobtn, 'click', () => handler());
    }

    bindRedoMove(handler: Function): void {
        // $on(this.$redobtn, 'click', () => handler());
    }
}