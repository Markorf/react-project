import React from "react";
import "./Footer.css";

export default function index({ author }) {
  return (
    <footer>
      <p>
        Autor aplikacije: <strong>{author}</strong>
      </p>
    </footer>
  );
}
