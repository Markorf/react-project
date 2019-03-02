import React, { Component } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { AUTHOR } from "../../constants";
import GameContext from "../../game-context";

export default class index extends Component {
  static contextType = GameContext;
  render() {
    const { children } = this.props;
    const { currentPage } = this.context;
    return (
      <div className="App">
        <Header gamePoint={currentPage} />
        {children}
        <Footer author={AUTHOR} />
      </div>
    );
  }
}
