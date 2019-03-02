import React from "react";
import Header from "../header";
import Footer from "../footer";
import useStyles from "./style";

export default function Layout({ children }) {
  const classes = useStyles();
  return (
    <div className="app">
      <Header />
      <main className={classes.root}>{children}</main>
      <Footer />
    </div>
  );
}
