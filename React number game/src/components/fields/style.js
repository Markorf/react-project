import { makeStyles } from "@material-ui/styles";

export default makeStyles({
  root: {
    border: "1px solid silver",
    padding: "1rem",
    display: "grid",
    gridTemplateRows: "repeat(3, 50px)",
    gridTemplateColumns: "repeat(3, 50px)",
    "& div": {
      cursor: "pointer",
      alignSelf: "center",
      justifySelf: "center",
      padding: ".5rem",
      textAlign: "center",
      "&:hover": {
        background: "#eee"
      }
    }
  },
  gameEnd: {
    cursor: "not-allowed",
    background: "lightgreen"
  }
});
