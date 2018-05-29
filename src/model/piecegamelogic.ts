import 'path';
import { Box, Piece, EmptyPiece, GameState, Board } from '../types';
import { PieceHelper } from './piecehelper';
import Pawn from './pawn';
import Rook from './rook';
import Knight from './knight';
import Bishop from './bishop';
import Queen from './queen';
import King from './king';
/**
 * @description This module is purely functional (there shall be no side-effects).
 *  Furthermore, it is up to the caller to adequately store the results of calling these pure functions.
 */
const PieceGameLogic = { // for TypeScript
  convertGSBoardToPieceBoard: (gameState: GameState): Array<Array<Piece>> => [],
  convertPieceToStringEncoding: (piece: Piece, timesMoved?: number): string => '',
  getType: (s: string): Piece => <Piece>(new EmptyPiece),
  getNumMoves: (s: string): number => -1,
  getPossiblePiecesToPromoteTo: (gameState: GameState, src: Box): Array<Box> => [],
  getPossibleMoves: (gameState: GameState,  src: Box, prevMove?: { src: Box, dst: Box }): Array<Box> => [{r: -1, c: -1}],
  isPossibleToMoveTo: (gameState: GameState,  src: Box): Function => (box: Box): boolean => false,
  isInCheck: (gameState: GameState,  src: Box): boolean => false,
  isInCheckmate: (gameState: GameState,  src: Box): boolean => false,
  kingCanCastleWithGivenRook: (gameState: GameState,  src: Box, dst: Box): boolean => false,
  castleKingWithGivenRook: (gameState: GameState,  src: Box, dst: Box): GameState => gameState,
  getSetOfAllPossibleMovesForPlayer: (gameState: GameState,  player: number): Set<Box> => new Set(),
  randomDefensiveMove: (gameState: GameState): Set<Box> => new Set(),
  isACapture: (gameState: GameState,  src: Box, dst: Box): boolean => false,
  isEnPassantPossible: (gameState: GameState, src: Box, prevMove: {src: Box, dst: Box}): boolean => false,
  getBoxOfPromotablePieceIfPossible: (gameState: GameState): Box => ({r: -1, c: -1}),
  promoteIfPossible: (gameState: GameState, first: Box, second: Piece): GameState => gameState,
  incrementMoveCount: (enc: string): string => '',
  makeLegalMove: (gameState: GameState, src: Box, dst: Box, prevMove: {src: Box, dst: Box}, pieceToPromoteTo?: Piece): { gameState: GameState, capturedPiece: Piece, wasPromotion: boolean } => ({ gameState, capturedPiece: <Piece>(new EmptyPiece), wasPromotion: false }),
};
PieceGameLogic.convertGSBoardToPieceBoard = (gameState: GameState): Array<Array<Piece>> => {
  const pieceBoard = [];
  for (let i = 0; i < gameState.rankCount; i++) {
    pieceBoard.push([]);
    for (let j = 0; j < gameState.fileCount; j++) {
      pieceBoard[i].push(PieceGameLogic.getType(gameState.getEncoding({ r: i, c: j })));
    }
  }
  return pieceBoard;
};
PieceGameLogic.convertPieceToStringEncoding = (piece: Piece, timesMoved = 0): string => {
    let encoding = '';
    if (piece instanceof Pawn) {
      if (piece.color === 'white') encoding = 'P';
      else encoding = 'p';
    }
    if (piece instanceof Rook) {
      if (piece.color === 'white') encoding = 'R';
      else encoding = 'r';
    }
    if (piece instanceof Knight) {
      if (piece.color === 'white') encoding = 'H';
      else encoding = 'h';
    }
    if (piece instanceof Bishop) {
      if (piece.color === 'white') encoding = 'B';
      else encoding = 'b';
    }
    if (piece instanceof Queen) {
      if (piece.color === 'white') encoding = 'Q';
      else encoding = 'q';
    }
    if (piece instanceof King) {
      if (piece.color === 'white') encoding = 'K';
      else encoding = 'k';
    }
    encoding = encoding ? encoding+timesMoved : encoding;
    return encoding;
}
PieceGameLogic.getType = (s: string): Piece => {
  if (s.trim() === '') return new EmptyPiece;
  let codeMatch: Array<any> = s.match(/([a-zA-z])(\d*)/);
  let numMoves: number = codeMatch && codeMatch.length > 2 ? Number(codeMatch[2]) : undefined;
  let alphacode: string = codeMatch.length > 1 ? codeMatch[1] : undefined;
  if (numMoves === undefined || alphacode === undefined) return new EmptyPiece;
  switch (alphacode.trim()) {
    case 'p':
      return new Pawn('black');
    case 'r':
      return new Rook('black');
    case 'h':
      return new Knight('black');
    case 'b':
      return new Bishop('black');
    case 'q':
      return new Queen('black');
    case 'k':
      const blackking = new King('black', PieceGameLogic.kingCanCastleWithGivenRook);
      return blackking;
    case 'P':
    return new Pawn('white');
    case 'R':
      return new Rook('white');
    case 'H':
      return new Knight('white');
    case 'B':
      return new Bishop('white');
    case 'Q':
      return new Queen('white');
    case 'K':
      const whiteking = new King('white', PieceGameLogic.kingCanCastleWithGivenRook);
      return whiteking;
    case '':
      return new EmptyPiece;
    default:
      return new EmptyPiece;
    }
};
/**
 * @todo handle error case where code doesn't match in more meaningful way, better for testing.
 */
