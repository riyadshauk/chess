let PieceHelper = {};
PieceHelper.isEmpty = (gameState,{c: c, r: r} = box) => {
  return !gameState.board[r][c].trim();
}
PieceHelper.isPieceOfGivenPlayer = (gameState,player,box) => {
  const s = gameState.board[box.r][box.c];
  let codeMatch = s.match(/([a-zA-z])(\d*)/);
  let alphacode = codeMatch.length > 1 ? codeMatch[1] : null;
  if (!alphacode) return false;
  if ((player == 0 && alphacode == alphacode.toUpperCase()) || (player == 1 && alphacode == alphacode.toLowerCase())) return true;
  return false;
}
PieceHelper.bothPiecesBelongToSamePlayer = (gameState,box1,box2) => {
  if (gameState.board[box1.r][box1.c].trim() == '' || gameState.board[box2.r][box2.c].trim() == '') return false; // strictly defined this way.
  const box1IsLowerCase = gameState.board[box1.r][box1.c] == gameState.board[box1.r][box1.c].toLowerCase() ? true : false;
  const box2IsLowerCase = gameState.board[box2.r][box2.c] == gameState.board[box2.r][box2.c].toLowerCase() ? true : false;
  return box1IsLowerCase == box2IsLowerCase;
}
PieceHelper.isPieceOfCurrentPlayer = (gameState,box) => {
  const checkParticularPlayer = (playerCase,{c: c, r: r} = box) =>
    (gameState.board[r][c] == playerCase.apply(gameState.board[r][c])) && !PieceHelper.isEmpty(gameState,box);
  return gameState.player == gameState.playerWhite ?
    checkParticularPlayer(String.prototype.toUpperCase) : checkParticularPlayer(String.prototype.toLowerCase);
}
PieceHelper.isBoxOnBoard = (gameState,box) => box.r < gameState.board.rowLength && box.c < gameState.board.colLength;
PieceHelper.isValidSourceAndDest = (gameState,src,dst) =>
  PieceHelper.isPieceOfCurrentPlayer(gameState,src) && PieceHelper.isBoxOnBoard(gameState,dst) && !PieceHelper.bothPiecesBelongToSamePlayer(gameState,src,dst) && src != dst;
PieceHelper.canGoAlongLineToDest = (gameState,srcA,srcB,dstA,dstC) => canGoAlongColToDest(gameState,src,dst) || canGoAlongRowToDest(gameState,src,dst);
PieceHelper.canGoAlongRowToDest = (gameState,src,dst) => {
  if (src.r == dst.r) {
    const dir = dst.c > src.c ? 1 : -1;
    let len = Math.abs(dst.c-src.c);
    for (let i = src.c+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState,{r:src.r,c:i})) return false;
    return true;
  }
  return false;
}
PieceHelper.canGoAlongColToDest = (gameState,src,dst) => {
  if (src.c == dst.c) {
    const dir = dst.r > src.r ? 1 : -1;
    let len = Math.abs(dst.r-src.r);
    for (let i = src.r+dir; len-- > 1; i += dir) if (!PieceHelper.isEmpty(gameState,{r:i,c:src.c})) return false;
    return true;
  }
  return false;
}
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
module.exports = PieceHelper;
