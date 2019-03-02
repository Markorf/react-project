export default function gameReducer(state, action) {
  switch (action.type) {
    case "computer":
    case "user":
      return {
        ...state,
        disableButtons: true,
        status: action.payload.status,
        numbersArr: action.payload.nums,
        selectedOption: action.type
      };
    case "RESET":
      return {
        ...state,
        selectedOption: "",
        disableButtons: false,
        status: "",
        numbersArr: Array.from({ length: 9 })
          .fill(null)
          .map((_, index) => index + 1)
      };
    default:
      return state;
  }
}
