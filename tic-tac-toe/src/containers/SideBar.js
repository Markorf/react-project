import React, { Component } from "react";
import Status from "../components/Status";
import Moves from "../components/Moves";

export default class SideBar extends Component {
  render() {
    const { history, nextPlayer, winner, handleClick } = this.props;
    return (
      <div className="game-info">
        <Status winner={winner} nextPlayer={nextPlayer} />
        <Moves history={history} onClick={handleClick} />
      </div>
    );
  }
}
