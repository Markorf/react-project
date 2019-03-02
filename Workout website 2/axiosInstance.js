import axios from "axios";

export default axios.create({
  baseURL: "https://workout-e32ad.firebaseio.com/"
});
