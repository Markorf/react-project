import React from "react";
import "./PointCounter.css";

export default function PointCounter({ points }) {
  return (
    <div className="pointCounter">
      <p>
        Broj poena: <strong>{points}</strong>
      </p>
    </div>
  );
}
