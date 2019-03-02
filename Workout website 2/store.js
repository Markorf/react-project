import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";
import axiosInstance from "./axiosInstance";
const appInitialState = {
  workouts: [],
  error: "",
  loading: null,
  exercises: ["pullups", "chinups", "pushups", "squats", "dips"],
  workout: {},
  message: ""
};

export const actionTypes = {
  GET_WORKOUTS_REQUEST: "GET_WORKOUTS_REQUEST",
  GET_WORKOUTS_SUCCESS: "GET_WORKOUTS_SUCCESS",
  GET_WORKOUTS_FAILURE: "GET_WORKOUTS_FAILURE",
  GET_WORKOUT_REQUEST: "GET_WORKOUT_REQUEST",
  GET_WORKOUT_SUCCESS: "GET_WORKOUT_SUCCESS",
  GET_WORKOUT_FAILURE: "GET_WORKOUT_FAILURE",
  ADD_WORKOUT_REQUEST: "ADD_WORKOUT_REQUEST",
  ADD_WORKOUT_SUCCESS: "ADD_WORKOUT_SUCCESS",
  ADD_WORKOUT_FAILURE: "ADD_WORKOUT_FAILURE",
  REMOVE_WORKOUT_REQUEST: "REMOVE_WORKOUT_REQUEST",
  REMOVE_WORKOUT_SUCCESS: "REMOVE_WORKOUT_SUCCESS",
  REMOVE_WORKOUT_FAILURE: "REMOVE_WORKOUT_FAILURE",
  UPDATE_WORKOUT_REQUEST: "UPDATE_WORKOUT_REQUEST",
  UPDATE_WORKOUT_SUCCESS: "UPDATE_WORKOUT_SUCCESS",
  UPDATE_WORKOUT_FAILURE: "UPDATE_WORKOUT_FAILURE",
  EDIT_WORKOUT: "EDIT_WORKOUT",
  RESET_MESSAGE: "RESET_MESSAGE"
};

// REDUCERS
export const reducer = (state = appInitialState, action) => {
  switch (action.type) {
    case actionTypes.GET_WORKOUTS_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_WORKOUTS_SUCCESS:
      return {
        ...state,
        workouts: action.payload,
        loading: false
      };
    case actionTypes.GET_WORKOUTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.GET_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.GET_WORKOUT_SUCCESS:
      return {
        ...state,
        workout: action.payload,
        loading: false
      };
    case actionTypes.GET_WORKOUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case actionTypes.ADD_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.ADD_WORKOUT_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case actionTypes.ADD_WORKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case actionTypes.REMOVE_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.REMOVE_WORKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: "Workout removed"
      };
    case actionTypes.REMOVE_WORKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "Failed to remove workout"
      };
    case actionTypes.UPDATE_WORKOUT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case actionTypes.UPDATE_WORKOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        workout: action.payload,
        message: "Workout updated"
      };
    case actionTypes.UPDATE_WORKOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        message: "Failed to update workout"
      };
    case actionTypes.EDIT_WORKOUT:
      return {
        ...state,
        workout: action.payload
      };
    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        message: ""
      };
    default:
      return state;
  }
};

// ACTIONS

export const getWorkoutsRequest = () => async dispatch => {
  dispatch({
    type: actionTypes.GET_WORKOUTS_REQUEST
  });
  try {
    const workouts = await axiosInstance.get("/workouts.json");
    dispatch(getWorkoutsSuccess(workouts.data));
  } catch (err) {
    dispatch(getWorkoutsFailure(err));
  }
};

export const getWorkoutsSuccess = payload => dispatch => {
  dispatch({
    type: actionTypes.GET_WORKOUTS_SUCCESS,
    payload
  });
};

export const getWorkoutsFailure = payload => dispatch => {
  dispatch({
    type: actionTypes.GET_WORKOUTS_FAILURE,
    payload
  });
};

export const getWorkoutRequest = payload => async dispatch => {
  dispatch({
    type: actionTypes.GET_WORKOUT_REQUEST
  });
  try {
    const workout = await axiosInstance.get(`/workouts/${payload}.json`);
    dispatch(getWorkoutSuccess(workout.data));
  } catch (err) {
    dispatch(getWorkoutFailure(err));
  }
};

export const getWorkoutSuccess = payload => dispatch => {
  dispatch({
    type: actionTypes.GET_WORKOUT_SUCCESS,
    payload
  });
};

export const getWorkoutFailure = payload => dispatch => {
  dispatch({
    type: actionTypes.GET_WORKOUT_FAILURE,
    payload
  });
};

export const addWorkoutRequest = payload => async dispatch => {
  dispatch({
    type: actionTypes.ADD_WORKOUT_REQUEST
  });
  try {
    await axiosInstance.post("/workouts.json", payload);
    dispatch(addWorkoutSuccess());
  } catch (err) {
    console.log(err);
    dispatch(addWorkoutFailure(err));
  }
};

export const addWorkoutSuccess = () => dispatch => {
  dispatch({
    type: actionTypes.ADD_WORKOUT_SUCCESS
  });
};

export const addWorkoutFailure = payload => dispatch => {
  dispatch({
    type: actionTypes.ADD_WORKOUT_FAILURE,
    payload
  });
};

export const removeWorkoutRequest = payload => async dispatch => {
  dispatch({
    type: actionTypes.REMOVE_WORKOUT_REQUEST
  });
  try {
    await axiosInstance.delete(`workouts/${payload}.json`);
    dispatch(removeWorkoutSuccess());
  } catch (err) {
    console.log(err);
    dispatch(removeWorkoutFailure(err));
  }
};

export const removeWorkoutSuccess = () => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_WORKOUT_SUCCESS
  });
};

export const removeWorkoutFailure = payload => dispatch => {
  dispatch({
    type: actionTypes.REMOVE_WORKOUT_FAILURE,
    payload
  });
};

export const updateWorkoutRequest = payload => async dispatch => {
  dispatch({
    type: actionTypes.UPDATE_WORKOUT_REQUEST
  });
  try {
    // moze a i ne mora workout da se stavi u payload za success
    const workout = await axiosInstance.put(
      `/workouts/${payload.key}.json`,
      payload.data
    );
    dispatch(updateWorkoutSuccess(workout.data));
  } catch (err) {
    console.log(err);
    dispatch(updateWorkoutFailure(err));
  }
};

export const updateWorkoutSuccess = payload => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_WORKOUT_SUCCESS,
    payload
  });
};

export const updateWorkoutFailure = payload => dispatch => {
  dispatch({
    type: actionTypes.UPDATE_WORKOUT_FAILURE,
    payload
  });
};

export const editWorkout = payload => dispatch => {
  dispatch({
    type: actionTypes.EDIT_WORKOUT,
    payload
  });
};

export const resetMessage = () => {
  return {
    type: actionTypes.RESET_MESSAGE
  };
};

export function initializeStore(initialState = appInitialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );
}
