import {Board, Location, Box, Piece} from './box';
// import PieceGameLogic from '../../model/piecegamelogic/src/piecegamelogic';

export default class Store {
    /**
     * @param {!string} name Database name
     * @param {function()} [callback] Called when Store is ready
     */
    constructor(name, callback) {
        /**
         * @type {Storage}
         */
        const localStorage = window.localStorage;

        /**
         * @type {Board}
         */
        let liveBoard;

        /**
         * Read the local Board from localStorage.
         * @returns {Board} Current array of boxes
         */
        this.getLocalStorage = () => {
            return liveBoard || JSON.parse(localStorage.getItem(name) || '[]');
        }

        /**
         * Write the local Board to localStorage.
         * 
         * @param {Board} boxes Array of boxes to write
         */
        this.setLocalStorage = boxes => {
            localStorage.setItem(name, JSON.stringify(liveBoard = boxes));
        }

        if (callback) {
            callback();
        }
    }

    /**
     * Glues this front-end piece representation to my particular back-end piece representation (as seen in my gameState.js).
     * @param {!string} str encoding of a piece in this front-end representation
     * @returns {!string} encoding of a piece that my particular back-end understands.
     */
    convertFrontToBackEncoding(str) {
        let encoding = '';
        switch(str) {
            case 'whitepawn':
                encoding = 'P';
                break;
            case 'whiterook':
                encoding = 'R';
                break;
            case 'whiteknight':
                encoding = 'H';
                break;
            case 'whitebishop':
                encoding = 'B';
                break;
            case 'whitequeen':
                encoding = 'Q';
                break;
            case 'whiteking':
                encoding = 'K';
                break;
            case 'blackpawn':
                encoding = 'p';
                break;
            case 'blackrook':
                encoding = 'r';
                break;
            case 'blackknight':
                encoding = 'h';
                break;
            case 'blackbishop':
                encoding = 'b';
                break;
            case 'blackqueen':
                encoding = 'q';
                break;
            case 'blackking':
                encoding = 'k';
                break;
            default:
                break;
        }
        encoding = encoding ? encoding+'0' : encoding; // the number of moves is not really necessary atm...
        return encoding;
    }

    /**
     * Glues this front-end game representation to my particular back-end game representation as a gameState object.
     * @returns {!Array<string>}
     */
    convertBoardToGameState() {
        /**
         * @type {Board}
         */
        let board = this.getLocalStorage();
        let gameState = Array(8);
        for (let i = 0; i < gameState.length; i++) {
            gameState[i] = Array(8).fill(' ');
            for (let j = 0; j < gameState[i].length; j++) {
                if (board[i+j].piece) {
                    gameState[i][j] = this.convertFrontToBackEncoding(board[i+j].piece.title);
                }
            }
        }
        return gameState;
    }

    /**
     * 
     * @todo hook this up to the Model / my primitive engine.
     * @param {!Location} src 
     * @param {!Location} dst
     * @returns {boolean} True iff can move the piece at src to dst, nontrivially.
     */
    attemptMove(src, dst) {
        // const gameState = this.convertBoardToGameState();
        // const isPossibleToMoveTo = PieceGameLogic.getPossibleMoves(gameState,src,dst);
        // const possible = isPossibleToMoveTo(dst);
        // console.log('isPossibleToMoveTo:', isPossibleToMoveTo);
        return true;
    }
}