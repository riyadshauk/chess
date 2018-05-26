import {Board, Location, Box, emptyBox, Piece, initializePiece, Player, WHITE_PLAYER, BLACK_PLAYER} from './types';
import { PieceGameLogic } from './model/piecegamelogic';
import { GameState as ModelGameState } from './model/gamestate';
import { Box as ModelBox } from './model/piece';

export default class Store {
    private liveStore = {
        liveBoard: [],
        livePlayer: -1,
        liveCaptures: [],
        liveHistory: [],
        liveRedoHistory: [],
        prevLiveStore: {
            liveBoard: [],
            livePlayer: -1,
            liveCaptures: [],
            liveHistory: [],
            liveRedoHistory: [],
            prevLiveStore: undefined,
            redoLiveStore: undefined
        },
        redoLiveStore: {
            liveBoard: [],
            livePlayer: -1,
            liveCaptures: [],
            liveHistory: [],
            liveRedoHistory: [],
            prevLiveStore: undefined,
            redoLiveStore: undefined
        }
    };
    private localStorage = window.localStorage;
    /**
     * @param {!string} name Database name
     * @param {function()} [callback] Called when Store is ready
     */
    constructor(name: string, callback?: Function) {
        /**
         * @type {Board}
         */
        let liveBoard = this.initializeBoard();

        /**
         * The turn of the player currently allowed to make the next move.
         * @type {!Player}
         */
        let livePlayer = WHITE_PLAYER;

        /**
         * @type {Array<Piece>}
         */
        let liveCaptures = [];

        /**
         * @type {Array<{src: Location, dst: Location, srcPiece: Piece, dstPiece: Piece, move: number}>}
         */
        let liveHistory = [];

        /**
         * @type {Array<{src: Location, dst: Location, srcPiece: Piece, dstPiece: Piece, move: number}>}
         */
        let liveRedoHistory = [];

        /**
         * @type {{liveBoard: {Board}, livePlayer: number}}
         */
        this.liveStore = {
            liveBoard: /** @type {!Board} */ (liveBoard),
            livePlayer: livePlayer,
            liveCaptures: liveCaptures,
            liveHistory: liveHistory,
            liveRedoHistory: liveRedoHistory,
            prevLiveStore: {
                liveBoard: /** @type {!Board} */ (liveBoard),
                livePlayer: livePlayer,
                liveCaptures: liveCaptures,
                liveHistory: liveHistory,
                liveRedoHistory: liveRedoHistory,
                prevLiveStore: undefined,
                redoLiveStore: undefined
            },
            redoLiveStore: {
                liveBoard: /** @type {!Board} */ (liveBoard),
                livePlayer: livePlayer,
                liveCaptures: liveCaptures,
                liveHistory: liveHistory,
                liveRedoHistory: liveRedoHistory,
                prevLiveStore: undefined,
                redoLiveStore: undefined
            }
        };

        if (callback) {
            callback();
        }
    }

    /**
     * @returns {Board} the initial board with all pieces in their starting positions
     */
    private initializeBoard = () => {
        const whiteking = initializePiece('whiteking');
        const whitequeen = initializePiece('whitequeen');
        const whitebishop = initializePiece('whitebishop');
        const whiteknight = initializePiece('whiteknight');
        const whiterook = initializePiece('whiterook');
        const whitepawn = initializePiece('whitepawn');
        const blackking = initializePiece('blackking');
        const blackqueen = initializePiece('blackqueen');
        const blackbishop = initializePiece('blackbishop');
        const blackknight = initializePiece('blackknight');
        const blackrook = initializePiece('blackrook');
        const blackpawn = initializePiece('blackpawn');
        /**
         * @returns {Board}
         */
        const emptyBoard = function() {
            const arr = [];
            for (let i = 0; i < 64; i++) arr[i] = emptyBox(i);
            return arr;
        };
        /**
         * @type {Board}
         */
        const boxes = emptyBoard();
        boxes[0].piece = Object.assign({},blackrook);
        boxes[1].piece = Object.assign({},blackknight);
        boxes[2].piece = Object.assign({},blackbishop);
        boxes[3].piece = Object.assign({},blackqueen);
        boxes[4].piece = Object.assign({},blackking);
        boxes[5].piece = Object.assign({},blackbishop);
        boxes[6].piece = Object.assign({},blackknight);
        boxes[7].piece = Object.assign({},blackrook);
        for (let i = 8; i < 16; i++) boxes[i].piece = Object.assign({},blackpawn);
        for (let i = 48; i < 56; i++) boxes[i].piece = Object.assign({},whitepawn);
        boxes[56].piece = Object.assign({},whiterook);
        boxes[57].piece = Object.assign({},whiteknight);
        boxes[58].piece = Object.assign({},whitebishop);
        boxes[59].piece = Object.assign({},whitequeen);
        boxes[60].piece = Object.assign({},whiteking);
        boxes[61].piece = Object.assign({},whitebishop);
        boxes[62].piece = Object.assign({},whiteknight);
        boxes[63].piece = Object.assign({},whiterook);
        return boxes;
    }

