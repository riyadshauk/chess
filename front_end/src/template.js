import {Board, emptyBox} from './box';

import {escapeForHTML} from './helpers';

export default class Template {
    /**
     * Helper for Board
     * 
     * @param {string} title
     * @returns {string} The title of the box, if it has a title, 'none' otherwise.
     */
    displayTitle(title){
        return title ? '\"'+title+'\"' : '\"blank\"';
    }

    /**
     * Format the content of the board by:
     * 1) Creating each box in a table representation;
     * 2) Placing each piece in its corresponding box.
     * 
     * @param {Board} boxes Array containing boxes
     * @returns {!Element} Contents of the board (as a table)
     * 
     * @example
     * view.show({
     * title: "whiteking"
     * })
     */
    Board(boxes) {
        let board = document.createElement('board');
        let box = 0;
        for (let r = 0; r < 8; r++) {
            let tr = document.createElement('tr');
            for (let c = 0; c < 8; c++) {
                let td = document.createElement('td');
                td.setAttribute('data-pos', box);
                if (boxes[r*8+c].piece) {
                    let piece = document.createElement('div');
                    piece.setAttribute('class', boxes[r*8+c].piece.title);
                    td.appendChild(piece);
                }
                tr.appendChild(td);
                box++;
            }
            board.appendChild(tr);
        }
        return board;
    }
}