import React from "react";
import { START_PAGE_PATH } from "./paths";

export default React.createContext({
  isUserAuth: false,
  currentPage: START_PAGE_PATH,
  authUser: () => {},
  username: "",
  level: ""
});