    /**
     * Read the Board and current player from localStorage.
     * @returns {{liveBoard: Board, livePlayer: number}}
     */
    public getLocalStorage() {
        /**
         * @type {string}
         */
        const localStorageItem = this.localStorage.getItem(name) !== null ? String(this.localStorage.getItem(name)) : JSON.stringify(this.liveStore);
        return this.liveStore || JSON.parse(localStorageItem);
    }

    /**
     * Write the local Board to localStorage.
     * 
     * @param {Board} board Array of boxes to write
     * @param {Player=} [player] Optionally set the value of the player who is allowed to make the next move.
     * @param {Array<Piece>=} captures Optional array of captured pieces.
     * @param {Array<{src: Location, dst: Location}>=} history
     * @param {Array<{src: Location, dst: Location}>=} HistoryItem
     * @param {Object=} prevLiveStore
     * @param {Object=} redoLiveStore
     */
    setLocalStorage(board?: Board, player?: Player, captures?: Array<Piece>, history?: Array<{src: Location, dst: Location}>, redoHistory?: Array<{src: Location, dst: Location}>, prevLiveStore?: any, redoLiveStore?: any) {
        if (Array.isArray(board)) this.liveStore.liveBoard = board;
        if (player === WHITE_PLAYER || player === BLACK_PLAYER) this.liveStore.livePlayer = player;
        if (Array.isArray(captures)) this.liveStore.liveCaptures = captures;
        if (Array.isArray(history)) this.liveStore.liveHistory = history;
        if (Array.isArray(redoHistory)) this.liveStore.liveRedoHistory = redoHistory;
        if (prevLiveStore != undefined) this.liveStore.prevLiveStore = prevLiveStore;
        if (redoLiveStore != undefined) this.liveStore.redoLiveStore = redoLiveStore;
        // console.log('this.liveStore:', this.liveStore);
        localStorage.setItem(name, JSON.stringify(this.liveStore));
    }

