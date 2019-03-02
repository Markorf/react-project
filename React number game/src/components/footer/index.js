import React from "react";
import useStyles from "./style";

export default function Footer() {
  const classes = useStyles();
  return (
    <footer className={classes.root}>
      <p>
        Copywright 2019. <strong>Marko Medic</strong>
      </p>
    </footer>
  );
}
