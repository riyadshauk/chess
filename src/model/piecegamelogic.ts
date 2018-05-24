import 'path';
import {GameState, initialGameState} from './gamestate';
import {Box, Piece, EmptyPiece} from './piece';
import {PieceHelper} from './piecehelper';
import Pawn from './pawn';
import Rook from './rook';
import Knight from './knight';
import Bishop from './bishop';
import Queen from './queen';
import King from './king';
const PieceGameLogic = { // for TypeScript
  getType: (s: string) => new EmptyPiece,
  getNumMoves: (s: string) => -1,
  getPossibleMoves: (gameState, src: Box) => [{r: -1, c: -1}],
  isPossibleToMoveTo: (gameState, src: Box) => (Box) => false,
  isInCheck: (gameState, src: Box) => false,
  isInCheckmate: (gameState, src: Box) => false,
  kingCanCastleWithGivenRook: (gameState, src: Box, dst: Box) => false,
  castleKingWithGivenRook: (gameState, src: Box, dst: Box) => false,
  getSetOfAllPossibleMovesForPlayer: (gameState, player: number) => new Set(),
  randomDefensiveMove: (gameState) => new Set(),
  isACapture: (gameState, src: Box, dst: Box) => false,
};
/**
 * 
 * @param {string} s 
 * @returns {Piece}
 */
PieceGameLogic.getType = (s: string) => {
  if (s.trim() === '') return new EmptyPiece;
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let numMoves = codeMatch && codeMatch.length > 2 ? codeMatch[2] : null;
  let alphacode = codeMatch.length > 1 ? codeMatch[1] : null;
  if (!numMoves || !alphacode) return new EmptyPiece;
  switch (alphacode.toLowerCase().trim()) {
    case 'p':
      return new Pawn;
    case 'r':
      return new Rook;
    case 'h':
      return new Knight;
    case 'b':
      return new Bishop;
    case 'q':
      return new Queen;
    case 'k':
      const king = new King(PieceGameLogic.kingCanCastleWithGivenRook);
      return king;
    case '':
      return new EmptyPiece;
    default:
      return new EmptyPiece;
    }
}
/**
 * 
 * @param {string} s 
 * @returns {(number)}
 * @todo handle error case where code doesn't match in more meaningful way, better for testing.
 */
