import React from "react";

export default function Status({ nextPlayer, winner }) {
  return (
    <div className="status">
      {winner ? (
        <p>
          The winner is: <strong>{winner}</strong>
        </p>
      ) : (
        <p>
          Next player: <strong>{nextPlayer}</strong>
        </p>
      )}
    </div>
  );
}
