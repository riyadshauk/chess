/**
 * @typedef {!{pos: number, r: number, c: number, piece: (Piece|null)}}
 */
export var Box;

/**
 * @function {!{pos: number, r: number, c: number, piece: null}}
 * @param {!number} pos
 * @returns {Box}
 */
export function emptyBox(pos) {
    return {
        pos: pos,
        r: Math.trunc(pos/8),
        c: pos%8,
        piece: null
    }
}

/**
 * @typedef {!{r: number, c: number}}
 */
export var Location;

/**
 * @typedef {!{title: string}}
 */
export var Piece;

export const emptyPiece = {title: ''};

/**
 * @typedef {!Array<Box>}
 */
export var Board;