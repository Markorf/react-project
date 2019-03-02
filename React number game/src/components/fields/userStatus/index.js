import React, { useContext } from "react";
import { Button } from "@material-ui/core";
import Context from "../../../context";
import useStyles from "./style";

export default function UserStatus({
  clickCount,
  isCorrect,
  setClickCount,
  clearOpenedNumbers,
  setIsCorrect
}) {
  const classes = useStyles();
  const { dispatch, setRandomNumber } = useContext(Context);
  return (
    <div className={classes.root}>
      <p>
        Clicked times: <strong>{clickCount}</strong>
      </p>
      {isCorrect && <strong>You won!</strong>}
      <br />
      <Button
        onClick={() => {
          setRandomNumber(null);
          setClickCount(0);
          clearOpenedNumbers();
          setIsCorrect(false);
          dispatch({ type: "RESET" });
        }}
        variant="contained"
        color="primary"
      >
        RESET
      </Button>
    </div>
  );
}
