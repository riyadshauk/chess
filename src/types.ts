/**
 * @typedef {!{pos: number, r: number, c: number, piece: (Piece|null), selected: boolean, possibleDest: boolean}}
 */
export interface Box {
    pos: number;
    r: number;
    c: number;
    piece: Piece | null;
    selected: boolean;
    possibleDest: boolean;
}

/**
 * @function
 * @param {!number} pos
 * @returns {Box}
 */
export function emptyBox(pos: number): Box {
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
export interface Location {
    r: number;
    c: number;
}

/**
 * @typedef {!{title: string, timesMoved: number, capturedIdx: number, selectedCapture: boolean}}
 */
export interface Piece {
    title: string;
    timesMoved: number;
    capturedIdx: number;
    selectedCapture: boolean;
}

/**
 * @function
 * @param {!string} title 
 * @returns {!Piece}
 */
export function initializePiece(title: string): Piece {
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
export type Player = number;

/**
 * @type {!Player}
 */
export const WHITE_PLAYER: Player = 0;

/**
 * @type {!Player}
 */
export const BLACK_PLAYER: Player = 1;

/**
 * @typedef {!Array<Box>}
 */
export type Board = Array<Box>;