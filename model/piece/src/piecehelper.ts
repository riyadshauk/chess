import {Piece, Box} from './piece';
import {GameState} from '../../gamestate';
// import {Box} from '../../box';
const PieceHelper = {
  getNumMoves: (gameState, box: Box) => -1,
  isEmpty: (gameState, box: Box) => false,
  isPieceOfGivenPlayer: (gameState, player: number, box: Box) => false,
  isPieceOfCurrentPlayer: (gameState, box: Box) => false, 
  isBoxOnBoard: (gameState, box: Box) => false, 
  isValidSourceAndDest: (gameState, src: Box, dst: Box) => false, 
  canGoAlongRowToDest: (gameState, src: Box, dst: Box) => false, 
  canGoAlongColToDest: (gameState, src: Box, dst: Box) => false, 
  canGoAlongLineToDest: (gameState, src: Box, dst: Box) => false, 
  canGoAlongDiagonalToDest: (gameState, src: Box, dst: Box) => false, 
};
/**
 * @param {GameState} gameState
 * @param {Box} box
 * @returns {number}
 * @todo handle error case where code doesn't match in more meaningful way, better for testing.
 */
PieceHelper.getNumMoves = (gameState,box) => {
  const {c: c, r: r} = box;
  const s = gameState.board[r][c];
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let numMoves = codeMatch && codeMatch.length > 2 && !isNaN(codeMatch[2]) ? Number(codeMatch[2]) : -1; // -1 should never happen, though.
  return numMoves;
}
/**
 * 
 * @param {GameState} gameState
 * @param {Box} box
 * @returns {boolean}
 * @todo Parameter destructuring not yet supported by Google Closure compiler. Check for updates: https://github.com/google/closure-compiler/issues/1781 and revise if updated.
 */
PieceHelper.isEmpty = (gameState,box): boolean => {
  const {c: c, r: r} = box;
  return gameState.board[r][c].trim() === '';
}
/**
 * 
 * @param {GameState} gameState 
 * @param {number} player 
 * @param {Box} box
 * @returns {boolean}
 */
PieceHelper.isPieceOfGivenPlayer = (gameState,player,box) => {
  const s = gameState.board[box.r][box.c];
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let alphacode = codeMatch.length > 1 ? codeMatch[1] : null;
  if (!alphacode) return false;
  if ((player == 0 && alphacode == alphacode.toUpperCase()) || (player == 1 && alphacode == alphacode.toLowerCase())) return true;
  return false;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} box 
 * @returns {boolean}
 */
PieceHelper.isPieceOfCurrentPlayer = (gameState,box) => {
  const checkParticularPlayer = (playerCase,{c: c, r: r} = box) =>
    (gameState.board[r][c] == playerCase.apply(gameState.board[r][c])) && !PieceHelper.isEmpty(gameState,box);
  return gameState.player == gameState.playerWhite ?
    checkParticularPlayer(String.prototype.toUpperCase) : checkParticularPlayer(String.prototype.toLowerCase);
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} box 
 * @returns {boolean}
 */
PieceHelper.isBoxOnBoard = (gameState,box) => box.r < gameState.numRows && box.r >= 0 && box.c >= 0 && box.c < gameState.numCols;
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.isValidSourceAndDest = (gameState,src,dst) => PieceHelper.isPieceOfCurrentPlayer(gameState,src) && !PieceHelper.isPieceOfCurrentPlayer(gameState,dst) && PieceHelper.isBoxOnBoard(gameState,dst) && src != dst;
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.canGoAlongRowToDest = (gameState,src,dst) => {
  if (src.r == dst.r) {
    const dir = dst.c > src.c ? 1 : -1;
    let len = Math.abs(dst.c-src.c);
    for (let i = src.c+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState,{r:src.r,c:i})) return false;
    return true;
  }
  return false;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.canGoAlongColToDest = (gameState,src,dst) => {
  if (src.c == dst.c) {
    const dir = dst.r > src.r ? 1 : -1;
    let len = Math.abs(dst.r-src.r);
    for (let i = src.r+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState,{r:i,c:src.c})) return false;
    return true;
  }
  return false;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src
 * @param {Box} dst
 * @returns {boolean}
 */
PieceHelper.canGoAlongLineToDest = (gameState,src,dst) => PieceHelper.canGoAlongColToDest(gameState,src,dst) || PieceHelper.canGoAlongRowToDest(gameState,src,dst);
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.canGoAlongDiagonalToDest = (gameState,src,dst) => { // natural functionality for bishop
  if (Math.abs((dst.r - src.r)/(dst.c - src.c)) != 1) return false;
  let len = Math.abs(dst.c - src.c);
  const rowDir = dst.r - src.r > 0 ? 1 : -1;
  const colDir = dst.c - src.c > 0 ? 1 : -1;
  let i = src.r+rowDir;
  let j = src.c+colDir;
  for (; len-- > 1; i += rowDir, j += colDir) if (!PieceHelper.isEmpty(gameState,{r:i,c:j})) return false;
  return true;
}
export {PieceHelper};