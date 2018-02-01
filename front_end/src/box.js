/**
 * @typedef {!{pos: number, r: number, c: number, piece: (Piece|null), selected: boolean, possibleDest: boolean}}
 */
export var Box;

/**
 * @function
 * @param {!number} pos
 * @returns {Box}
 */
export function emptyBox(pos) {
    return {
        pos: pos,
        r: Math.trunc(pos/8),
        c: pos%8,
        piece: null,
        selected: false,
        possibleDest: false,
    }
}

/**
 * @typedef {!{r: number, c: number}}
 */
export var Location;

/**
 * @typedef {!{title: string, timesMoved: number, capturedIdx: number, selectedCapture: boolean}}
 */
export var Piece;

/**
 * @function
 * @param {!string} title 
 * @returns {!Piece}
 */
export function initializePiece(title) {
    return {
        title: title,
        timesMoved: 0,
        capturedIdx: -1,
        selectedCapture: false
    }
}

/**
 * @typedef {!number}
 */
export var Player;

/**
 * @type {!Player}
 */
export const WHITE_PLAYER = 0;

/**
 * @type {!Player}
 */
export const BLACK_PLAYER = 1;

/**
 * @typedef {!Array<Box>}
 */
export var Board;