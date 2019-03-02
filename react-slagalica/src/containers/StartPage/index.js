import React, { Component } from "react";
import {
  GAME_LEVELS,
  INITIAL_LEVEL_MESSAGE,
  USERNAME_MIN_LEN
} from "../../constants";
import "./StartPage.css";
import GameContext from "../../game-context";

export default class StartPage extends Component {
  static contextType = GameContext;
  state = {
    selectedOption: {
      dataSpeed: "",
      value: INITIAL_LEVEL_MESSAGE
    },
    isFormValid: false,
    username: ""
  };
  changeLevel = e => {
    if (e.target.value === INITIAL_LEVEL_MESSAGE) return false;
    const { username } = this.state;
    const dataSpeed = e.target.options[e.target.selectedIndex].dataset.speed;
    const isFormValid = dataSpeed && username.length >= USERNAME_MIN_LEN;

    this.setState({
      selectedOption: {
        value: e.target.value,
        dataSpeed
      },
      isFormValid
    });
  };
  changeUsername = e => {
    const {
      selectedOption: { dataSpeed }
    } = this.state;
    const isFormValid = dataSpeed && e.target.value.length >= USERNAME_MIN_LEN;
    this.setState({ username: e.target.value, isFormValid });
  };
  renderLevels = () =>
    GAME_LEVELS.map(level => (
      <option value={level.mode} key={level.mode} data-speed={level.speed}>
        {level.mode}
      </option>
    ));

  register = e => {
    e.preventDefault();
    const { authUser } = this.context;
    const { history } = this.props;
    const {
      username,
      selectedOption: { value: level }
    } = this.state;
    authUser(username, level);
    history.push("/game");
  };
  render() {
    const { selectedOption, username, isFormValid } = this.state;
    const helperText = selectedOption.dataSpeed ? (
      <strong>
        Broj sekundi za odgovor po koloni: {selectedOption.dataSpeed}
      </strong>
    ) : null;
    return (
      <div className="startPage">
        <h2>Registruj se</h2>
        <form onSubmit={this.register}>
          <label htmlFor="ime">Unesi ime</label>
          <input
            minLength={USERNAME_MIN_LEN}
            onChange={this.changeUsername}
            value={username}
            id="ime"
            type="text"
            placeholder="tvoje ime"
          />
          <label htmlFor="level">Odaberi tezinu</label>
          <select
            id="level"
            onChange={this.changeLevel}
            value={selectedOption.value}
          >
            <option data-speed={null} value={INITIAL_LEVEL_MESSAGE}>
              {INITIAL_LEVEL_MESSAGE}
            </option>
            {this.renderLevels()}
          </select>
          {helperText}
          <button
            type="submit"
            disabled={isFormValid ? null : true}
            className="success"
          >
            Nastavi
          </button>
        </form>
      </div>
    );
  }
}
