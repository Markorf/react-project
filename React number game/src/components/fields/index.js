import React, { useContext, useState, useRef } from "react";
import useStyles from "./style";
import Context from "../../context";
import UserStatus from "./userStatus";

export default function Fields() {
  const classes = useStyles();
  const [isCorrect, setIsCorrect] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const openedNumbers = useRef([]);

  const clearOpenedNumbers = () => openedNumbers.current.fill(null);
  const {
    randomNumber,
    state: { numbersArr }
  } = useContext(Context);
  const checkForWin = (num, index) => {
    if (isCorrect || openedNumbers.current.includes(index)) return;
    openedNumbers.current.push(index);
    setClickCount(clickCount + 1);
    if (Number(num) === Number(randomNumber)) {
      setIsCorrect(true);
    }
  };

  const renderedFields = numbersArr.map((num, index) => (
    <div key={num} onClick={() => checkForWin(num, index)}>
      {openedNumbers.current.includes(index) ? num : "OPEN"}
    </div>
  ));
  // ukoliko nije izabran random broj ne prikazuj polja
  if (!randomNumber) return null;
  const endClass = isCorrect ? classes.gameEnd : null;
  return (
    <React.Fragment>
      <div className={[classes.root, endClass].join(" ")}>{renderedFields}</div>
      <UserStatus
        isCorrect={isCorrect}
        clickCount={clickCount}
        setClickCount={setClickCount}
        setIsCorrect={setIsCorrect}
        clearOpenedNumbers={clearOpenedNumbers}
      />
    </React.Fragment>
  );
}
