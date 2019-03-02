import React, { Component, Fragment } from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import { START_PAGE_PATH } from "../../paths";
import "./GamePage.css";
import data from "../../data.json";
import GameContext from "../../game-context";
import AnswerInput from "../../components/AnswerInput";
import ColumnInput from "../../components/ColumnInput";
import { getRemainingTime } from "../../helpers";
import { GAME_LEVELS, INITIAL_POINTS, REDUCE_POINTS_BY } from "../../constants";
import Timer from "./Timer";
import PointCounter from "./PointCounter";

export default class GamePage extends Component {
  static contextType = GameContext;
  state = {
    questionFields: {},
    userAnswer: "",
    currentField: 0,
    isGameOver: false,
    remainingTime: null,
    points: INITIAL_POINTS
  };

  onFormSubmit = e => {
    e.preventDefault();
    this.incrementCurrentField();
    this.resetTimer();
  };

  incrementCurrentField = () => {
    const { userAnswer, questionFields, currentField, points } = this.state;
    const isAnswerCorrect =
      questionFields.solution.toLowerCase() === userAnswer.toLowerCase();
    const isUserLost = currentField >= questionFields.columns.length - 1;
    const gameOver = isAnswerCorrect || isUserLost;
    const userPoints = isAnswerCorrect ? points : points - REDUCE_POINTS_BY;
    this.setState({
      currentField: currentField + 1,
      userAnswer: gameOver ? userAnswer : "",
      isGameOver: gameOver,
      points: userPoints
    });
  };

  onInputChange = e => {
    this.setState({
      userAnswer: e.target.value
    });
  };
  renderForm(questionFields) {
    const { userAnswer, currentField, isGameOver } = this.state;
    return (
      <Fragment>
        <h4>{questionFields.title}</h4>
        <form onSubmit={this.onFormSubmit}>
          {questionFields.columns.map((hint, index) => (
            <ColumnInput
              value={index <= currentField || isGameOver ? hint : ""}
              key={hint}
            />
          ))}
          {
            <AnswerInput
              value={isGameOver ? questionFields.solution : userAnswer}
              onChangeHandler={this.onInputChange}
              isGameOver={isGameOver}
            />
          }
          <button
            disabled={userAnswer && !isGameOver ? null : true}
            className="success"
            type="submit"
          >
            {isGameOver ? "KRAJ" : "UNESI ODGOVOR"}
          </button>
        </form>
      </Fragment>
    );
  }

  resetTimer = () => {
    const { level } = this.context;
    this.setState({
      remainingTime: getRemainingTime(GAME_LEVELS, level, "medium")
    });
  };

  decrementTime = () => {
    const { remainingTime } = this.state;
    if (remainingTime <= 0) {
      this.incrementCurrentField();
      return this.resetTimer();
    }
    return this.setState(state => ({
      remainingTime: state.remainingTime - 1
    }));
  };

  componentDidMount() {
    const { level } = this.context;
    const randomNumber = Math.floor(Math.random() * data.length);
    this.setState({
      questionFields: data[randomNumber],
      remainingTime: getRemainingTime(GAME_LEVELS, level, "medium")
    });
  }
  render() {
    const { isUserAuth, username, level } = this.context;
    const { questionFields, isGameOver, remainingTime, points } = this.state;
    if (!isUserAuth) {
      return <Redirect to={START_PAGE_PATH} />;
    }

    if (_.isEmpty(questionFields)) return <div>Loading...</div>;

    return (
      <div className="gamePage">
        <h1>Dobrodosao {username}</h1>
        <h2>Nivo: {level}</h2>
        <Timer
          decrementTime={this.decrementTime}
          time={remainingTime}
          isGameOver={isGameOver}
        />
        <PointCounter points={points} />
        {this.renderForm(questionFields)}
      </div>
    );
  }
}