    /**
     * Glues this front-end piece representation to my particular back-end piece representation (as seen in my gameState.js).
     * @param {!string} s encoding of a piece in this front-end representation
     * @returns {!string} encoding of a piece that my particular back-end understands.
     */
    convertFrontToBackEncoding(s: string, timesMoved: number): string {
        let encoding = '';
        switch(s) {
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
        encoding = encoding ? encoding+timesMoved : encoding; // the number of moves is not really necessary atm...
        return encoding;
    }

    /**
     * Glues this front-end game representation to my particular back-end game representation as a gameState object.
     * @param {Board=} boardIn
     * @returns {!Object<Array<string>>}
     */
    convertBoardToGameState(boardIn?: Board): ModelGameState {
        /**
         * @type {Board}
         */
        let board = boardIn || this.getLocalStorage().liveBoard;
        const gameState = {
            board: Array(8),
            numRows: 8,
            numCols: 8,
            playerWhite: 0,
            playerBlack: 1,
            player: this.getLocalStorage().livePlayer,
            getEncoding: (box: Box): string => (gameState.board[box.r][box.c]),
        };
        for (let i = 0; i < gameState.board.length; i++) {
            gameState.board[i] = [];
            for (let k = 0; k < 8; k++) gameState.board[i].push(' '); // Array.fill(' ');
            for (let j = 0; j < gameState.board[i].length; j++) {
                const piece = board[8*i+j].piece;
                if (piece !== null) {
                    gameState.board[i][j] = this.convertFrontToBackEncoding(piece.title, piece.timesMoved);
                }
            }
        }
        return gameState;
    }

    /**
     * @param {Location} src 
     * @param {Board=} boardIn
     * @returns {({move: Location, capture: Location}|undefined)}
     */
    getEnPassantLocationIfPossible(src: Location, boardIn?: Board, historyIn?): {move: Location, capture: Location} | undefined {
        const srcPos = src.r*8+src.c;
        const liveStore = this.getLocalStorage();
        const board = boardIn || liveStore.liveBoard;
        const history = historyIn || liveStore.liveHistory;
        if (board[srcPos].piece && history.length != 0) {
            const forwardDir = liveStore.livePlayer == WHITE_PLAYER ? -1 : 1;
            const srcColor = liveStore.livePlayer == WHITE_PLAYER ? 'white' : 'black';
            const pieceThatLastMoved = history[history.length-1].srcPiece;
            if (board[srcPos].piece.title.indexOf('pawn') != -1 
                && pieceThatLastMoved.title.indexOf('pawn') != -1 
                && (pieceThatLastMoved.title.indexOf(srcColor) == -1 || (pieceThatLastMoved.r == board[srcPos].piece.r && pieceThatLastMoved.c == board[srcPos].piece.c))
                && Math.abs(history[history.length-1].src.r - history[history.length-1].dst.r) == 2
                && history[history.length-1].dst.r == src.r
                && Math.abs(history[history.length-1].dst.c - src.c) == 1) {
                    const ret = {
                        move: undefined,
                        capture: undefined,
                    };
                    ret.move = {r: src.r+forwardDir, c: history[history.length-1].dst.c };
                    ret.capture = history[history.length-1].dst;
                    return ret;
                }
        }
        return undefined;
    }

    /**
     * 
     * @param {ModelGameState} gameState 
     * @param {Location} src 
     * @param {Location} dst 
     * @return {(Location|boolean)} Location of piece that would be captured
     */
    locationIfIsCapture(gameState: ModelGameState, src: Location, dst: Location): Location | boolean {
        const possibleEnPassantLocation = this.getEnPassantLocationIfPossible(src);
        let forwardDir = 0;
        if (possibleEnPassantLocation && possibleEnPassantLocation.move.c == dst.c && possibleEnPassantLocation.move.r == dst.r) {
            return possibleEnPassantLocation.capture;
        }
        else if (PieceGameLogic.isACapture(gameState, src, dst)) {
            return dst;
        }
        else {
            return false;
        }
    }

    /**
     * Moves the piece from src to dst, marking the piece at dst captured if it's a capture.
     * This is the only place where the player turn is updated. 
     * Updates localStorage with the updated board and player.
     * @todo add edge-case for castling logic.
     * @param {!Location} src 
     * @param {!Location} dst 
     * @param {Object=} storeIn
     */
    movePiece(src: Location, dst: Location, storeIn?: Object) {
        let store = storeIn || this.getLocalStorage();
        let board = store.liveBoard;
        const gameState = this.convertBoardToGameState(board);
        let playerTurn = store.livePlayer;
        let captures = store.liveCaptures;
        let dstPos: number = dst.r*8+dst.c;
        const srcPos = src.r*8+src.c;
        let dstPiece = board[dstPos].piece;
        const srcPiece = board[srcPos].piece;
        const locationToCapture: Location | boolean = this.locationIfIsCapture(gameState, src, dst);
        if (locationToCapture != false) {
            dstPos = (<Location>locationToCapture).r*8 + (<Location>locationToCapture).c;
            dstPiece = board[dstPos].piece;
            board[dstPos].piece.capturedIdx = captures.length;
            captures.push(board[dstPos].piece);
            board[dstPos].piece = null;
        }
        if (PieceGameLogic.kingCanCastleWithGivenRook(gameState,src,dst)) {
            let outDir = dst.c - src.c > 0 ? 1 : -1;
            let shiftKing = 0;
            let shiftRook = 0;
            if (Math.abs(dst.c - src.c) == 3) {
                shiftKing = 2;
                shiftRook = 2;
            } else if (Math.abs(dst.c - src.c) == 4) {
                shiftKing = 2;
                shiftRook = 3;
            }
            board[srcPos+outDir*shiftKing].piece = board[srcPos].piece;
            board[srcPos+outDir*shiftKing].piece.timesMoved++; // is only a king's move.
            board[srcPos].piece = null;
            board[dstPos-outDir*shiftRook].piece = board[dstPos].piece;
            board[dstPos].piece = null;
        } else if(this.getEnPassantLocationIfPossible(src) != undefined) {
            const enPassant = this.getEnPassantLocationIfPossible(src);
            board[dst.r*8+dst.c].piece = board[src.r*8+src.c].piece;
            board[dst.r*8+dst.c].piece.timesMoved++;
            board[src.r*8+src.c].piece = null;
            dstPiece = null;
        } else {
            board[dstPos].piece = board[srcPos].piece;
            board[dstPos].piece.timesMoved++;
            board[srcPos].piece = null;
        }
        let history = store.liveHistory;
        history.push({src: src, dst: dst, srcPiece: srcPiece, dstPiece: dstPiece, move: history.length});
        const prevLiveStore = Object.assign({}, store);
        prevLiveStore.prevLiveStore = undefined;
        if (playerTurn == WHITE_PLAYER) playerTurn = BLACK_PLAYER;
        else playerTurn = WHITE_PLAYER;
        this.setLocalStorage(board, playerTurn, captures, history, [], prevLiveStore);
        if (this.canPromote(src)) {
            console.log('Promotion possible in Store movePiece');
            // let {board, playerTurn, captures, history, redoHistory, prevLiveStore} = this.getLocalStorage();
            // playerTurn = playerTurn == WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER;
            // this.setLocalStorage(board, playerTurn, captures, history, redoHistory, prevLiveStore);
        }
    }

    /**
     * Sets the box on the Board as selected.
     * @param {number} pos Index of box in Board.
     */
    selectBox(pos: number) {
        let boxes = this.getLocalStorage().liveBoard;
        boxes[pos].selected = true;
        this.setLocalStorage(boxes);
    }

    /**
     * Sets the box on the Board as unselected.
     * @param {number} pos Index of box in Board.
     */
    unselectBox(pos: number) {
        let boxes = this.getLocalStorage().liveBoard;
        boxes[pos].selected = false;
        this.setLocalStorage(boxes);
    }

    /**
     * 
     * @param {number} pos Index of the captured piece in liveCaptures.
     */
    selectCapturedPiece(pos: number) {
        let captures = this.getLocalStorage().liveCaptures;
        captures[pos].selectedCapture = true;
        this.setLocalStorage(undefined, undefined, captures);
    }

    /**
     * 
     * @param {number} pos Index of the captured piece in liveCaptures.
     */
    unSelectCapturedPiece(pos: number) {
        let captures = this.getLocalStorage().liveCaptures;
        captures[pos].selectedCapture = false;
        this.setLocalStorage(undefined, undefined, captures);
    }

    /**
     * 
     * @param {!Location} src 
     * @param {!Location} dst
     * @returns {(Location|boolean)} False iff cannot move the piece at src to dst, else location of En Passant Move.
     */
    locationIfCanMove(src: Location, dst: Location): Location | boolean {
        if (!src || !dst) {
            return false;
        }
        const gameState = this.convertBoardToGameState();
        const isPossibleToMoveTo = PieceGameLogic.isPossibleToMoveTo(gameState,src);
        const canMoveToDest = isPossibleToMoveTo(dst);
        const possibleEnPassantLocation = this.getEnPassantLocationIfPossible(src);
        let canEnPassant = false;
        if ((possibleEnPassantLocation != undefined && possibleEnPassantLocation.move.r == dst.r && possibleEnPassantLocation.move.c == dst.c) || canMoveToDest)  {
            return dst;
        }
        else {
            return false;
        }
    }

    /**
     * 
     * @param {!Location} src 
     * @returns {!Array<Location>}
     */
    getPossibleMoves(src: Location): Array<Location> {
        const gameState = this.convertBoardToGameState();
        let locations = PieceGameLogic.getPossibleMoves(gameState,src);
        const possibleEnPassantLocation = this.getEnPassantLocationIfPossible(src);
        if (possibleEnPassantLocation != undefined) {
            locations.push(possibleEnPassantLocation.move);
        }
        return locations;
    }

    /**
     * 
     * @param {(Array<Location>|null)} possibleMoves 
     */
    updatePossibleMoves(possibleMoves?: Array<Location>) {
        let boxes = this.getLocalStorage().liveBoard;
        switch(possibleMoves) {
            case null:
                boxes = boxes.map(box => {
                    box.possibleDest = false;
                    return box;
                });
                this.setLocalStorage(boxes);
                break;
            default:
                possibleMoves.forEach(loc => {
                    boxes[loc.r*8+loc.c].possibleDest = true;
                });
                this.setLocalStorage(boxes);
                break;
        }
    }

    /**
     * 
     * @param {Location} pawn 
     * @returns {boolean}
     */
    canPromote(pawn: Location): boolean {
        let board = this.getLocalStorage().liveBoard;
        let history = this.getLocalStorage().liveHistory;
        let hItem = history[history.length-1];
        const pawnPiece = board[pawn.r*8+pawn.c].piece;
        if (pawnPiece != null && pawnPiece.title.indexOf('pawn') != -1
            && ((pawn.r == 0 && pawnPiece.title.indexOf('white') == 0) || (pawn.r == 7 && pawnPiece.title.indexOf('black') == 0))
            && hItem.dst.r == pawn.r && hItem.dst.c == pawn.c
        ) {
            return true;
        }
        return false;
    }

    /**
     * @param {Location} pawn
     * @param {Location=} other Other piece location to promote pawn to
     * @param {Piece=} otherPieceIn
     * @returns {boolean} True if successfully promoted, false o.w.
     * @description Only modifies this.liveStore.liveBoard at the title of the given pawn piece, iff valid, and sets that into localStorage.
     */
    promoteIfPossible(pawn: Location, other?: Location, otherPieceIn?: Piece): boolean {
        let board = this.getLocalStorage().liveBoard;
        let history = this.getLocalStorage().liveHistory;
        let player = this.getLocalStorage().livePlayer;
        let hItem = history[history.length-1];
        const pawnPiece = board[pawn.r*8+pawn.c].piece;
        const otherPiece = otherPieceIn || board[other.r*8+other.c].piece;
        if (pawnPiece != null && pawnPiece.title.indexOf('pawn') != -1
            && otherPiece != null && pawnPiece.title.indexOf('white') == otherPiece.title.indexOf('white')
            && ((pawn.r == 0 && pawnPiece.title.indexOf('white') == 0) || (pawn.r == 7 && pawnPiece.title.indexOf('black') == 0))
            && hItem.dst.r == pawn.r && hItem.dst.c == pawn.c
            && otherPiece.title.indexOf('pawn') == -1
            && otherPiece.title.indexOf('king') == -1
        ) {
            board[pawn.r*8+pawn.c].piece.title = otherPiece.title;
            const m = hItem.move;
            history.push({src: pawn, dst: pawn, srcPiece: pawnPiece, dstPiece: pawnPiece, move: m});
            player = player == WHITE_PLAYER ? BLACK_PLAYER : WHITE_PLAYER;
            this.setLocalStorage(board,player,undefined,history);
            return true;
        }
        return false;
    }

    /**
     * @todo Look into FEN, PGN, SAN and common implementations of keeping history
     */
    undoMove() {
        // const store = this.store.getLocalStorage();
        // store.redoLiveStore = Object.assign({}, store);
        // store.redoLiveStore.prev
        // store = Object.assign({}, store.prevLiveStore);
    }
    redoMove() {
        
    }

    /**
     * @todo Consider FEN, PGN, SAN, etc for this.
     */
    loadBoard() {

    }
    saveBoard() {

    }
}