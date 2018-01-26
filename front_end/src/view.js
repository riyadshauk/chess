import {Board} from './box';
import {qs, $on} from './helpers';
import Template from './template';

const _boxId = element => parseInt(element.parentNode.dataset.id, 10);

export default class View {
    /**
     * @param {!Template} template A Template instance
     */
    constructor(template) {
        this.template = template;
        this.$board = qs('.chessboard');
        this.$main = qs('.main');
    }

    showBoard(boxes) {
        this.$board.replaceChild(this.template.Board(boxes), this.$board.firstChild);
    }

    bindSelectBox(box, handler) {
        $on(box, 'click', ({target}) => {
            handler(box);
        });
    }
    bindUnselectPiece(handler) {
        // $on(this.$board, 'click', handler);
    }
    bindMovePieceIfPossible(handler) {
        // $on(this.$board, 'click', handler);
    }
}