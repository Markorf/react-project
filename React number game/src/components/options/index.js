import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import Context from "../../context";
import { randomArr } from "../../helpers";
import useStyles from "./style";
export default function Options({ availableOptions, setRandomNumber }) {
  const classes = useStyles();
  const {
    dispatch,
    state: { disableButtons, numbersArr }
  } = useContext(Context);

  const randomNum = () => Math.floor(Math.random() * 9 + 1); // [1-9]
  const shuffledArr = randomArr(numbersArr);

  return (
    <div className={classes.root}>
      <h3>Select option you want</h3>
      <Button
        onClick={() => {
          setRandomNumber(randomNum());
          dispatch({
            type: availableOptions.computer,
            payload: {
              status: "Number generated from computer",
              nums: shuffledArr
            }
          });
        }}
        variant="outlined"
        color="primary"
        disabled={disableButtons}
      >
        COMPUTER NUMBER
      </Button>
      <Button
        onClick={() => {
          dispatch({
            type: availableOptions.user,
            payload: {
              status: "Choose your number",
              nums: shuffledArr
            }
          });
        }}
        variant="outlined"
        color="secondary"
        disabled={disableButtons}
      >
        YOUR NUMBER
      </Button>
    </div>
  );
}
