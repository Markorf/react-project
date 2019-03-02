import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import useStyles from "./style";
import Context from "../../context";
export default function NumInput({ availableOptions, setRandomNumber }) {
  const classes = useStyles();
  const {
    state: { selectedOption },
    randomNumber
  } = useContext(Context);
  const [input, setInput] = useState("");

  const submitHandler = e => {
    e.preventDefault();
    setInput("");
    setRandomNumber(Number(input));
  };

  if (selectedOption !== availableOptions.user) return null;
  return (
    <form onSubmit={submitHandler}>
      <input
        required
        className={classes.root}
        type="number"
        placeholder="Enter number (1-9)"
        min={1}
        max={9}
        value={input}
        disabled={!!randomNumber}
        onChange={e => setInput(e.target.value)}
      />
      <Button
        classes={{
          root: classes.mt
        }}
        type="submit"
        variant="contained"
        color="default"
      >
        Submit value
      </Button>
    </form>
  );
}
