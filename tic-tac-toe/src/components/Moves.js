import React from "react";

export default function Moves({ history, onClick }) {
  const renderedMoves = history.map((_, index) =>
    index > 0 ? (
      <li key={index}>
        <button onClick={() => onClick(index)}>Go to move #{index}</button>
      </li>
    ) : null
  );
  return (
    <div className="moves">
      <button onClick={() => onClick(0)}>Go to start</button>
      <ul>{renderedMoves}</ul>
    </div>
  );
}