PieceGameLogic.getNumMoves = (s: string): number => {
  const codeMatch: Array<string> = s.match(/([a-zA-z])(\d*)/);
  const numMoves: number = codeMatch && codeMatch.length > 2 && !Number.isNaN(Number(codeMatch[2])) ? Number(codeMatch[2]) : -1; // -1 should never happen, though.
  return numMoves;
};
PieceGameLogic.getPossiblePiecesToPromoteTo = (gameState: GameState, src: Box): Array<Box> => {
  const validPromotions: Array<Box> = [];
  const promotableBox = PieceGameLogic.getBoxOfPromotablePieceIfPossible(gameState);
  if (promotableBox !== undefined) {
    const srcPiece = PieceGameLogic.getType(gameState.getEncoding(src));
    for (let i = 0; i < gameState.rankCount; i++)
      for (let j = 0; j < gameState.fileCount; j++) {
        const box = { r: i, c: j };
        const otherPiece = PieceGameLogic.getType(gameState.getEncoding({r: i, c: j}));
        if (srcPiece.color === otherPiece.color
            && !(otherPiece instanceof Pawn) && !(otherPiece instanceof King) && !(otherPiece instanceof EmptyPiece))
              validPromotions.push(box);
      }
  }
  return validPromotions;
}
PieceGameLogic.getPossibleMoves = (gameState: GameState, src: Box, prevMove?: { src: Box, dst: Box }): Array<Box> => {
  const possiblePromotionMoves = PieceGameLogic.getPossiblePiecesToPromoteTo(gameState, src);
  if (possiblePromotionMoves.length > 0) return possiblePromotionMoves;
  const constructMovesMatrix = (gameState: GameState, src: Box, PieceType: Piece, numMoves: number) => {
    const validMoves: Array<Box> = [];
    const isPossibleToMoveTo = typeof PieceType.getPossibleMoves == 'function' ? PieceType.getPossibleMoves(gameState, src, numMoves) : (dst: Box)=>false;
    if (!isPossibleToMoveTo) return validMoves;
    for (let i = 0; i < gameState.rankCount; i++)
      for (let j = 0; j < gameState.fileCount; j++)
         if (isPossibleToMoveTo({r:i,c:j})) validMoves.push({r:i,c:j});
    return validMoves;
  }
  const s = gameState.getEncoding(src);
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  if (PieceType && !isNaN(numMoves)) {
    const movesMatrix = constructMovesMatrix(gameState, src, PieceType, numMoves);
    if (PieceGameLogic.getType(gameState.getEncoding(src)) instanceof King) {
      if (PieceGameLogic.kingCanCastleWithGivenRook(gameState, src, { r: src.r, c: 0 })) {
        movesMatrix.push({ r: src.r, c: 0 });
      }
      if (PieceGameLogic.kingCanCastleWithGivenRook(gameState, src, { r: src.r, c: gameState.fileCount - 1 })) {
        movesMatrix.push({ r: src.r, c: gameState.fileCount - 1 });
      }
    }
    if (PieceGameLogic.getType(gameState.getEncoding(src)) instanceof Pawn) {
      if (prevMove === undefined) {
         if (process.env.NODE_ENV !== 'TEST') console.warn('PieceGameLogic.getPossibleMoves should be passed prevMove as last parameter! Please refactor, else En Passante will not work.');
      } else if (PieceGameLogic.isEnPassantPossible(gameState, src, prevMove)) {
        const dir = prevMove.dst.c - prevMove.src.c > 0 ? 1 : -1;
        movesMatrix.push({ r: src.r + dir, c: prevMove.dst.c });
      }
    }
    return movesMatrix;
  }
  return [];
};
PieceGameLogic.isPossibleToMoveTo = (gameState: GameState,  src: Box): { (box: Box): boolean } => {
  const s = gameState.getEncoding(src);
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  const isPossibleToMoveTo = PieceType.getPossibleMoves(gameState, src);
  return isPossibleToMoveTo;
};
PieceGameLogic.isInCheck = (gameState: GameState, src: Box): boolean => {
  for (let i = 0; i < gameState.rankCount; i++)
    for (let j = 0; j < gameState.fileCount; j++)
      if (src.r != i && src.c != j) {
        const possibleAttacks = PieceGameLogic.getPossibleMoves(gameState, {r:i,c:j});
        // console.log(`PieceGameLogic.isInCheck possibleAttacks piece at (${i},${j})`, possibleAttacks);
        for (let k = 0; k < possibleAttacks.length; k++) {
          if (possibleAttacks[k].r==src.r && possibleAttacks[k].c==src.c) return true;
        }
      }
  return false;
};
PieceGameLogic.isInCheckmate = (gameState: GameState, src: Box): boolean => {
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState, src);
  let pieceIsInCheck = PieceGameLogic.isInCheck(gameState, src);
  if (pieceIsInCheck) {
    let isInCheckmate = true; // use reduce
    for (let i = 0; i < possibleMoves.length; i++)
      isInCheckmate = isInCheckmate && PieceGameLogic.isInCheck(gameState, possibleMoves[i]);
    if (isInCheckmate) return true;
  }
  return false;
};
PieceGameLogic.kingCanCastleWithGivenRook = (gameState: GameState, src: Box, dst: Box): boolean => {
  const s = gameState.getEncoding(src);
  const t = gameState.getEncoding(dst);
  if (PieceGameLogic.getType(s).name != (new King('')).name || PieceGameLogic.getType(t).name != (new Rook('')).name || PieceGameLogic.getNumMoves(s) != 0 || PieceGameLogic.getNumMoves(t) != 0) return false;
  if (PieceHelper.isPieceOfCurrentPlayer(gameState, src) && PieceHelper.isPieceOfCurrentPlayer(gameState, dst) && PieceHelper.isBoxOnBoard(gameState, dst) && src != dst) {
    let dir = dst.c - src.c > 0 ? 1 : -1;
    let len = Math.abs(dst.c-src.c);
    for (let i = src.c+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState, {r:src.r,c:i})) return false;
    return true;
  }
};
/**
 * @returns {GameState} Updated GameState with King's castle.
 */