PieceGameLogic.getNumMoves = s => {
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let numMoves = codeMatch && codeMatch.length > 2 && !Number.isNaN(Number(codeMatch[2])) ? Number(codeMatch[2]) : -1; // -1 should never happen, though.
  return numMoves;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @returns {Array<Box>}
 */
PieceGameLogic.getPossibleMoves = (gameState,src) => {
  const constructMovesMatrix = (gameState,src,PieceType,numMoves) => {
    let validMoves = [];
    const isPossibleToMoveTo = typeof PieceType.getPossibleMoves == 'function' ? PieceType.getPossibleMoves(gameState,src,numMoves) : (dst)=>false;
    if (!isPossibleToMoveTo) return validMoves;
    for (let i = 0; i < gameState.board.length; i++)
      for (let j = 0; j < gameState.board[0].length; j++)
         if (isPossibleToMoveTo({r:i,c:j})) validMoves.push({r:i,c:j});
    return validMoves;
  }
  const s = gameState.board[src.r][src.c];
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  if (PieceType && !isNaN(numMoves)) return constructMovesMatrix(gameState,src,PieceType,numMoves)
  return [];
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src
 * @returns {Function: boolean}
 */
PieceGameLogic.isPossibleToMoveTo = (gameState, src) => {
  const s = gameState.board[src.r][src.c];
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  const isPossibleToMoveTo = PieceType.getPossibleMoves(gameState, src);
  return isPossibleToMoveTo;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @returns {boolean}
 */
PieceGameLogic.isInCheck = (gameState,src) => {
  for (let i = 0; i < gameState.board.length; i++)
    for (let j = 0; j < gameState.board[0].length; j++)
      if (src.r != i && src.c != j) {
        const possibleAttacks = PieceGameLogic.getPossibleMoves(gameState,{r:i,c:j});
        for (let k = 0; k < possibleAttacks.length; k++) {
          if (possibleAttacks[k].r==src.r && possibleAttacks[k].c==src.c) return true;
        }
      }
  return false;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @returns {boolean}
 */
PieceGameLogic.isInCheckmate = (gameState,src) => {
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState,src);
  let pieceIsInCheck = PieceGameLogic.isInCheck(gameState,src);
  if (pieceIsInCheck) {
    let isInCheckmate = true; // use reduce
    console.log('isInCheckmate possibleMoves', possibleMoves);
    for (let i = 0; i < possibleMoves.length; i++)
      isInCheckmate = isInCheckmate && PieceGameLogic.isInCheck(gameState,possibleMoves[i]);
    if (isInCheckmate) return true;
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
PieceGameLogic.kingCanCastleWithGivenRook = (gameState,src,dst) => {
  const s = gameState.board[src.r][src.c];
  const t = gameState.board[dst.r][dst.c];
  if (PieceGameLogic.getType(s).name != (new King(/* @todo pass in functionality? */)).name || PieceGameLogic.getType(t).name != (new Rook).name || PieceGameLogic.getNumMoves(s) != 0 || PieceGameLogic.getNumMoves(t) != 0) return false;
  if (PieceHelper.isPieceOfCurrentPlayer(gameState,src) && PieceHelper.isPieceOfCurrentPlayer(gameState,dst) && PieceHelper.isBoxOnBoard(gameState,dst) && src != dst) {
    let dir = dst.c - src.c > 0 ? 1 : -1;
    let len = Math.abs(dst.c-src.c);
    for (let i = src.c+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState,{r:src.r,c:i})) return false;
    return true;
  }
}
/**
 * Assumes PieceGameLogic.kingCanCastleWithGivenRook was called beforehand to verify this is a valid move.
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst
 * @returns {GameState} Updated GameState with King's castle.
 */
PieceGameLogic.castleKingWithGivenRook = (gameState,src,dst) => {
  let outDir = dst.c - src.c > 0 ? 1 : -1;
  let shift = 0;
  if (Math.abs(dst.c - src.c) == 3) shift = 2;
  else if (Math.abs(dst.c - src.c) == 4) shift = 3;
  gameState[src.r][src.c+outDir*shift] = Object.assign({},gameState[src.r][src.c]);
  gameState[src.r][src.c] = ' ';
  gameState[dst.r][dst.c-outDir*shift] = Object.assign({},gameState[dst.r][dst.c]);
  gameState[dst.r][dst.c] = ' ';
  return gameState;
}

/**
 * 
 * @param {GameState} gameState 
 * @param {number} player 
 * @returns {Set}
 */
PieceGameLogic.getSetOfAllPossibleMovesForPlayer = (gameState,player) => {
  let s = new Set();
  for (let i = 0; i < gameState.board.length; i++)
    for (let j = 0; j < gameState.board[0].length; j++)
      if (!PieceHelper.isPieceOfGivenPlayer(gameState,player,{r:i,c:j}) && !PieceHelper.isEmpty(gameState,{r:i,c:j})) {
        const possiblePlayerMoves = PieceGameLogic.getPossibleMoves(gameState,{r:i,c:j});
        for (let k = 0; k < possiblePlayerMoves.length; k++)
          s.add(possiblePlayerMoves[k]);
      }
  return s;
}
/**
 * 
 * @param {GameState} gameState 
 * @returns {Set}
 * @todo not this simple, should prioritize kill-moves and moves that get the player out of harm (in next move only, for now)
 */
PieceGameLogic.randomDefensiveMove = (gameState) => {
  const currentPlayer = gameState.player;
  const opponent = currentPlayer == 0 ? 1 : 0;
  const setOfOpponentMoves = PieceGameLogic.getSetOfAllPossibleMovesForPlayer(gameState,opponent);
  let randIdx = 0;
  return setOfOpponentMoves;
}
/**
 * 
 * @param {GameState} gameState 
 * @param {Box} src 
 * @param {Box} dst 
 * @returns {boolean}
 */
PieceGameLogic.isACapture = (gameState,src,dst) => {
  const s = gameState.board[src.r][src.c];
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  if (typeof PieceType.getPossibleMoves == 'function' && !isNaN(numMoves)) {
    const isPossibleToMoveTo = PieceType.getPossibleMoves(gameState,src,numMoves);
    if (isPossibleToMoveTo(dst) && !PieceHelper.isPieceOfCurrentPlayer(gameState,dst) && !PieceHelper.isEmpty(gameState,dst)) return true;
  }
  return false;
}
export {PieceGameLogic};
