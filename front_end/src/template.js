import {Board, emptyBox} from './box';

import {escapeForHTML} from './helpers';

export default class Template {
    /**
     * Format the content of the board by:
     * 1) Creating each box in a table representation;
     * 2) Placing each piece in its corresponding box.
     * 
     * @param {Board} boxes Array containing boxes
     * @returns {!Element} Contents of the board (as a table)
     */
    Board(boxes) {
        let board = document.createElement('board');
        let boxPos = 0;
        for (let r = 0; r < 8; r++) {
            let tr = document.createElement('tr');
            for (let c = 0; c < 8; c++) {
                let td = document.createElement('td');
                td.setAttribute('data-pos', boxPos);
                const box = boxes[r*8+c];
                const piece = box.piece;
                if (piece) {
                    let pieceDiv = document.createElement('div');
                    pieceDiv.setAttribute('class', piece.title);
                    td.appendChild(pieceDiv);
                }
                if (box.selected) {
                    td.setAttribute('class', 'selected');
                }
                if (box.possibleDest) {
                    td.setAttribute('class', 'possibleDest');
                }
                tr.appendChild(td);
                boxPos++;
            }
            board.appendChild(tr);
        }
        return board;
    }
    /**
     * @param {!string} type 
     * @param {!Array<Piece>} captures 
     * @returns {Element}
     */
    Captured(type, captures) {
        let tr = document.createElement('tr');
        for (let i = 0; i < captures.length; i++) {
            const piece = captures[i];
            if (piece.title.indexOf(type) == 0) {
                let td = document.createElement('td');
                let pieceDiv = document.createElement('div');
                pieceDiv.setAttribute('class', piece.title);
                if (piece.selectedCapture) {
                    pieceDiv.setAttribute('class', piece.title + ' selectedCapture');
                }
                td.appendChild(pieceDiv);
                tr.appendChild(td);
            }
        }
        return tr;
    }
    /**
     * @param {!Board} boxes
     * @returns {Element} 
     */
    CapturedWhite(boxes) {
        return this.Captured('white', boxes);
    }
    /**
     * @param {!Board} boxes 
     * @returns {Element}
     */
    CapturedBlack(boxes) {
        return this.Captured('black', boxes);
    }
}