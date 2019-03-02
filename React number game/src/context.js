import { createContext } from "react";

export default createContext({
  selectedOption: "",
  randomNumber: null,
  state: {},
  dispatch: () => {},
  numbersArr: []
});
