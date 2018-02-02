var module$src$box = {}, Box$$module$src$box;
function emptyBox$$module$src$box($pos$$) {
  return {pos:$pos$$, r:Math.trunc($pos$$ / 8), c:$pos$$ % 8, piece:null, selected:!1, possibleDest:!1};
}
var Location$$module$src$box, Piece$$module$src$box;
function initializePiece$$module$src$box($title$$) {
  return {title:$title$$, timesMoved:0, capturedIdx:-1, selectedCapture:!1};
}
var Player$$module$src$box, WHITE_PLAYER$$module$src$box = 0, BLACK_PLAYER$$module$src$box = 1, Board$$module$src$box;
module$src$box.emptyBox = emptyBox$$module$src$box;
module$src$box.initializePiece = initializePiece$$module$src$box;
module$src$box.WHITE_PLAYER = WHITE_PLAYER$$module$src$box;
module$src$box.BLACK_PLAYER = BLACK_PLAYER$$module$src$box;
var module$__$model$box = {}, Box$$module$__$model$box;
var module$__$model$piece$src$piece = {}, Piece$$module$__$model$piece$src$piece, emptyPiece$$module$__$model$piece$src$piece = {getPossibleMoves:function($dst$$) {
  return !1;
}}, PieceHelper$$module$__$model$piece$src$piece, emptyPieceHelper$$module$__$model$piece$src$piece = {isEmpty:function() {
  return null;
}, isPieceOfGivenPlayer:function() {
  return null;
}, bothPiecesBelongToSamePlayer:function() {
  return null;
}, isPieceOfCurrentPlayer:function() {
  return null;
}, isBoxOnBoard:function() {
  return null;
}, isValidSourceAndDest:function() {
  return null;
}, canGoAlongRowToDest:function() {
  return null;
}, canGoAlongColToDest:function() {
  return null;
}, canGoAlongLineToDest:function() {
  return null;
}, canGoAlongDiagonalToDest:function() {
  return null;
}};
module$__$model$piece$src$piece.emptyPiece = emptyPiece$$module$__$model$piece$src$piece;
module$__$model$piece$src$piece.emptyPieceHelper = emptyPieceHelper$$module$__$model$piece$src$piece;
var module$__$model$gamestate = {}, GameState$$module$__$model$gamestate;
function initialGameState$$module$__$model$gamestate() {
  return {board:["r0 h0 b0 q0 k0 b0 h0 r0".split(" "), "p0 p0 p0 p0 p0 p0 p0 p0".split(" "), "        ".split(""), "        ".split(""), "        ".split(""), "        ".split(""), "P0 P0 P0 P0 P0 P0 P0 P0".split(" "), "R0 H0 B0 Q0 K0 B0 H0 R0".split(" ")], numRows:8, numCols:8, playerWhite:0, playerBlack:1, player:0};
}
module$__$model$gamestate.initialGameState = initialGameState$$module$__$model$gamestate;
var module$__$model$piece$src$piecehelper = {}, PieceHelper$$module$__$model$piece$src$piecehelper = module$__$model$piece$src$piece.emptyPieceHelper;
PieceHelper$$module$__$model$piece$src$piecehelper.getNumMoves = function $PieceHelper$$module$__$model$piece$src$piecehelper$getNumMoves$($gameState$$, $box$$) {
  var $codeMatch$$ = $gameState$$.board[$box$$.r][$box$$.c].match(/([a-zA-z])(\d*)/);
  return $codeMatch$$ && 2 < $codeMatch$$.length && !isNaN($codeMatch$$[2]) ? Number($codeMatch$$[2]) : -1;
};
PieceHelper$$module$__$model$piece$src$piecehelper.isEmpty = function $PieceHelper$$module$__$model$piece$src$piecehelper$isEmpty$($gameState$$, $box$$) {
  return "" === $gameState$$.board[$box$$.r][$box$$.c].trim();
};
PieceHelper$$module$__$model$piece$src$piecehelper.isPieceOfGivenPlayer = function $PieceHelper$$module$__$model$piece$src$piecehelper$isPieceOfGivenPlayer$($alphacode_codeMatch$$1_gameState$$, $player$$, $box$$) {
  $alphacode_codeMatch$$1_gameState$$ = $alphacode_codeMatch$$1_gameState$$.board[$box$$.r][$box$$.c].match(/([a-zA-z])(\d*)/);
  return ($alphacode_codeMatch$$1_gameState$$ = 1 < $alphacode_codeMatch$$1_gameState$$.length ? $alphacode_codeMatch$$1_gameState$$[1] : null) ? 0 == $player$$ && $alphacode_codeMatch$$1_gameState$$ == $alphacode_codeMatch$$1_gameState$$.toUpperCase() || 1 == $player$$ && $alphacode_codeMatch$$1_gameState$$ == $alphacode_codeMatch$$1_gameState$$.toLowerCase() ? !0 : !1 : !1;
};
PieceHelper$$module$__$model$piece$src$piecehelper.isPieceOfCurrentPlayer = function $PieceHelper$$module$__$model$piece$src$piecehelper$isPieceOfCurrentPlayer$($gameState$$, $box$$) {
  var $checkParticularPlayer$$ = function $$checkParticularPlayer$$$($playerCase$$, $$jscomp$destructuring$var2$$) {
    var $$jscomp$destructuring$var3_r$$ = void 0 === $$jscomp$destructuring$var2$$ ? $box$$ : $$jscomp$destructuring$var2$$, $c$$ = $$jscomp$destructuring$var3_r$$.c, $$jscomp$destructuring$var3_r$$ = $$jscomp$destructuring$var3_r$$.r;
    return $gameState$$.board[$$jscomp$destructuring$var3_r$$][$c$$] == $playerCase$$.apply($gameState$$.board[$$jscomp$destructuring$var3_r$$][$c$$]) && !PieceHelper$$module$__$model$piece$src$piecehelper.isEmpty($gameState$$, $box$$);
  };
  return $gameState$$.player == $gameState$$.playerWhite ? $checkParticularPlayer$$(String.prototype.toUpperCase) : $checkParticularPlayer$$(String.prototype.toLowerCase);
};
PieceHelper$$module$__$model$piece$src$piecehelper.isBoxOnBoard = function $PieceHelper$$module$__$model$piece$src$piecehelper$isBoxOnBoard$($gameState$$, $box$$) {
  return $box$$.r < $gameState$$.numRows && 0 <= $box$$.r && 0 <= $box$$.c && $box$$.c < $gameState$$.numCols;
};
PieceHelper$$module$__$model$piece$src$piecehelper.isValidSourceAndDest = function $PieceHelper$$module$__$model$piece$src$piecehelper$isValidSourceAndDest$($gameState$$, $src$$, $dst$$) {
  return PieceHelper$$module$__$model$piece$src$piecehelper.isPieceOfCurrentPlayer($gameState$$, $src$$) && !PieceHelper$$module$__$model$piece$src$piecehelper.isPieceOfCurrentPlayer($gameState$$, $dst$$) && PieceHelper$$module$__$model$piece$src$piecehelper.isBoxOnBoard($gameState$$, $dst$$) && $src$$ != $dst$$;
};
PieceHelper$$module$__$model$piece$src$piecehelper.canGoAlongRowToDest = function $PieceHelper$$module$__$model$piece$src$piecehelper$canGoAlongRowToDest$($gameState$$, $src$$, $dst$$) {
  if ($src$$.r == $dst$$.r) {
    var $dir$$ = $dst$$.c > $src$$.c ? 1 : -1;
    $dst$$ = Math.abs($dst$$.c - $src$$.c);
    for (var $i$$ = $src$$.c + $dir$$;1 < $dst$$--;$i$$ += $dir$$) {
      if (!PieceHelper$$module$__$model$piece$src$piecehelper.isEmpty($gameState$$, {r:$src$$.r, c:$i$$})) {
        return !1;
      }
    }
    return !0;
  }
  return !1;
};
PieceHelper$$module$__$model$piece$src$piecehelper.canGoAlongColToDest = function $PieceHelper$$module$__$model$piece$src$piecehelper$canGoAlongColToDest$($gameState$$, $src$$, $dst$$3_len$$) {
  if ($src$$.c == $dst$$3_len$$.c) {
    var $dir$$ = $dst$$3_len$$.r > $src$$.r ? 1 : -1;
    $dst$$3_len$$ = Math.abs($dst$$3_len$$.r - $src$$.r);
    for (var $i$$ = $src$$.r + $dir$$;1 < $dst$$3_len$$--;$i$$ += $dir$$) {
      if (!PieceHelper$$module$__$model$piece$src$piecehelper.isEmpty($gameState$$, {r:$i$$, c:$src$$.c})) {
        return !1;
      }
    }
    return !0;
  }
  return !1;
};
PieceHelper$$module$__$model$piece$src$piecehelper.canGoAlongLineToDest = function $PieceHelper$$module$__$model$piece$src$piecehelper$canGoAlongLineToDest$($gameState$$, $src$$, $dst$$) {
  return PieceHelper$$module$__$model$piece$src$piecehelper.canGoAlongColToDest($gameState$$, $src$$, $dst$$) || PieceHelper$$module$__$model$piece$src$piecehelper.canGoAlongRowToDest($gameState$$, $src$$, $dst$$);
};
PieceHelper$$module$__$model$piece$src$piecehelper.canGoAlongDiagonalToDest = function $PieceHelper$$module$__$model$piece$src$piecehelper$canGoAlongDiagonalToDest$($gameState$$, $j_src$$, $colDir_dst$$) {
  if (1 != Math.abs(($colDir_dst$$.r - $j_src$$.r) / ($colDir_dst$$.c - $j_src$$.c))) {
    return !1;
  }
  var $len$$ = Math.abs($colDir_dst$$.c - $j_src$$.c), $rowDir$$ = 0 < $colDir_dst$$.r - $j_src$$.r ? 1 : -1;
  $colDir_dst$$ = 0 < $colDir_dst$$.c - $j_src$$.c ? 1 : -1;
  var $i$$ = $j_src$$.r + $rowDir$$;
  for ($j_src$$ = $j_src$$.c + $colDir_dst$$;1 < $len$$--;$i$$ += $rowDir$$, $j_src$$ += $colDir_dst$$) {
    if (!PieceHelper$$module$__$model$piece$src$piecehelper.isEmpty($gameState$$, {r:$i$$, c:$j_src$$})) {
      return !1;
    }
  }
  return !0;
};
module$__$model$piece$src$piecehelper.PieceHelper = PieceHelper$$module$__$model$piece$src$piecehelper;
var module$__$model$piece$src$queen = {}, Queen$$module$__$model$piece$src$queen = function $Queen$$module$__$model$piece$src$queen$() {
  this.name = "queen";
};
Queen$$module$__$model$piece$src$queen.prototype.getPossibleMoves = function $Queen$$module$__$model$piece$src$queen$$getPossibleMoves$($gameState$$, $src$$, $numMoves$$) {
  return function($dst$$) {
    return module$__$model$piece$src$piecehelper.PieceHelper.isValidSourceAndDest($gameState$$, $src$$, $dst$$) ? module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongRowToDest($gameState$$, $src$$, $dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongColToDest($gameState$$, $src$$, $dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongDiagonalToDest($gameState$$, $src$$, $dst$$) : !1;
  };
};
module$__$model$piece$src$queen["default"] = Queen$$module$__$model$piece$src$queen;
var module$__$model$piece$src$king = {}, King$$module$__$model$piece$src$king = function $King$$module$__$model$piece$src$king$($specialMoves$$) {
  this.name = "king";
  this.getPossibleSpecialMoves = $specialMoves$$;
};
King$$module$__$model$piece$src$king.prototype.getPossibleMoves = function $King$$module$__$model$piece$src$king$$getPossibleMoves$($gameState$$, $src$$, $numMoves$$) {
  var $$jscomp$this$$ = this;
  return function($dst$$) {
    return !module$__$model$piece$src$piecehelper.PieceHelper.isValidSourceAndDest($gameState$$, $src$$, $dst$$) || 1 != Math.abs($dst$$.c - $src$$.c) && 1 != Math.abs($dst$$.r - $src$$.r) ? $$jscomp$this$$.getPossibleSpecialMoves($gameState$$, $src$$, $dst$$) : module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongRowToDest($gameState$$, $src$$, $dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongColToDest($gameState$$, $src$$, $dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongDiagonalToDest($gameState$$, 
    $src$$, $dst$$);
  };
};
module$__$model$piece$src$king["default"] = King$$module$__$model$piece$src$king;
var module$__$model$piece$src$rook = {}, Rook$$module$__$model$piece$src$rook = function $Rook$$module$__$model$piece$src$rook$() {
  this.name = "rook";
};
Rook$$module$__$model$piece$src$rook.prototype.getPossibleMoves = function $Rook$$module$__$model$piece$src$rook$$getPossibleMoves$($gameState$$, $src$$, $numMoves$$) {
  return function($dst$$) {
    return module$__$model$piece$src$piecehelper.PieceHelper.isValidSourceAndDest($gameState$$, $src$$, $dst$$) ? module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongRowToDest($gameState$$, $src$$, $dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongColToDest($gameState$$, $src$$, $dst$$) : !1;
  };
};
module$__$model$piece$src$rook["default"] = Rook$$module$__$model$piece$src$rook;
var module$__$model$piece$src$knight = {}, Knight$$module$__$model$piece$src$knight = function $Knight$$module$__$model$piece$src$knight$() {
  this.name = "knight";
};
Knight$$module$__$model$piece$src$knight.prototype.getPossibleMoves = function $Knight$$module$__$model$piece$src$knight$$getPossibleMoves$($gameState$$, $src$$, $numMoves$$) {
  return function($dst$$) {
    return module$__$model$piece$src$piecehelper.PieceHelper.isValidSourceAndDest($gameState$$, $src$$, $dst$$) && (1 == Math.abs($src$$.r - $dst$$.r) && 2 == Math.abs($src$$.c - $dst$$.c) || 1 == Math.abs($src$$.c - $dst$$.c) && 2 == Math.abs($src$$.r - $dst$$.r)) ? !0 : !1;
  };
};
module$__$model$piece$src$knight["default"] = Knight$$module$__$model$piece$src$knight;
var module$__$model$piece$src$pawn = {}, Pawn$$module$__$model$piece$src$pawn = function $Pawn$$module$__$model$piece$src$pawn$() {
  this.name = "pawn";
};
Pawn$$module$__$model$piece$src$pawn.prototype.getPossibleMoves = function $Pawn$$module$__$model$piece$src$pawn$$getPossibleMoves$($gameState$$, $src$$, $numMoves$$) {
  void 0 === $numMoves$$ && ($numMoves$$ = module$__$model$piece$src$piecehelper.PieceHelper.getNumMoves($gameState$$, $src$$));
  return function($dst$$) {
    if (!module$__$model$piece$src$piecehelper.PieceHelper.isValidSourceAndDest($gameState$$, $src$$, $dst$$)) {
      return !1;
    }
    var $dir$$ = $gameState$$.player == $gameState$$.playerWhite ? -1 : 1, $pawnCanMove1Forward$$ = module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, $dst$$) && $src$$.c == $dst$$.c && $dst$$.r == $src$$.r + $dir$$, $inBetweenSquare_pawnCanMove2Forward$$ = {r:$src$$.r + $dir$$, c:$dst$$.c}, $inBetweenSquare_pawnCanMove2Forward$$ = 0 == $numMoves$$ && module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, $dst$$) && module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, 
    $inBetweenSquare_pawnCanMove2Forward$$) && $src$$.c == $dst$$.c && $dst$$.r == $src$$.r + 2 * $dir$$;
    $dst$$ = !module$__$model$piece$src$piecehelper.PieceHelper.isPieceOfCurrentPlayer($gameState$$, $dst$$) && !module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, $dst$$) && $dst$$.r == $src$$.r + $dir$$ && ($dst$$.c == $src$$.c + 1 || $dst$$.c == $src$$.c - 1);
    return $pawnCanMove1Forward$$ || $inBetweenSquare_pawnCanMove2Forward$$ || $dst$$;
  };
};
module$__$model$piece$src$pawn["default"] = Pawn$$module$__$model$piece$src$pawn;
var module$__$model$piece$src$bishop = {}, Bishop$$module$__$model$piece$src$bishop = function $Bishop$$module$__$model$piece$src$bishop$() {
  this.name = "bishop";
};
Bishop$$module$__$model$piece$src$bishop.prototype.getPossibleMoves = function $Bishop$$module$__$model$piece$src$bishop$$getPossibleMoves$($gameState$$, $src$$, $numMoves$$) {
  return function($dst$$) {
    return module$__$model$piece$src$piecehelper.PieceHelper.isValidSourceAndDest($gameState$$, $src$$, $dst$$) ? module$__$model$piece$src$piecehelper.PieceHelper.canGoAlongDiagonalToDest($gameState$$, $src$$, $dst$$) : !1;
  };
};
module$__$model$piece$src$bishop["default"] = Bishop$$module$__$model$piece$src$bishop;
var module$__$model$piecegamelogic$src$piecegamelogic = {}, PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic = {getType:function($codeMatch$$2_s$$) {
  if ("" === $codeMatch$$2_s$$.trim()) {
    return module$__$model$piece$src$piece.emptyPiece;
  }
  $codeMatch$$2_s$$ = $codeMatch$$2_s$$.match(/([a-zA-z])(\d*)/);
  var $alphacode$$ = 1 < $codeMatch$$2_s$$.length ? $codeMatch$$2_s$$[1] : null;
  if (!($codeMatch$$2_s$$ && 2 < $codeMatch$$2_s$$.length && $codeMatch$$2_s$$[2] && $alphacode$$)) {
    return module$__$model$piece$src$piece.emptyPiece;
  }
  switch($alphacode$$.toLowerCase().trim()) {
    case "p":
      return new module$__$model$piece$src$pawn["default"];
    case "r":
      return new module$__$model$piece$src$rook["default"];
    case "h":
      return new module$__$model$piece$src$knight["default"];
    case "b":
      return new module$__$model$piece$src$bishop["default"];
    case "q":
      return new module$__$model$piece$src$queen["default"];
    case "k":
      return new module$__$model$piece$src$king["default"](PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.kingCanCastleWithGivenRook);
    case "":
      return module$__$model$piece$src$piece.emptyPiece;
    default:
      return module$__$model$piece$src$piece.emptyPiece;
  }
}, getNumMoves:function($codeMatch$$3_s$$) {
  return ($codeMatch$$3_s$$ = $codeMatch$$3_s$$.match(/([a-zA-z])(\d*)/)) && 2 < $codeMatch$$3_s$$.length && !isNaN($codeMatch$$3_s$$[2]) ? Number($codeMatch$$3_s$$[2]) : -1;
}, getPossibleMoves:function($gameState$$0$$, $src$$) {
  var $constructMovesMatrix$$ = function $$constructMovesMatrix$$$($gameState$$, $isPossibleToMoveTo$$6_src$$, $PieceType$$1_i$$, $j$$1_numMoves$$) {
    var $validMoves$$ = [];
    $isPossibleToMoveTo$$6_src$$ = "function" == typeof $PieceType$$1_i$$.getPossibleMoves ? $PieceType$$1_i$$.getPossibleMoves($gameState$$, $isPossibleToMoveTo$$6_src$$, $j$$1_numMoves$$) : function($dst$$) {
      return !1;
    };
    if (!$isPossibleToMoveTo$$6_src$$) {
      return $validMoves$$;
    }
    for ($PieceType$$1_i$$ = 0;$PieceType$$1_i$$ < $gameState$$.board.length;$PieceType$$1_i$$++) {
      for ($j$$1_numMoves$$ = 0;$j$$1_numMoves$$ < $gameState$$.board[0].length;$j$$1_numMoves$$++) {
        $isPossibleToMoveTo$$6_src$$({r:$PieceType$$1_i$$, c:$j$$1_numMoves$$}) && $validMoves$$.push({r:$PieceType$$1_i$$, c:$j$$1_numMoves$$});
      }
    }
    return $validMoves$$;
  }, $PieceType_s$$ = $gameState$$0$$.board[$src$$.r][$src$$.c], $numMoves$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getNumMoves($PieceType_s$$);
  return ($PieceType_s$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getType($PieceType_s$$)) && !isNaN($numMoves$$) ? $constructMovesMatrix$$($gameState$$0$$, $src$$, $PieceType_s$$, $numMoves$$) : [];
}, isPossibleToMoveTo:function($gameState$$, $src$$) {
  var $s$$ = $gameState$$.board[$src$$.r][$src$$.c];
  PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getNumMoves($s$$);
  return PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getType($s$$).getPossibleMoves($gameState$$, $src$$);
}, isInCheck:function($gameState$$, $src$$) {
  for (var $i$$ = 0;$i$$ < $gameState$$.board.length;$i$$++) {
    for (var $j$$ = 0;$j$$ < $gameState$$.board[0].length;$j$$++) {
      if ($src$$.r != $i$$ && $src$$.c != $j$$) {
        for (var $possibleAttacks$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getPossibleMoves($gameState$$, {r:$i$$, c:$j$$}), $k$$ = 0;$k$$ < $possibleAttacks$$.length;$k$$++) {
          if ($possibleAttacks$$[$k$$].r == $src$$.r && $possibleAttacks$$[$k$$].c == $src$$.c) {
            return !0;
          }
        }
      }
    }
  }
  return !1;
}, isInCheckmate:function($gameState$$, $src$$) {
  var $possibleMoves$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getPossibleMoves($gameState$$, $src$$);
  if (PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.isInCheck($gameState$$, $src$$)) {
    for (var $isInCheckmate$$ = !0, $i$$ = 0;$i$$ < $possibleMoves$$.length;$i$$++) {
      $isInCheckmate$$ = $isInCheckmate$$ && PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.isInCheck($gameState$$, $possibleMoves$$[$i$$]);
    }
    if ($isInCheckmate$$) {
      return !0;
    }
  }
  return !1;
}, kingCanCastleWithGivenRook:function($gameState$$, $src$$, $dst$$13_len$$) {
  var $dir$$3_s$$ = $gameState$$.board[$src$$.r][$src$$.c], $i$$ = $gameState$$.board[$dst$$13_len$$.r][$dst$$13_len$$.c];
  if (PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getType($dir$$3_s$$).name != (new module$__$model$piece$src$king["default"]).name || PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getType($i$$).name != (new module$__$model$piece$src$rook["default"]).name || 0 != PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getNumMoves($dir$$3_s$$) || 0 != PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getNumMoves($i$$)) {
    return !1;
  }
  if (module$__$model$piece$src$piecehelper.PieceHelper.isPieceOfCurrentPlayer($gameState$$, $src$$) && module$__$model$piece$src$piecehelper.PieceHelper.isPieceOfCurrentPlayer($gameState$$, $dst$$13_len$$) && module$__$model$piece$src$piecehelper.PieceHelper.isBoxOnBoard($gameState$$, $dst$$13_len$$) && $src$$ != $dst$$13_len$$) {
    $dir$$3_s$$ = 0 < $dst$$13_len$$.c - $src$$.c ? 1 : -1;
    $dst$$13_len$$ = Math.abs($dst$$13_len$$.c - $src$$.c);
    for ($i$$ = $src$$.c + $dir$$3_s$$;1 < $dst$$13_len$$--;$i$$ += $dir$$3_s$$) {
      if (!module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, {r:$src$$.r, c:$i$$})) {
        return !1;
      }
    }
    return !0;
  }
}, castleKingWithGivenRook:function($gameState$$, $src$$, $dst$$) {
  var $outDir$$ = 0 < $dst$$.c - $src$$.c ? 1 : -1, $shift$$ = 0;
  3 == Math.abs($dst$$.c - $src$$.c) ? $shift$$ = 2 : 4 == Math.abs($dst$$.c - $src$$.c) && ($shift$$ = 3);
  $gameState$$[$src$$.r][$src$$.c + $outDir$$ * $shift$$] = Object.assign({}, $gameState$$[$src$$.r][$src$$.c]);
  $gameState$$[$src$$.r][$src$$.c] = " ";
  $gameState$$[$dst$$.r][$dst$$.c - $outDir$$ * $shift$$] = Object.assign({}, $gameState$$[$dst$$.r][$dst$$.c]);
  $gameState$$[$dst$$.r][$dst$$.c] = " ";
  return $gameState$$;
}, getSetOfAllPossibleMovesForPlayer:function($gameState$$, $player$$) {
  for (var $s$$ = new Set, $i$$ = 0;$i$$ < $gameState$$.board.length;$i$$++) {
    for (var $j$$ = 0;$j$$ < $gameState$$.board[0].length;$j$$++) {
      if (!module$__$model$piece$src$piecehelper.PieceHelper.isPieceOfGivenPlayer($gameState$$, $player$$, {r:$i$$, c:$j$$}) && !module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, {r:$i$$, c:$j$$})) {
        for (var $possiblePlayerMoves$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getPossibleMoves($gameState$$, {r:$i$$, c:$j$$}), $k$$ = 0;$k$$ < $possiblePlayerMoves$$.length;$k$$++) {
          $s$$.add($possiblePlayerMoves$$[$k$$]);
        }
      }
    }
  }
  return $s$$;
}, randomDefensiveMove:function($gameState$$) {
  return PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getSetOfAllPossibleMovesForPlayer($gameState$$, 0 == $gameState$$.player ? 1 : 0);
}, isACapture:function($gameState$$, $src$$, $dst$$) {
  var $PieceType$$3_s$$ = $gameState$$.board[$src$$.r][$src$$.c], $numMoves$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getNumMoves($PieceType$$3_s$$), $PieceType$$3_s$$ = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic.getType($PieceType$$3_s$$);
  return "function" != typeof $PieceType$$3_s$$.getPossibleMoves || isNaN($numMoves$$) || !$PieceType$$3_s$$.getPossibleMoves($gameState$$, $src$$, $numMoves$$)($dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.isPieceOfCurrentPlayer($gameState$$, $dst$$) || module$__$model$piece$src$piecehelper.PieceHelper.isEmpty($gameState$$, $dst$$) ? !1 : !0;
}};
module$__$model$piecegamelogic$src$piecegamelogic.PieceGameLogic = PieceGameLogic$$module$__$model$piecegamelogic$src$piecegamelogic;
var module$src$store = {}, Store$$module$src$store = function $Store$$module$src$store$($name$$, $callback$$) {
  var $localStorage$$ = window.localStorage;
  this.initializeBoard = function $this$initializeBoard$() {
    for (var $whiteking$$ = module$src$box.initializePiece("whiteking"), $whitequeen$$ = module$src$box.initializePiece("whitequeen"), $whitebishop$$ = module$src$box.initializePiece("whitebishop"), $whiteknight$$ = module$src$box.initializePiece("whiteknight"), $whiterook$$ = module$src$box.initializePiece("whiterook"), $whitepawn$$ = module$src$box.initializePiece("whitepawn"), $blackking_i$$ = module$src$box.initializePiece("blackking"), $blackqueen$$ = module$src$box.initializePiece("blackqueen"), 
    $blackbishop$$ = module$src$box.initializePiece("blackbishop"), $blackknight$$ = module$src$box.initializePiece("blackknight"), $blackrook$$ = module$src$box.initializePiece("blackrook"), $blackpawn_i$0$$ = module$src$box.initializePiece("blackpawn"), $arr$$ = [], $i$$ = 0;64 > $i$$;$i$$++) {
      $arr$$[$i$$] = module$src$box.emptyBox($i$$);
    }
    $arr$$[0].piece = Object.assign({}, $blackrook$$);
    $arr$$[1].piece = Object.assign({}, $blackknight$$);
    $arr$$[2].piece = Object.assign({}, $blackbishop$$);
    $arr$$[3].piece = Object.assign({}, $blackqueen$$);
    $arr$$[4].piece = Object.assign({}, $blackking_i$$);
    $arr$$[5].piece = Object.assign({}, $blackbishop$$);
    $arr$$[6].piece = Object.assign({}, $blackknight$$);
    $arr$$[7].piece = Object.assign({}, $blackrook$$);
    for ($blackking_i$$ = 8;16 > $blackking_i$$;$blackking_i$$++) {
      $arr$$[$blackking_i$$].piece = Object.assign({}, $blackpawn_i$0$$);
    }
    for ($blackpawn_i$0$$ = 48;56 > $blackpawn_i$0$$;$blackpawn_i$0$$++) {
      $arr$$[$blackpawn_i$0$$].piece = Object.assign({}, $whitepawn$$);
    }
    $arr$$[56].piece = Object.assign({}, $whiterook$$);
    $arr$$[57].piece = Object.assign({}, $whiteknight$$);
    $arr$$[58].piece = Object.assign({}, $whitebishop$$);
    $arr$$[59].piece = Object.assign({}, $whitequeen$$);
    $arr$$[60].piece = Object.assign({}, $whiteking$$);
    $arr$$[61].piece = Object.assign({}, $whitebishop$$);
    $arr$$[62].piece = Object.assign({}, $whiteknight$$);
    $arr$$[63].piece = Object.assign({}, $whiterook$$);
    return $arr$$;
  };
  var $liveBoard$$ = this.initializeBoard(), $livePlayer$$ = module$src$box.WHITE_PLAYER, $liveCaptures$$ = [], $liveHistory$$ = [], $liveRedoHistory$$ = [], $liveStore$$ = {liveBoard:$liveBoard$$, livePlayer:$livePlayer$$, liveCaptures:$liveCaptures$$, liveHistory:$liveHistory$$, liveRedoHistory:$liveRedoHistory$$, prevLiveStore:{liveBoard:$liveBoard$$, livePlayer:$livePlayer$$, liveCaptures:$liveCaptures$$, liveHistory:$liveHistory$$, liveRedoHistory:$liveRedoHistory$$, prevLiveStore:void 0, redoLiveStore:void 0}, 
  redoLiveStore:{liveBoard:$liveBoard$$, livePlayer:$livePlayer$$, liveCaptures:$liveCaptures$$, liveHistory:$liveHistory$$, liveRedoHistory:$liveRedoHistory$$, prevLiveStore:void 0, redoLiveStore:void 0}};
  this.getLocalStorage = function $this$getLocalStorage$() {
    var $localStorageItem$$ = null !== $localStorage$$.getItem($name$$) ? String($localStorage$$.getItem($name$$)) : JSON.stringify($liveStore$$);
    return $liveStore$$ || JSON.parse($localStorageItem$$);
  };
  this.setLocalStorage = function $this$setLocalStorage$($board$$, $player$$, $captures$$, $history$$, $redoHistory$$, $prevLiveStore$$, $redoLiveStore$$) {
    Array.isArray($board$$) && ($liveStore$$.liveBoard = $board$$);
    if ($player$$ === module$src$box.WHITE_PLAYER || $player$$ === module$src$box.BLACK_PLAYER) {
      $liveStore$$.livePlayer = $player$$;
    }
    Array.isArray($captures$$) && ($liveStore$$.liveCaptures = $captures$$);
    Array.isArray($history$$) && ($liveStore$$.liveHistory = $history$$);
    Array.isArray($redoHistory$$) && ($liveStore$$.liveRedoHistory = $redoHistory$$);
    void 0 != $prevLiveStore$$ && ($liveStore$$.prevLiveStore = $prevLiveStore$$);
    void 0 != $redoLiveStore$$ && ($liveStore$$.redoLiveStore = $redoLiveStore$$);
    $localStorage$$.setItem($name$$, JSON.stringify($liveStore$$));
  };
  $callback$$ && $callback$$();
};
Store$$module$src$store.prototype.convertFrontToBackEncoding = function $Store$$module$src$store$$convertFrontToBackEncoding$($str$$, $timesMoved$$) {
  var $encoding$$ = "";
  switch($str$$) {
    case "whitepawn":
      $encoding$$ = "P";
      break;
    case "whiterook":
      $encoding$$ = "R";
      break;
    case "whiteknight":
      $encoding$$ = "H";
      break;
    case "whitebishop":
      $encoding$$ = "B";
      break;
    case "whitequeen":
      $encoding$$ = "Q";
      break;
    case "whiteking":
      $encoding$$ = "K";
      break;
    case "blackpawn":
      $encoding$$ = "p";
      break;
    case "blackrook":
      $encoding$$ = "r";
      break;
    case "blackknight":
      $encoding$$ = "h";
      break;
    case "blackbishop":
      $encoding$$ = "b";
      break;
    case "blackqueen":
      $encoding$$ = "q";
      break;
    case "blackking":
      $encoding$$ = "k";
  }
  return $encoding$$ ? $encoding$$ + $timesMoved$$ : $encoding$$;
};
Store$$module$src$store.prototype.convertBoardToGameState = function $Store$$module$src$store$$convertBoardToGameState$($board$$) {
  $board$$ = $board$$ || this.getLocalStorage().liveBoard;
  var $gameState$$ = {};
  $gameState$$.board = Array(8);
  for (var $i$$ = 0;$i$$ < $gameState$$.board.length;$i$$++) {
    $gameState$$.board[$i$$] = [];
    for (var $j$$4_k$$ = 0;8 > $j$$4_k$$;$j$$4_k$$++) {
      $gameState$$.board[$i$$].push(" ");
    }
    for ($j$$4_k$$ = 0;$j$$4_k$$ < $gameState$$.board[$i$$].length;$j$$4_k$$++) {
      var $piece$$ = $board$$[8 * $i$$ + $j$$4_k$$].piece;
      null !== $piece$$ && ($gameState$$.board[$i$$][$j$$4_k$$] = this.convertFrontToBackEncoding($piece$$.title, $piece$$.timesMoved));
    }
  }
  $gameState$$.numRows = 8;
  $gameState$$.numCols = 8;
  $gameState$$.playerWhite = 0;
  $gameState$$.playerBlack = 1;
  $gameState$$.player = this.getLocalStorage().livePlayer;
  return $gameState$$;
};
Store$$module$src$store.prototype.getEnPassantLocationIfPossible = function $Store$$module$src$store$$getEnPassantLocationIfPossible$($src$$, $board$$2_boardIn$$, $history$$) {
  var $ret_srcPos$$ = 8 * $src$$.r + $src$$.c, $liveStore$$ = this.getLocalStorage();
  $board$$2_boardIn$$ = $board$$2_boardIn$$ || $liveStore$$.liveBoard;
  $history$$ = $history$$ || $liveStore$$.liveHistory;
  if ($board$$2_boardIn$$[$ret_srcPos$$].piece && 0 != $history$$.length) {
    var $forwardDir$$ = $liveStore$$.livePlayer == module$src$box.WHITE_PLAYER ? -1 : 1, $liveStore$$ = $liveStore$$.livePlayer == module$src$box.WHITE_PLAYER ? "white" : "black", $pieceThatLastMoved$$ = $history$$[$history$$.length - 1].srcPiece;
    if (-1 != $board$$2_boardIn$$[$ret_srcPos$$].piece.title.indexOf("pawn") && -1 != $pieceThatLastMoved$$.title.indexOf("pawn") && (-1 == $pieceThatLastMoved$$.title.indexOf($liveStore$$) || $pieceThatLastMoved$$.r == $board$$2_boardIn$$[$ret_srcPos$$].piece.r && $pieceThatLastMoved$$.c == $board$$2_boardIn$$[$ret_srcPos$$].piece.c) && 2 == Math.abs($history$$[$history$$.length - 1].src.r - $history$$[$history$$.length - 1].dst.r) && $history$$[$history$$.length - 1].dst.r == $src$$.r && 1 == Math.abs($history$$[$history$$.length - 
    1].dst.c - $src$$.c)) {
      return $ret_srcPos$$ = {}, $ret_srcPos$$.move = {r:$src$$.r + $forwardDir$$, c:$history$$[$history$$.length - 1].dst.c}, $ret_srcPos$$.capture = $history$$[$history$$.length - 1].dst, $ret_srcPos$$;
    }
  }
};
Store$$module$src$store.prototype.locationIfIsCapture = function $Store$$module$src$store$$locationIfIsCapture$($gameState$$, $src$$, $dst$$) {
  var $possibleEnPassantLocation$$ = this.getEnPassantLocationIfPossible($src$$);
  return $possibleEnPassantLocation$$ && $possibleEnPassantLocation$$.move.c == $dst$$.c && $possibleEnPassantLocation$$.move.r == $dst$$.r ? $possibleEnPassantLocation$$.capture : module$__$model$piecegamelogic$src$piecegamelogic.PieceGameLogic.isACapture($gameState$$, $src$$, $dst$$) ? $dst$$ : !1;
};
Store$$module$src$store.prototype.movePiece = function $Store$$module$src$store$$movePiece$($src$$, $dst$$, $board$$) {
  var $prevLiveStore$$ = $board$$ || this.getLocalStorage();
  $board$$ = $prevLiveStore$$.liveBoard;
  var $gameState$$28_outDir$$ = this.convertBoardToGameState($board$$), $playerTurn$$ = $prevLiveStore$$.livePlayer, $captures$$ = $prevLiveStore$$.liveCaptures, $dstPos_history$$ = 8 * $dst$$.r + $dst$$.c, $srcPos$$ = 8 * $src$$.r + $src$$.c, $dstPiece$$ = $board$$[$dstPos_history$$].piece, $srcPiece$$ = $board$$[$srcPos$$].piece, $locationToCapture_shiftKing$$ = this.locationIfIsCapture($gameState$$28_outDir$$, $src$$, $dst$$);
  0 != $locationToCapture_shiftKing$$ && ($dstPos_history$$ = 8 * $locationToCapture_shiftKing$$.r + $locationToCapture_shiftKing$$.c, $dstPiece$$ = $board$$[$dstPos_history$$].piece, $board$$[$dstPos_history$$].piece.capturedIdx = $captures$$.length, $captures$$.push($board$$[$dstPos_history$$].piece), $board$$[$dstPos_history$$].piece = null);
  if (module$__$model$piecegamelogic$src$piecegamelogic.PieceGameLogic.kingCanCastleWithGivenRook($gameState$$28_outDir$$, $src$$, $dst$$)) {
    var $gameState$$28_outDir$$ = 0 < $dst$$.c - $src$$.c ? 1 : -1, $shiftRook$$ = $locationToCapture_shiftKing$$ = 0;
    3 == Math.abs($dst$$.c - $src$$.c) ? $shiftRook$$ = $locationToCapture_shiftKing$$ = 2 : 4 == Math.abs($dst$$.c - $src$$.c) && ($locationToCapture_shiftKing$$ = 2, $shiftRook$$ = 3);
    $board$$[$srcPos$$ + $gameState$$28_outDir$$ * $locationToCapture_shiftKing$$].piece = $board$$[$srcPos$$].piece;
    $board$$[$srcPos$$ + $gameState$$28_outDir$$ * $locationToCapture_shiftKing$$].piece.timesMoved++;
    $board$$[$srcPos$$].piece = null;
    $board$$[$dstPos_history$$ - $gameState$$28_outDir$$ * $shiftRook$$].piece = $board$$[$dstPos_history$$].piece;
    $board$$[$dstPos_history$$].piece = null;
  } else {
    void 0 != this.getEnPassantLocationIfPossible($src$$) ? (this.getEnPassantLocationIfPossible($src$$), $board$$[8 * $dst$$.r + $dst$$.c].piece = $board$$[8 * $src$$.r + $src$$.c].piece, $board$$[8 * $dst$$.r + $dst$$.c].piece.timesMoved++, $dstPiece$$ = $board$$[8 * $src$$.r + $src$$.c].piece = null) : ($board$$[$dstPos_history$$].piece = $board$$[$srcPos$$].piece, $board$$[$dstPos_history$$].piece.timesMoved++, $board$$[$srcPos$$].piece = null);
  }
  $dstPos_history$$ = $prevLiveStore$$.liveHistory;
  $dstPos_history$$.push({src:$src$$, dst:$dst$$, srcPiece:$srcPiece$$, dstPiece:$dstPiece$$, move:$dstPos_history$$.length});
  $prevLiveStore$$ = Object.assign({}, $prevLiveStore$$);
  $prevLiveStore$$.prevLiveStore = void 0;
  $playerTurn$$ = $playerTurn$$ == module$src$box.WHITE_PLAYER ? module$src$box.BLACK_PLAYER : module$src$box.WHITE_PLAYER;
  this.setLocalStorage($board$$, $playerTurn$$, $captures$$, $dstPos_history$$, [], $prevLiveStore$$);
  this.promoteIfPossible($src$$, $dst$$);
};
Store$$module$src$store.prototype.selectBox = function $Store$$module$src$store$$selectBox$($pos$$) {
  var $boxes$$ = this.getLocalStorage().liveBoard;
  $boxes$$[$pos$$].selected = !0;
  this.setLocalStorage($boxes$$);
};
Store$$module$src$store.prototype.unselectBox = function $Store$$module$src$store$$unselectBox$($pos$$) {
  var $boxes$$ = this.getLocalStorage().liveBoard;
  $boxes$$[$pos$$].selected = !1;
  this.setLocalStorage($boxes$$);
};
Store$$module$src$store.prototype.selectCapturedPiece = function $Store$$module$src$store$$selectCapturedPiece$($pos$$) {
  var $captures$$ = this.getLocalStorage().liveCaptures;
  $captures$$[$pos$$].selectedCapture = !0;
  this.setLocalStorage(void 0, void 0, $captures$$);
};
Store$$module$src$store.prototype.unSelectCapturedPiece = function $Store$$module$src$store$$unSelectCapturedPiece$($pos$$) {
  var $captures$$ = this.getLocalStorage().liveCaptures;
  $captures$$[$pos$$].selectedCapture = !1;
  this.setLocalStorage(void 0, void 0, $captures$$);
};
Store$$module$src$store.prototype.locationIfCanMove = function $Store$$module$src$store$$locationIfCanMove$($src$$, $dst$$) {
  if (!$src$$ || !$dst$$) {
    return !1;
  }
  var $canMoveToDest_gameState$$ = this.convertBoardToGameState(), $canMoveToDest_gameState$$ = module$__$model$piecegamelogic$src$piecegamelogic.PieceGameLogic.isPossibleToMoveTo($canMoveToDest_gameState$$, $src$$)($dst$$), $possibleEnPassantLocation$$ = this.getEnPassantLocationIfPossible($src$$);
  return void 0 != $possibleEnPassantLocation$$ && $possibleEnPassantLocation$$.move.r == $dst$$.r && $possibleEnPassantLocation$$.move.c == $dst$$.c || $canMoveToDest_gameState$$ ? $dst$$ : !1;
};
Store$$module$src$store.prototype.getPossibleMoves = function $Store$$module$src$store$$getPossibleMoves$($possibleEnPassantLocation$$2_src$$) {
  var $gameState$$ = this.convertBoardToGameState(), $gameState$$ = module$__$model$piecegamelogic$src$piecegamelogic.PieceGameLogic.getPossibleMoves($gameState$$, $possibleEnPassantLocation$$2_src$$);
  $possibleEnPassantLocation$$2_src$$ = this.getEnPassantLocationIfPossible($possibleEnPassantLocation$$2_src$$);
  void 0 != $possibleEnPassantLocation$$2_src$$ && $gameState$$.push($possibleEnPassantLocation$$2_src$$.move);
  return $gameState$$;
};
Store$$module$src$store.prototype.updatePossibleMoves = function $Store$$module$src$store$$updatePossibleMoves$($possibleMoves$$) {
  var $boxes$$ = this.getLocalStorage().liveBoard;
  switch($possibleMoves$$) {
    case null:
      $boxes$$ = $boxes$$.map(function($box$$) {
        $box$$.possibleDest = !1;
        return $box$$;
      });
      this.setLocalStorage($boxes$$);
      break;
    default:
      $possibleMoves$$.forEach(function($loc$$) {
        $boxes$$[8 * $loc$$.r + $loc$$.c].possibleDest = !0;
      }), this.setLocalStorage($boxes$$);
  }
};
Store$$module$src$store.prototype.canPromote = function $Store$$module$src$store$$canPromote$($pawn$$) {
  var $board$$ = this.getLocalStorage().liveBoard, $hItem_history$$ = this.getLocalStorage().liveHistory, $hItem_history$$ = $hItem_history$$[$hItem_history$$.length - 1], $board$$ = $board$$[8 * $pawn$$.r + $pawn$$.c].piece;
  return null != $board$$ && -1 != $board$$.title.indexOf("pawn") && (0 == $pawn$$.r && 0 == $board$$.title.indexOf("white") || 7 == $pawn$$.r && 0 == $board$$.title.indexOf("black")) && $hItem_history$$.dst.r == $pawn$$.r && $hItem_history$$.dst.c == $pawn$$.c ? !0 : !1;
};
Store$$module$src$store.prototype.promoteIfPossible = function $Store$$module$src$store$$promoteIfPossible$($pawn$$, $other$$, $otherPieceIn$$) {
  var $board$$ = this.getLocalStorage().liveBoard, $history$$ = this.getLocalStorage().liveHistory, $hItem$$ = $history$$[$history$$.length - 1], $pawnPiece$$ = $board$$[8 * $pawn$$.r + $pawn$$.c].piece;
  $other$$ = $otherPieceIn$$ || $board$$[8 * $other$$.r + $other$$.c].piece;
  return null != $pawnPiece$$ && -1 != $pawnPiece$$.title.indexOf("pawn") && null != $other$$ && $pawnPiece$$.title.indexOf("white") == $other$$.title.indexOf("white") && (0 == $pawn$$.r && 0 == $pawnPiece$$.title.indexOf("white") || 7 == $pawn$$.r && 0 == $pawnPiece$$.title.indexOf("black")) && $hItem$$.dst.r == $pawn$$.r && $hItem$$.dst.c == $pawn$$.c ? ($board$$[8 * $pawn$$.r + $pawn$$.c].piece.title = $other$$.title, $history$$.push({src:$pawn$$, dst:$pawn$$, srcPiece:$pawnPiece$$, dstPiece:$pawnPiece$$, 
  move:$hItem$$.move}), this.setLocalStorage($board$$, void 0, void 0, $history$$), !0) : !1;
};
Store$$module$src$store.prototype.undoMove = function $Store$$module$src$store$$undoMove$() {
};
Store$$module$src$store.prototype.redoMove = function $Store$$module$src$store$$redoMove$() {
};
Store$$module$src$store.prototype.loadBoard = function $Store$$module$src$store$$loadBoard$() {
};
Store$$module$src$store.prototype.saveBoard = function $Store$$module$src$store$$saveBoard$() {
};
module$src$store["default"] = Store$$module$src$store;
var module$src$helpers = {};
function qs$$module$src$helpers($selector$$, $scope$$) {
  return ($scope$$ || document).querySelector($selector$$);
}
function $on$$module$src$helpers($target$$, $type$$, $callback$$, $capture$$) {
  $target$$.addEventListener($type$$, $callback$$, !!$capture$$);
}
var escapeForHTML$$module$src$helpers = function $escapeForHTML$$module$src$helpers$($s$$) {
  return $s$$.replace(/[&<]/g, function($c$$) {
    return "&" === $c$$ ? "&amp;" : "&lt;";
  });
};
module$src$helpers.qs = qs$$module$src$helpers;
module$src$helpers.$on = $on$$module$src$helpers;
module$src$helpers.escapeForHTML = escapeForHTML$$module$src$helpers;
var module$src$template = {}, Template$$module$src$template = function $Template$$module$src$template$() {
};
Template$$module$src$template.prototype.Board = function $Template$$module$src$template$$Board$($boxes$$) {
  for (var $board$$ = document.createElement("board"), $boxPos$$ = 0, $r$$ = 0;8 > $r$$;$r$$++) {
    for (var $tr$$ = document.createElement("tr"), $c$$ = 0;8 > $c$$;$c$$++) {
      var $td$$ = document.createElement("td");
      $td$$.setAttribute("data-pos", $boxPos$$);
      var $box$$ = $boxes$$[8 * $r$$ + $c$$], $piece$$ = $box$$.piece;
      if ($piece$$) {
        var $pieceDiv$$ = document.createElement("div");
        $pieceDiv$$.setAttribute("class", $piece$$.title);
        $td$$.appendChild($pieceDiv$$);
      }
      $box$$.selected && $td$$.setAttribute("class", "selected");
      $box$$.possibleDest && $td$$.setAttribute("class", "possibleDest");
      $tr$$.appendChild($td$$);
      $boxPos$$++;
    }
    $board$$.appendChild($tr$$);
  }
  return $board$$;
};
Template$$module$src$template.prototype.Captured = function $Template$$module$src$template$$Captured$($type$$, $captures$$) {
  for (var $tr$$ = document.createElement("tr"), $i$$ = 0;$i$$ < $captures$$.length;$i$$++) {
    var $piece$$ = $captures$$[$i$$];
    if ($piece$$.title && 0 == $piece$$.title.indexOf($type$$)) {
      var $td$$ = document.createElement("td"), $pieceDiv$$ = document.createElement("div");
      $pieceDiv$$.setAttribute("class", $piece$$.title);
      $piece$$.selectedCapture && $pieceDiv$$.setAttribute("class", $piece$$.title + " selectedCapture");
      $td$$.appendChild($pieceDiv$$);
      $tr$$.appendChild($td$$);
    }
  }
  return $tr$$;
};
Template$$module$src$template.prototype.CapturedWhite = function $Template$$module$src$template$$CapturedWhite$($boxes$$) {
  return this.Captured("white", $boxes$$);
};
Template$$module$src$template.prototype.CapturedBlack = function $Template$$module$src$template$$CapturedBlack$($boxes$$) {
  return this.Captured("black", $boxes$$);
};
module$src$template["default"] = Template$$module$src$template;
var module$src$view = {}, View$$module$src$view = function $View$$module$src$view$($template$$) {
  this.template = $template$$;
  this.$board = module$src$helpers.qs(".chessboard");
  this.$capturedwhite = module$src$helpers.qs(".capturedwhite");
  this.$capturedblack = module$src$helpers.qs(".capturedblack");
  this.$main = module$src$helpers.qs(".main");
  this.$undobtn = module$src$helpers.qs(".undo");
  this.$redobtn = module$src$helpers.qs(".redo");
};
View$$module$src$view.prototype.showBoard = function $View$$module$src$view$$showBoard$($board$$) {
  this.$board.replaceChild(this.template.Board($board$$), this.$board.firstChild);
};
View$$module$src$view.prototype.showCaptures = function $View$$module$src$view$$showCaptures$($captures$$) {
  this.$capturedwhite.replaceChild(this.template.CapturedWhite($captures$$), this.$capturedwhite.firstChild);
  this.$capturedblack.replaceChild(this.template.CapturedBlack($captures$$), this.$capturedblack.firstChild);
};
View$$module$src$view.prototype.bindSelectBox = function $View$$module$src$view$$bindSelectBox$($box$$, $handler$$) {
  module$src$helpers.$on($box$$, "click", function($$jscomp$destructuring$var4$$) {
    $handler$$($box$$);
  });
};
View$$module$src$view.prototype.bindCapturedPiece = function $View$$module$src$view$$bindCapturedPiece$($piece$$, $i$$, $handler$$) {
  module$src$helpers.$on($piece$$, "click", function() {
    return $handler$$($piece$$, $i$$);
  });
};
View$$module$src$view.prototype.bindUndoMove = function $View$$module$src$view$$bindUndoMove$($handler$$) {
};
View$$module$src$view.prototype.bindRedoMove = function $View$$module$src$view$$bindRedoMove$($handler$$) {
};
module$src$view["default"] = View$$module$src$view;
var module$src$controller = {}, deserializeBoxContents$$module$src$controller = function $deserializeBoxContents$$module$src$controller$($box$$) {
  var $ret$$ = module$src$box.emptyBox(Number($box$$.getAttribute("data-pos")));
  $box$$.querySelector("div") && ($ret$$.piece = module$src$box.initializePiece($box$$.querySelector("div").getAttribute("class")));
  return $ret$$;
}, deserializeCapturedPiece$$module$src$controller = function $deserializeCapturedPiece$$module$src$controller$($pieceElem$$) {
  return module$src$box.initializePiece($pieceElem$$.firstChild.getAttribute("class"));
}, extractLocationFromBox$$module$src$controller = function $extractLocationFromBox$$module$src$controller$($box$$) {
  return {r:$box$$.r, c:$box$$.c};
}, Controller$$module$src$controller = function $Controller$$module$src$controller$($store$$, $view$$) {
  this.store = $store$$;
  this.view = $view$$;
  this._selectedBox = module$src$box.emptyBox(-1);
  this._lastSelectedBox = module$src$box.emptyBox(-1);
  this._selectedCapturedPiece = module$src$box.initializePiece(null);
  this.view.bindUndoMove(this.undoMove.bind(this));
  this.view.bindRedoMove(this.redoMove.bind(this));
};
Controller$$module$src$controller.prototype.showBoardAndBindBoxes = function $Controller$$module$src$controller$$showBoardAndBindBoxes$() {
  var $board$$8_r$$ = this.store.getLocalStorage().liveBoard;
  this.view.showBoard($board$$8_r$$);
  for ($board$$8_r$$ = 0;8 > $board$$8_r$$;$board$$8_r$$++) {
    for (var $c$$ = 0;8 > $c$$;$c$$++) {
      this.view.bindSelectBox(this.view.$board.children[0].children[$board$$8_r$$].children[$c$$], this.selectBox.bind(this));
    }
  }
};
Controller$$module$src$controller.prototype.showAndBindCapturedPieces = function $Controller$$module$src$controller$$showAndBindCapturedPieces$() {
  var $captures$$ = this.store.getLocalStorage().liveCaptures;
  this.view.showCaptures($captures$$);
  for (var $whiteIdx$$ = 0, $blackIdx$$ = 0, $i$$ = 0;$i$$ < $captures$$.length;$i$$++) {
    if ($captures$$[$i$$].title && 0 == $captures$$[$i$$].title.indexOf("black")) {
      var $piece$$ = this.view.$capturedblack.children[0].children[$blackIdx$$++];
      void 0 != $piece$$ && this.view.bindCapturedPiece($piece$$, $i$$, this.selectCapturedPiece.bind(this));
    } else {
      $captures$$[$i$$].title && 0 == $captures$$[$i$$].title.indexOf("white") && ($piece$$ = this.view.$capturedwhite.children[0].children[$whiteIdx$$++], void 0 != $piece$$ && this.view.bindCapturedPiece($piece$$, $i$$, this.selectCapturedPiece.bind(this)));
    }
  }
};
Controller$$module$src$controller.prototype.selectBox = function $Controller$$module$src$controller$$selectBox$($box$$11_locationIfCanMove_possibleMoves$$) {
  this._lastSelectedBox = this._selectedBox;
  this._selectedBox = deserializeBoxContents$$module$src$controller($box$$11_locationIfCanMove_possibleMoves$$);
  this.store.selectBox(this._selectedBox.pos);
  this._lastSelectedBox.pos != this._selectedBox.pos && ($box$$11_locationIfCanMove_possibleMoves$$ = !1, null != this._lastSelectedBox.piece && ($box$$11_locationIfCanMove_possibleMoves$$ = this.store.locationIfCanMove(extractLocationFromBox$$module$src$controller(this._lastSelectedBox), extractLocationFromBox$$module$src$controller(this._selectedBox))), null != this._lastSelectedBox.piece && null != this._lastSelectedBox.piece.title && null != this._selectedBox.piece && null != this._selectedBox.piece.title && 
  this.store.promoteIfPossible({r:this._lastSelectedBox.r, c:this._lastSelectedBox.c}, {r:this._selectedBox.r, c:this._selectedBox.c}) || null != this._selectedCapturedPiece && null != this._selectedCapturedPiece.title && null != this._lastSelectedBox.piece && null != this._lastSelectedBox.piece.title && this.store.promoteIfPossible({r:this._lastSelectedBox.r, c:this._lastSelectedBox.c}, void 0, this._selectedCapturedPiece) ? (-1 != this._selectedBox.pos && this.store.unselectBox(this._selectedBox.pos), 
  -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._lastSelectedBox.pos), this.store.updatePossibleMoves(null), this._lastSelectedBox = module$src$box.emptyBox(-1), this._selectedBox = module$src$box.emptyBox(-1)) : null != this._lastSelectedBox.piece && 0 != $box$$11_locationIfCanMove_possibleMoves$$ ? (this.store.movePiece(extractLocationFromBox$$module$src$controller(this._lastSelectedBox), extractLocationFromBox$$module$src$controller(this._selectedBox)), this.store.unselectBox(this._lastSelectedBox.pos), 
  this.store.updatePossibleMoves(null), this._lastSelectedBox = module$src$box.emptyBox(-1), this.store.canPromote({r:this._selectedBox.r, c:this._selectedBox.c}) && alert("Promotion possible: Select the promotable pawn, then any piece of the same color as the promotable pawn to complete the promotion."), this.store.unselectBox(this._selectedBox.pos), this._selectedBox = module$src$box.emptyBox(-1)) : null != this._selectedBox.piece ? (this.store.updatePossibleMoves(null), $box$$11_locationIfCanMove_possibleMoves$$ = 
  this.store.getPossibleMoves(extractLocationFromBox$$module$src$controller(this._selectedBox)), this.store.updatePossibleMoves($box$$11_locationIfCanMove_possibleMoves$$), -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._lastSelectedBox.pos), this._lastSelectedBox = module$src$box.emptyBox(-1)) : (this.store.updatePossibleMoves(null), -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._lastSelectedBox.pos), this._lastSelectedBox = module$src$box.emptyBox(-1), this.store.canPromote({r:this._selectedBox.r, 
  c:this._selectedBox.c}) && alert("Promotion possible: Select the promotable pawn, then any piece of the same color as the promotable pawn to complete the promotion."), -1 != this._selectedBox.pos && this.store.unselectBox(this._selectedBox.pos), this._selectedBox = module$src$box.emptyBox(-1)), -1 != this._selectedCapturedPiece.capturedIdx && this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx), this.showAndBindCapturedPieces(), this.showBoardAndBindBoxes());
};
Controller$$module$src$controller.prototype.selectCapturedPiece = function $Controller$$module$src$controller$$selectCapturedPiece$($pieceElem$$, $i$$) {
  -1 != this._selectedCapturedPiece.capturedIdx && this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx);
  if (null != this._lastSelectedBox.piece || null != this._selectedBox.piece) {
    this.store.updatePossibleMoves(null), -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._lastSelectedBox.pos), -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._selectedBox.pos), this._lastSelectedBox = module$src$box.emptyBox(-1), this._lastSelectedBox = module$src$box.emptyBox(-1);
  }
  this._selectedCapturedPiece = deserializeCapturedPiece$$module$src$controller($pieceElem$$);
  this._selectedCapturedPiece.capturedIdx = $i$$;
  this.store.selectCapturedPiece($i$$);
  this.showAndBindCapturedPieces();
  this.showBoardAndBindBoxes();
};
Controller$$module$src$controller.prototype.undoMove = function $Controller$$module$src$controller$$undoMove$() {
  0 != this.store.getLocalStorage().liveHistory.length && (this.store.updatePossibleMoves(null), -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._lastSelectedBox.pos), -1 != this._selectedBox.pos && this.store.unselectBox(this._selectedBox.pos), -1 != this._selectedCapturedPiece.capturedIdx && this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx), this._selectedBox = module$src$box.emptyBox(-1), this._lastSelectedBox = module$src$box.emptyBox(-1), this._selectedCapturedPiece = 
  module$src$box.initializePiece(null), this.store.undoMove(), this.showAndBindCapturedPieces(), this.showBoardAndBindBoxes());
};
Controller$$module$src$controller.prototype.redoMove = function $Controller$$module$src$controller$$redoMove$() {
  0 != this.store.getLocalStorage().liveRedoHistory.length && (this.store.updatePossibleMoves(null), -1 != this._lastSelectedBox.pos && this.store.unselectBox(this._lastSelectedBox.pos), -1 != this._selectedBox.pos && this.store.unselectBox(this._selectedBox.pos), -1 != this._selectedCapturedPiece.capturedIdx && this.store.unSelectCapturedPiece(this._selectedCapturedPiece.capturedIdx), this._selectedBox = module$src$box.emptyBox(-1), this._lastSelectedBox = module$src$box.emptyBox(-1), this._selectedCapturedPiece = 
  module$src$box.initializePiece(null), this.store.redoMove(), this.showAndBindCapturedPieces(), this.showBoardAndBindBoxes());
};
module$src$controller["default"] = Controller$$module$src$controller;
var store$$module$src$app = new module$src$store["default"]("chess-game-vanilla-es6"), template$$module$src$app = new module$src$template["default"], view$$module$src$app = new module$src$view["default"](template$$module$src$app), controller$$module$src$app = new module$src$controller["default"](store$$module$src$app, view$$module$src$app), init$$module$src$app = function $init$$module$src$app$() {
  return controller$$module$src$app.showBoardAndBindBoxes();
};
module$src$helpers.$on(window, "load", init$$module$src$app);
var GameState$$module$__$model$gamestate_es5;
function initialGameState$$module$__$model$gamestate_es5() {
  return {board:["r0 h0 b0 q0 k0 b0 h0 r0".split(" "), "p0 p0 p0 p0 p0 p0 p0 p0".split(" "), "        ".split(""), "        ".split(""), "        ".split(""), "        ".split(""), "P0 P0 P0 P0 P0 P0 P0 P0".split(" "), "R0 H0 B0 Q0 K0 B0 H0 R0".split(" ")], numRows:8, numCols:8, playerWhite:0, playerBlack:1, player:0};
}
var module$__$model$gamestate_es5 = {GameState:GameState$$module$__$model$gamestate_es5, initialGameState:initialGameState$$module$__$model$gamestate_es5};

