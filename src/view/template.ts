import { Board, Piece, StoreState } from '../types';

import { escapeForHTML } from './helpers';

export default class Template {
    /**
     * Format the content of the board by:
     * 1) Creating each box in a table representation;
     * 2) Placing each piece in its corresponding box.
     */
    Board(state: StoreState): Element {
        const pieces: Array<Array<Piece>> = state.board;
        let board = document.createElement('board');
        let boxPos = 0;
        for (let r = 0; r < 8; r++) {
            let tr = document.createElement('tr');
            for (let c = 0; c < 8; c++) {
                let td = document.createElement('td');
                td.setAttribute('data-pos', String(boxPos));
                const piece = pieces[r][c];
                td.setAttribute('piece', JSON.stringify(piece));
                if (piece) {
                    let pieceDiv = document.createElement('div');
                    pieceDiv.setAttribute('class', piece.color + piece.name);
                    td.appendChild(pieceDiv);
                }
                if (state.selectedBoxes[r][c]) {
                    td.setAttribute('class', 'selected');
                }
                if (state.possibleDestBoxes[r][c]) {
                    td.setAttribute('class', 'possibleDest');
                }
                tr.appendChild(td);
                boxPos++;
            }
            board.appendChild(tr);
        }
        return board;
    }
    Captured(type: string, state: StoreState): Element {
        const captures = state.captures;
        const selectedCaptures = state.selectedCaptures;
        let tr = document.createElement('tr');
        for (let i = 0; i < captures.length; i++) {
            const piece = captures[i];
            if (piece.name && piece.name.indexOf(type) == 0) {
                let td = document.createElement('td');
                let pieceDiv = document.createElement('div');
                pieceDiv.setAttribute('class', piece.color + piece.name);
                if (selectedCaptures[i]) {
                    pieceDiv.setAttribute('class', piece.color + piece.name + ' selectedCapture');
                }
                td.appendChild(pieceDiv);
                tr.appendChild(td);
            }
        }
        return tr;
    }
    CapturedWhite(state: StoreState): Element {
        return this.Captured('white', state);
    }
    CapturedBlack(state: StoreState): Element {
        return this.Captured('black', state);
    }
}