import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout";
import { START_PAGE_PATH, GAME_PAGE_PATH } from "./paths";
import GamePage from "./containers/GamePage";
import StartPage from "./containers/StartPage";
import GameContext from "./game-context";
import "./App.css";

class App extends Component {
  state = {
    currentPage: START_PAGE_PATH,
    isUserAuth: false,
    username: "",
    level: ""
  };
  authUser = (username, level) =>
    this.setState({
      isUserAuth: true,
      currentPage: GAME_PAGE_PATH,
      username,
      level
    });
  render() {
    const { isUserAuth, currentPage, username, level } = this.state;
    return (
      <Router>
        <GameContext.Provider
          value={{
            currentPage,
            isUserAuth,
            username,
            level,
            authUser: this.authUser
          }}
        >
          <Layout>
            <Switch>
              <Route exact path={START_PAGE_PATH} component={StartPage} />
              <Route exact path={GAME_PAGE_PATH} component={GamePage} />
            </Switch>
          </Layout>
        </GameContext.Provider>
      </Router>
    );
  }
}

export default App;
