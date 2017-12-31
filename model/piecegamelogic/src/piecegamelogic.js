const PieceHelper = require('../../piece/src/piecehelper.js');
const Pawn = require('../../piece/src/pawn.js');
const Rook = require('../../piece/src/rook.js');
const Horse = require('../../piece/src/horse.js');
const Bishop = require('../../piece/src/bishop.js');
const Queen = require('../../piece/src/queen.js');
const King = require('../../piece/src/king.js');
var PieceGameLogic = {};
PieceGameLogic.getType = s => {
  var codeMatch = s.match(/([a-zA-z])(\d*)/);
  var numMoves = codeMatch && codeMatch.length > 2 ? codeMatch[2] : null;
  if (!numMoves) return []; // no possible moves
  var alphacode = codeMatch.length > 1 ? codeMatch[1] : null;
  if (!alphacode) return null; // should cause failure
  switch (alphacode.toLowerCase().trim()) {
    case 'p':
      return Pawn;
    case 'r':
      return Rook;
    case 'h':
      return Horse;
    case 'b':
      return Bishop;
    case 'q':
      return Queen;
    case 'k':
      return King;
    case '':
      return '';
    default:
      return null; // should cause failure in some cases
    }
}
PieceGameLogic.getNumMoves = s => {
  var codeMatch = s.match(/([a-zA-z])(\d*)/);
  var numMoves = codeMatch && codeMatch.length > 2 ? codeMatch[2] : null;
  return numMoves; // should cause failure iff numMoves is null
}
PieceGameLogic.getPossibleMoves = (gameState,src) => {
  const constructMovesMatrix = (gameState,src,PieceType,numMoves) => {
    var validMoves = [];
    const isPossibleToMoveTo = typeof PieceType.getPossibleMoves == 'function' ? PieceType.getPossibleMoves(gameState,src,numMoves) : null;
    if (!isPossibleToMoveTo) return validMoves;
    for (var i = 0; i < gameState.board.length; i++)
      for (var j = 0; j < gameState.board[0].length; j++)
        if (isPossibleToMoveTo({r:i,c:j})) validMoves.push({r:i,c:j});
    return validMoves;
  }
  const s = gameState.board[src.r][src.c];
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  if (PieceType && !isNaN(numMoves)) return constructMovesMatrix(gameState,src,PieceType,numMoves)
  else if (PieceType == '') return []; // may be an empty piece, so don't wan't failure
  else if (PieceType == null) return null; // should cause failure
}

// Game Logic for pieces
PieceGameLogic.isInCheck = (gameState,src) => {
  for (var i = 0; i < gameState.board.length; i++)
    for (var j = 0; j < gameState.board[0].length; j++)
      if (src.r != i && src.c != j) {
        const possibleAttacks = PieceGameLogic.getPossibleMoves(gameState,{r:i,c:j});
        for (var k = 0; k < possibleAttacks.length; k++) {
          if (possibleAttacks[k].r==src.r && possibleAttacks[k].c==src.c) return true;
        }
      }
  return false;
}
PieceGameLogic.isInCheckmate = (gameState,src) => {
  const possibleMoves = PieceGameLogic.getPossibleMoves(gameState,src);
  var pieceIsInCheck = PieceGameLogic.isInCheck(gameState,src);
  if (pieceIsInCheck) {
    var isInCheckmate = true; // use reduce
    for (var i = 0; i < possibleMoves.length; i++)
      isInCheckmate = isInCheckmate && PieceGameLogic.isInCheck(gameState,possibleMoves[i]);
    if (isInCheckmate) return true;
  }
  return false;
}
PieceGameLogic.kingCanCastleWithGivenRook = (gameState,src,dst) => {
  const s = gameState.board[src.r][src.c];
  const t = gameState.board[dst.r][dst.c];
  if (PieceGameLogic.getType(s) != King || PieceGameLogic.getType(t) != Rook || PieceGameLogic.getNumMoves(s) != 0 || PieceGameLogic.getNumMoves(t) != 0) return false;
  var dir = dst.c - src.c > 0 ? 1 : -1;
  var len = Math.abs(dst.c-src.c);
  for (var i = src.c+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState,{r:src.r,c:i})) return false;
  return true;
}
PieceGameLogic.getSetOfAllPossibleMovesForPlayer = (gameState,player) => {
  var s = new Set();
  for (var i = 0; i < gameState.board.length; i++)
    for (var j = 0; j < gameState.board[0].length; j++)
      if (!PieceHelper.isPieceOfGivenPlayer(gameState,player,{r:i,c:j}) && !PieceHelper.isEmpty(gameState,{r:i,c:j})) {
        const possiblePlayerMoves = PieceGameLogic.getPossibleMoves(gameState,{r:i,c:j});
        for (var k = 0; k < possiblePlayerMoves.length; k++)
          s.add(possiblePlayerMoves[k]);
      }
  return s;
}
PieceGameLogic.randomDefensiveMove = (gameState) => {
  // @todo, not this simple, should prioritize kill-moves and moves that get the player out of harm (in next move only, for now)
  const currentPlayer = gameState.player;
  const opponent = currentPlayer == 0 ? 1 : 0;
  const setOfOpponentMoves = PieceGameLogic.getSetOfAllPossibleMovesForPlayer(gameState,opponent);
  var randIdx = 0;
  return setOfOpponentMoves[randIdx];
}

// game-flow / state-related logic for pieces
PieceGameLogic.isACapture = (gameState,src,dst) => {
  const s = gameState.board[src.r][src.c];
  const numMoves = PieceGameLogic.getNumMoves(s);
  const PieceType = PieceGameLogic.getType(s);
  if (typeof PieceType.getPossibleMoves == 'function' && !isNaN(numMoves)) {
    const isPossibleToMoveTo = PieceType.getPossibleMoves(gameState,src,numMoves);
    if (isPossibleToMoveTo(dst) && !PieceHelper.bothPiecesBelongToSamePlayer(gameState,src,dst) && !PieceHelper.isEmpty(gameState,dst)) return true;
  }
  return false;
}
module.exports = PieceGameLogic;
