var gameState = {};
gameState.board = [
  ['R','H','B','Q','K','B','H','R'], // upper case: black pieces
  ['P','P','P','P','P','P','P','P'],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  [' ',' ',' ',' ',' ',' ',' ',' '],
  ['p','p','p','p','p','p','p','p'], // lower case: white pieces
  ['r','h','b','q','k','b','h','r'] ];
gameState.board.rowLength = 8; // yes, I am adding properties to the prototype of this particular Array.
gameState.board.colLength = 8;
gameState.playerWhite = 0;
gameState.playerBlack = 1;
gameState.player = gameState.playerWhite;
gameState.status = 'playing';
gameState.winner = '';
gameState.tie = '';

const isLegalMoveForPiece = (src,dst) => true;
const requestValidSrcOnClick = src => isPieceOfCurrentPlayer(src);
const requestValidDstOnClick = (src,dst) => !isPieceOfCurrentPlayer(dst) && isLegalMoveForPiece(src,dst);
const requestValidMove = (src,dst) => true;
const updateGameState = (src,dst) => false;

const handleGameState = () => {};

// game loop
while (true) {
  var src = {c:0,r:6};
  var dst = {c:0,r:4};
  // var src = requestValidSrcOnClick(); // shall wait for user input
  // var dst = requestValidDstOnClick(); // shall wait for user input

  // @todo: on front-end: add unselect button by clicking same button to toggle selected pos

  if (requestValidMove(src, dst)) updateGameState(src, dst); // move piece, toggle player
  else handleInvalidMove(src, dst);
  handleGameState();
  if (gameState.status == 'gameover') break;
}
