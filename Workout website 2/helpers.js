export const isContained = (searchText, routineName = "") =>
  routineName.toUpperCase().includes(searchText.toUpperCase());
export const getExerciseName = fullName => fullName.split("-")[0] || fullName;
