import React, { useContext } from "react";
import useStyles from "./style";
import Context from "../../context";

export default function GameStatus() {
  const classes = useStyles();
  const {
    randomNumber,
    state: { status }
  } = useContext(Context);
  return (
    <div className={classes.root}>
      <p>{status}</p>
      {randomNumber && <strong>Random number is: {randomNumber}</strong>}
    </div>
  );
}