PieceGameLogic.castleKingWithGivenRook = (gameState: GameState, src: Box, dst: Box): GameState => {
  if (!PieceGameLogic.kingCanCastleWithGivenRook(gameState, src, dst)) return gameState;
  const newBoard = new Board(gameState.board);
  newBoard.setEncoding(src, PieceGameLogic.incrementMoveCount(gameState.getEncoding(src)));
  let outDir = dst.c - src.c > 0 ? 1 : -1;
  let shift = 0;
  if (Math.abs(dst.c - src.c) == 3) shift = 2;
  else if (Math.abs(dst.c - src.c) == 4) shift = 3;
  newBoard.setEncoding({r: src.r, c: src.c + outDir * shift }, gameState.getEncoding(src));
  newBoard.setEncoding(src, ' ');
  newBoard.setEncoding({ r: dst.r, c: dst.c - outDir * shift }, gameState.getEncoding(dst));
  newBoard.setEncoding(dst, ' ');
  return new GameState(newBoard);
};
PieceGameLogic.getSetOfAllPossibleMovesForPlayer = (gameState: GameState, player: number): Set<Box> => {
  let s = new Set();
  for (let i = 0; i < gameState.rankCount; i++)
    for (let j = 0; j < gameState.fileCount; j++)
      if (!PieceHelper.isPieceOfGivenPlayer(gameState, player,{r:i,c:j}) && !PieceHelper.isEmpty(gameState, {r:i,c:j})) {
        const possiblePlayerMoves = PieceGameLogic.getPossibleMoves(gameState, {r:i,c:j});
        for (let k = 0; k < possiblePlayerMoves.length; k++)
          s.add(possiblePlayerMoves[k]);
      }
  return s;
};
/**
 * @todo not this simple, should prioritize kill-moves and moves that get the player out of harm (in next move only, for now)
 */
