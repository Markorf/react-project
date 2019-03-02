import React, { useState, useReducer } from "react";
import Layout from "./components/layout";
import Options from "./components/options";
import { GAME_NAME, availableOptions } from "./constants";
import GameStatus from "./components/gameStatus";
import NumInput from "./components/numInput";
import Fields from "./components/fields";
import Context from "./context";
import gameReducer from "./store/store";
// import Quick from "./components/Quick";

function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [state, dispatch] = useReducer(gameReducer, {
    disableButtons: false,
    selectedOption: "",
    status: "",
    numbersArr: Array.from({ length: 9 })
      .fill(null)
      .map((_, index) => index + 1)
  });
  return (
    <Layout>
      <Context.Provider
        value={{
          randomNumber,
          setRandomNumber,
          state,
          dispatch
        }}
      >
        <h1 className="title">{GAME_NAME}</h1>
        <Options
          availableOptions={availableOptions}
          setRandomNumber={setRandomNumber}
        />
        <GameStatus availableOptions={availableOptions} />
        <NumInput
          availableOptions={availableOptions}
          setRandomNumber={setRandomNumber}
        />
        <Fields />
        {/* <Quick /> */}
      </Context.Provider>
    </Layout>
  );
}

export default App;
