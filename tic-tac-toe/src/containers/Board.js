import React, { Component } from "react";
import Square from "../components/Square";
import { ROW_AND_COL_NUM } from "../constants";

export default class Board extends Component {
  renderSquare = index => {
    const { onClick, squares } = this.props;
    return (
      <Square
        key={index}
        onClick={() => onClick(index)}
        value={squares[index]}
      />
    );
  };
  renderColumns = () => {
    let counter = 0;
    return Array.from({ length: ROW_AND_COL_NUM }, (_, i) => (
      <div key={i} className="board-row">
        {Array.from({ length: ROW_AND_COL_NUM }, () =>
          this.renderSquare(counter++)
        )}
      </div>
    ));
  };
  render() {
    return <div className="board">{this.renderColumns()}</div>;
  }
}
