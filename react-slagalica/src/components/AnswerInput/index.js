import React from "react";
import "./AnswerInput.css";
export default function AnswerInput({ value, onChangeHandler, isGameOver }) {
  return (
    <input
      className="answerField"
      required
      type="text"
      value={value}
      onChange={onChangeHandler}
      disabled={isGameOver ? true : null}
      placeholder="Answer"
    />
  );
}
