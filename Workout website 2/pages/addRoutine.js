import { connect } from "react-redux";
import _ from "lodash";
import Layout from "../components/layout";
import Loader from "../components/loader";
import { addWorkoutRequest } from "../store";
import { getExerciseName } from "../helpers";

class AddRoutine extends React.Component {
  state = {
    selectedOption: 0,
    repeats: "",
    newExercises: [],
    routineName: "",
    message: "",
    exerciseIndex: 0
  };

  renderOptions = () => {
    const { exercises } = this.props;
    return exercises.map((exercise, index) => (
      <option key={exercise} value={index + 1}>
        {exercise}
      </option>
    ));
  };

  renderAddedWorkouts = () => {
    const { newExercises } = this.state;
    return newExercises.length > 0 ? (
      <React.Fragment>
        <h1>Routines you added:</h1>
        <ul>
          {newExercises.map(routine => {
            return Object.keys(routine).map((exercise, index) => (
              <li key={exercise + index}>
                {getExerciseName(exercise)} :{" "}
                <strong>{routine[exercise]}</strong>
              </li>
            ));
          })}
        </ul>
      </React.Fragment>
    ) : (
      <h1>No routine added yet</h1>
    );
  };

  routineNameHandler = e => this.setState({ routineName: e.target.value });

  inputHandler = e => {
    this.setState({
      repeats: e.target.value
    });
  };

  changeSelectHandler = e => {
    this.setState({
      selectedOption: e.target.value
    });
  };

  submitHandler = e => {
    e.preventDefault();
    const { repeats, selectedOption, newExercises, exerciseIndex } = this.state;
    const { exercises } = this.props;
    if (selectedOption == 0) return;
    const newExercise = {
      [`${exercises[selectedOption - 1]}-${exerciseIndex}`]: Number(repeats)
    };

    this.setState({
      newExercises: newExercises.concat(newExercise),
      repeats: "",
      selectedOption: 0,
      exerciseIndex: exerciseIndex + 1
    });
  };

  saveWorkout = () => {
    const { newExercises, routineName } = this.state;
    const routine = {};
    newExercises.forEach(exercise =>
      Object.keys(exercise).map(key => (routine[key] = exercise[key]))
    );
    routine.title = routineName;
    this.props.addWorkoutsRequest(routine);
    this.setState({
      newExercises: [],
      routineName: "",
      message: "Routine saved!"
    });
    setTimeout(() => {
      this.setState({ message: "" });
    }, 1500);
  };

  render() {
    const {
      selectedOption,
      repeats,
      newExercises,
      routineName,
      message
    } = this.state;
    const { loading } = this.props;
    if (loading) return <Loader />;
    return (
      <Layout>
        <div>
          <h1>Add your new routine here</h1>
          <form action="#" onSubmit={this.submitHandler}>
            <select
              required
              value={selectedOption}
              onChange={this.changeSelectHandler}
            >
              <option value="0">Select excercise</option>
              {this.renderOptions()}
            </select>
            <input
              required
              type="number"
              placeholder="Enter number of repeats"
              value={repeats}
              onChange={this.inputHandler}
            />
            <button type="submit">Add excercise</button>
          </form>
          <div className="added">{this.renderAddedWorkouts()}</div>
          <input
            required
            value={routineName}
            onChange={this.routineNameHandler}
            type="text"
            placeholder="Routine name"
          />
          <button
            disabled={
              _.isEmpty(newExercises) || _.isEmpty(routineName) ? true : false
            }
            className="save"
            onClick={this.saveWorkout}
          >
            SAVE ROUTINE
          </button>
          <h3>{message}</h3>
          <style jsx>
            {`
              input,
              select,
              button {
                display: block;
                padding: 0.5rem;
                width: 200px;
                margin-top: 0.3rem;
              }
              .added {
                margin-top: 1rem;
                border-top: 1px solid silver;
                padding-top: 0.7rem;
                margin-left: 1.5rem;
              }
              .save {
                background: green;
                color: white;
                padding: 0.5rem 1rem;
                border: none;
              }
              .save:disabled {
                background: grey;
              }
            `}
          </style>
        </div>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { exercises, loading } = state;
  return {
    exercises,
    loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addWorkoutsRequest: workout => dispatch(addWorkoutRequest(workout))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddRoutine);