PieceGameLogic.randomDefensiveMove = (gameState: GameState): Set<Box> => {
  const currentPlayer = gameState.player;
  const opponent = currentPlayer == 0 ? 1 : 0;
  const setOfOpponentMoves = PieceGameLogic.getSetOfAllPossibleMovesForPlayer(gameState, opponent);
  let randIdx = 0;
  return setOfOpponentMoves;
};
PieceGameLogic.isACapture = (gameState: GameState, src: Box, dst: Box): boolean => {
  const s = gameState.getEncoding(src);
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  if (typeof PieceType.getPossibleMoves == 'function' && !isNaN(numMoves)) {
    const isPossibleToMoveTo = PieceType.getPossibleMoves(gameState, src, numMoves);
    if (isPossibleToMoveTo(dst) && !PieceHelper.isPieceOfCurrentPlayer(gameState, dst) && !PieceHelper.isEmpty(gameState, dst)) return true;
  }
  return false;
};
/**
 * @param src the box to check if possible to EnPassant from
 * @param prevMove the previous move played, which is usually the opponent to the piece at src.
 */
PieceGameLogic.isEnPassantPossible = (gameState: GameState, src: Box, prevMove: {src: Box, dst: Box}): boolean => {
  const opponentStart = prevMove.dst.r - prevMove.src.r > 0 ? 1 : 6;
  const dir = prevMove.dst.r - prevMove.src.r > 0 ? 1 : -1;
  const piece = PieceGameLogic.getType(gameState.getEncoding(src));
  if (piece instanceof Pawn
      && Math.abs(prevMove.dst.r - prevMove.src.r) === 2
      && prevMove.dst.r === src.r
      && opponentStart === prevMove.src.r /* shouldn't happen under normal Pawn rules */
      && PieceGameLogic.getType(gameState.getEncoding(prevMove.dst)) instanceof Pawn
      && !PieceHelper.isPieceOfCurrentPlayer(gameState, prevMove.dst)) {
      return true;
  }
  return false;
};
PieceGameLogic.getBoxOfPromotablePieceIfPossible = (gameState: GameState): Box => {
  const pawnAtColumnBorder = (borderIdx: number): Box => {
    for (let i = 0; i < gameState.rankCount; i++)
      if (PieceGameLogic.getType(gameState.getEncoding({r: borderIdx, c: i})) instanceof Pawn)
        return {r: borderIdx, c: i};
  };
  return pawnAtColumnBorder(0) || pawnAtColumnBorder(gameState.rankCount - 1);
};
/**
 * @param first box of piece (ie pawn) to promote
 * @param second piece (ie not pawn and not king and not non-piece) to promote to
 */
