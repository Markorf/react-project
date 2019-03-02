import React, { Component } from "react";
import Board from "./containers/Board";
import SideBar from "./containers/SideBar";
import { COLS_NUM } from "./constants";
import { calculateWinner } from "./helpers";
import "./App.css";

class App extends Component {
  state = {
    history: [
      {
        squares: Array(COLS_NUM).fill(null),
        stepNumber: 0
      }
    ],
    isXNext: true,
    winner: null
  };

  handleClick = index => {
    const { history, isXNext, winner } = this.state;
    const historyCopy = Array.from(history)[history.length - 1];
    const newSquares = { ...historyCopy.squares };
    if (newSquares[index] || winner) return;
    newSquares[index] = isXNext ? "X" : "O";
    const potentionalWinner = calculateWinner(newSquares);
    this.setState(state => ({
      isXNext: !state.isXNext,
      winner: potentionalWinner,
      history: state.history.concat({
        squares: newSquares,
        stepNumber: historyCopy.stepNumber + 1
      })
    }));
  };

  goBack = historyIndex => {
    const { history } = this.state;
    const updatedHistory = history.filter((_, index) => historyIndex >= index);
    this.setState({
      history: updatedHistory,
      isXNext: history[historyIndex].stepNumber % 2 === 0,
      winner: null
    });
  };

  render() {
    const { history, isXNext, winner } = this.state;
    const currentSquares = history[history.length - 1].squares;

    return (
      <div className="game">
        <div className="game-board">
          <Board onClick={this.handleClick} squares={currentSquares} />
        </div>
        <SideBar
          handleClick={this.goBack}
          winner={winner}
          history={history}
          nextPlayer={isXNext ? "X" : "O"}
        />
      </div>
    );
  }
}

export default App;
