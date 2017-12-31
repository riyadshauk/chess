import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.onClick()}
      </button>
    );
  }
}

class WhiteSquare extends React.Component {
  clickHandler() {
    return this.props.onClick();
  }
  render() {
    return (
      <button className="whitesquare" onClick={this.clickHandler.bind(this)}>
      </button>
    )
  }
}

class BlackSquare extends React.Component {
  clickHandler() {
    return this.props.onClick();
  }
  render() {
    return (
      <button className="blacksquare" onClick={this.clickHandler.bind(this)}>
      </button>
    )
  }
}

// class Piece extends React.Component {
//   renderPiece(type) {
//     <div className=type>
//     </div>
//   }
//   render() {
//
//   }
// }

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(64).fill(null),
    };
    this.state.squares[8] = <div className="blackpawn"></div>;
    console.log(this.state);
  }

  handleClick(i) {}

  renderWhiteSquare(i) {
    return (
      <WhiteSquare
        onClick={() => this.handleClick(i)}
      />
    )
  }

  renderBlackSquare(i) {
    return (
      <BlackSquare
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {

/*
var gen = function() {
  for (var i = 0; i < 8; i++) {
    console.log('<div className="board-row">');
    for (var j = 0; j < 8; j++) {
      var n = 8*i+j;
      if ((i+j)%2) console.log('\t{this.renderBlackSquare('+n+')}');
      else console.log('\t{this.renderWhiteSquare('+n+')}');
    }
    console.log('</div>');
  }
};
gen();
*/

    return (
      <div>
        <div className="board-row">
        	{this.renderWhiteSquare(0)}
        	{this.renderBlackSquare(1)}
        	{this.renderWhiteSquare(2)}
        	{this.renderBlackSquare(3)}
        	{this.renderWhiteSquare(4)}
        	{this.renderBlackSquare(5)}
        	{this.renderWhiteSquare(6)}
        	{this.renderBlackSquare(7)}
        </div>
        <div className="board-row">
        	{this.renderBlackSquare(8)}
        	{this.renderWhiteSquare(9)}
        	{this.renderBlackSquare(10)}
        	{this.renderWhiteSquare(11)}
        	{this.renderBlackSquare(12)}
        	{this.renderWhiteSquare(13)}
        	{this.renderBlackSquare(14)}
        	{this.renderWhiteSquare(15)}
        </div>
        <div className="board-row">
        	{this.renderWhiteSquare(16)}
        	{this.renderBlackSquare(17)}
        	{this.renderWhiteSquare(18)}
        	{this.renderBlackSquare(19)}
        	{this.renderWhiteSquare(20)}
        	{this.renderBlackSquare(21)}
        	{this.renderWhiteSquare(22)}
        	{this.renderBlackSquare(23)}
        </div>
        <div className="board-row">
        	{this.renderBlackSquare(24)}
        	{this.renderWhiteSquare(25)}
        	{this.renderBlackSquare(26)}
        	{this.renderWhiteSquare(27)}
        	{this.renderBlackSquare(28)}
        	{this.renderWhiteSquare(29)}
        	{this.renderBlackSquare(30)}
        	{this.renderWhiteSquare(31)}
        </div>
        <div className="board-row">
        	{this.renderWhiteSquare(32)}
        	{this.renderBlackSquare(33)}
        	{this.renderWhiteSquare(34)}
        	{this.renderBlackSquare(35)}
        	{this.renderWhiteSquare(36)}
        	{this.renderBlackSquare(37)}
        	{this.renderWhiteSquare(38)}
        	{this.renderBlackSquare(39)}
        </div>
        <div className="board-row">
        	{this.renderBlackSquare(40)}
        	{this.renderWhiteSquare(41)}
        	{this.renderBlackSquare(42)}
        	{this.renderWhiteSquare(43)}
        	{this.renderBlackSquare(44)}
        	{this.renderWhiteSquare(45)}
        	{this.renderBlackSquare(46)}
        	{this.renderWhiteSquare(47)}
        </div>
        <div className="board-row">
        	{this.renderWhiteSquare(48)}
        	{this.renderBlackSquare(49)}
        	{this.renderWhiteSquare(50)}
        	{this.renderBlackSquare(51)}
        	{this.renderWhiteSquare(52)}
        	{this.renderBlackSquare(53)}
        	{this.renderWhiteSquare(54)}
        	{this.renderBlackSquare(55)}
        </div>
        <div className="board-row">
        	{this.renderBlackSquare(56)}
        	{this.renderWhiteSquare(57)}
        	{this.renderBlackSquare(58)}
        	{this.renderWhiteSquare(59)}
        	{this.renderBlackSquare(60)}
        	{this.renderWhiteSquare(61)}
        	{this.renderBlackSquare(62)}
        	{this.renderWhiteSquare(63)}
        </div>
        <div className="whiteking">
        </div>
        <div className="whitequeen">
        </div>
        <div className="whitebishop">
        </div>
        <div className="whiteknight">
        </div>
        <div className="whiterook">
        </div>
        <div className="whitepawn">
        </div>
        <div className="blackking">
        </div>
        <div className="blackqueen">
        </div>
        <div className="blackbishop">
        </div>
        <div className="blackknight">
        </div>
        <div className="blackrook">
        </div>
        <div className="blackpawn">
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