PieceGameLogic.promoteIfPossible = (gameState: GameState, first: Box, second: Piece): GameState => {
  const promotableBox = PieceGameLogic.getBoxOfPromotablePieceIfPossible(gameState);
  const newBoard = new Board(gameState.board);
  if (promotableBox !== undefined && promotableBox.r === first.r && promotableBox.c === first.c
      && !(second instanceof Pawn) && !(second instanceof King) && !(second instanceof EmptyPiece)
      && PieceGameLogic.getType(gameState.getEncoding(first)).color === second.color)
      newBoard.setEncoding(first, PieceGameLogic.convertPieceToStringEncoding(second));
  return new GameState(newBoard);
};
PieceGameLogic.incrementMoveCount = (enc: string): string => {
  const prefix = enc.trim().match(/\w/g) ? enc.trim().match(/\w/g)[0] : '';
  const num = enc.trim().match(/(\d+)/g) ? Number(enc.trim().match(/(\d+)/g)[0]) : 0;
  return prefix + Number(num + 1);
};
/**
 * @description Attempt to make the desired move, if the move is legal.
 */
PieceGameLogic.makeLegalMove = (gameState: GameState, src: Box, dst: Box, prevMove: {src: Box, dst: Box}, pieceToPromoteTo?: Piece): { gameState: GameState, capturedPiece: Piece, wasPromotion: boolean } => {
  const promotableBox = PieceGameLogic.getBoxOfPromotablePieceIfPossible(gameState);
  if (promotableBox !== undefined) {
    if (pieceToPromoteTo === undefined) {
      pieceToPromoteTo = PieceGameLogic.getType(gameState.getEncoding(dst));
    }
    return { gameState: PieceGameLogic.promoteIfPossible(gameState, src, pieceToPromoteTo), capturedPiece: new EmptyPiece, wasPromotion: true };
  }
  if (PieceGameLogic.kingCanCastleWithGivenRook(gameState, src, dst)) {
    return { gameState: PieceGameLogic.castleKingWithGivenRook(gameState, src, dst), capturedPiece: new EmptyPiece, wasPromotion: false };
  }
  const moveAndUpdateState = (enPassant?: Box): { gameState: GameState, capturedPiece: Piece, wasPromotion: boolean } => {
    const capturedPiece = enPassant ? PieceGameLogic.getType(gameState.getEncoding(enPassant)) : PieceGameLogic.getType(gameState.getEncoding(dst));
    const newBoard = new Board(gameState.board);
    if (enPassant) newBoard.setEncoding(enPassant, ' ');
    newBoard.setEncoding(dst, PieceGameLogic.incrementMoveCount(gameState.getEncoding(src)));
    newBoard.setEncoding(src, ' ');
    return { gameState: new GameState(newBoard), capturedPiece, wasPromotion: false };
  };
  if (PieceGameLogic.isEnPassantPossible(gameState, src, prevMove)) {
    const dir = prevMove.dst.r - prevMove.src.r > 0 ? -1 : 1;
    const box = { r: src.r + dir, c: prevMove.dst.c };
    if (dst.r === box.r && dst.c === box.c) {
      return moveAndUpdateState(prevMove.dst);
    }
  }
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState, src, prevMove);
  for (let i = 0; i < possibleMoves.length; i++) {
    const box: Box = possibleMoves[i];
    if (dst.r === box.r && dst.c === box.c
        && !PieceHelper.isPieceOfCurrentPlayer(gameState, dst)) {
          return moveAndUpdateState();
        }
  }
  return { gameState, capturedPiece: new EmptyPiece, wasPromotion: false };
};
export { PieceGameLogic };
