import { Box, Piece, EmptyPiece, GameState, PLAYER_WHITE, PLAYER_BLACK, Player } from '../types';
const PieceHelper = {
  getNumMoves: (gameState: GameState, box: Box) => -1,
  isEmpty: (gameState: GameState, box: Box): boolean => false,
  isPieceOfGivenPlayer: (gameState: GameState, player: Player, box: Box): boolean => false,
  isPieceOfCurrentPlayer: (gameState: GameState, box: Box): boolean => false, 
  isBoxOnBoard: (gameState: GameState, box: Box): boolean => false, 
  isValidSourceAndDest: (gameState: GameState, src: Box, dst: Box): boolean => false, 
  canGoAlongRowToDest: (gameState: GameState, src: Box, dst: Box): boolean => false, 
  canGoAlongColToDest: (gameState: GameState, src: Box, dst: Box): boolean => false, 
  canGoAlongLineToDest: (gameState: GameState, src: Box, dst: Box): boolean => false, 
  canGoAlongDiagonalToDest: (gameState: GameState, src: Box, dst: Box): boolean => false, 
};
/**
 * @param {GameState} gameState
 * @param {Box} box
 * @returns {number}
 * @todo handle error case where code doesn't match in more meaningful way, better for testing.
 */
PieceHelper.getNumMoves = (gameState: GameState, box: Box): number => {
  const s = gameState.getEncoding(box);
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let numMoves = codeMatch && codeMatch.length > 2 && !isNaN(Number(codeMatch[2])) ? Number(codeMatch[2]) : -1; // -1 should never happen, though.
  return numMoves;
}
/**
 * 
 * @param {GameState} gameState
 * @param {Box} box
 * @returns {boolean}
 */
PieceHelper.isEmpty = (gameState: GameState, box: Box): boolean => gameState.getEncoding(box).trim() === '';
/**
 * 
 * @param {GameState} gameState 
 * @param {number} player 
 * @param {Box} box
 * @returns {boolean}
 */
PieceHelper.isPieceOfGivenPlayer = (gameState: GameState, player: Player, box: Box): boolean => {
  const s = gameState.getEncoding(box);
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let alphacode = codeMatch.length > 1 ? codeMatch[1] : null;
  if (!alphacode) return false;
  if ((player == PLAYER_WHITE && alphacode == alphacode.toUpperCase()) || (player == PLAYER_BLACK && alphacode == alphacode.toLowerCase())) return true;
  return false;
}
PieceHelper.isPieceOfCurrentPlayer = (gameState: GameState, box: Box): boolean => {
  const checkParticularPlayer = (playerCase: (s: string) => string, {c: c, r: r} = box): boolean =>
    (gameState.getEncoding(box) === playerCase.apply(gameState.getEncoding(box))) && !PieceHelper.isEmpty(gameState, box);
  return gameState.player === PLAYER_WHITE ?
    checkParticularPlayer(String.prototype.toUpperCase) : checkParticularPlayer(String.prototype.toLowerCase);
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} box 
 * @returns {boolean}
 */
PieceHelper.isBoxOnBoard = (gameState: GameState, box: Box): boolean => box.r < gameState.rankCount && box.r >= 0 && box.c >= 0 && box.c < gameState.fileCount;
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.isValidSourceAndDest = (gameState: GameState, src: Box, dst: Box): boolean => PieceHelper.isPieceOfCurrentPlayer(gameState,src) && !PieceHelper.isPieceOfCurrentPlayer(gameState,dst) && PieceHelper.isBoxOnBoard(gameState,dst) && src != dst;
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.canGoAlongRowToDest = (gameState: GameState, src: Box, dst: Box): boolean => {
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
PieceHelper.canGoAlongColToDest = (gameState: GameState, src: Box, dst: Box): boolean => {
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
PieceHelper.canGoAlongLineToDest = (gameState: GameState, src: Box, dst: Box): boolean => PieceHelper.canGoAlongColToDest(gameState, src, dst) || PieceHelper.canGoAlongRowToDest(gameState, src, dst);
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceHelper.canGoAlongDiagonalToDest = (gameState: GameState, src: Box, dst: Box): boolean => { // natural functionality for bishop
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