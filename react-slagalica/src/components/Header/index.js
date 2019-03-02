import React from "react";
import { APPNAME } from "../../constants";
import { START_PAGE_PATH, GAME_PAGE_PATH } from "../../paths";
import "./Header.css";

export default function Header({ gamePoint }) {
  return (
    <header>
      <h1>{APPNAME}</h1>
      <ul>
        <li className={gamePoint === START_PAGE_PATH ? "active" : null}>
          Registracija
        </li>
        <li className={gamePoint === GAME_PAGE_PATH ? "active" : null}>Igra</li>
      </ul>
    </header>
  );
}
