import { connect } from "react-redux";
import Router from "next/router";
import Layout from "../components/layout";
import Loader from "../components/loader";
import { getExerciseName } from "../helpers";
import {
  getWorkoutRequest,
  editWorkout,
  updateWorkoutRequest,
  resetMessage
} from "../store";

class Routine extends React.Component {
  componentDidMount() {
    const routineKey = Router.query.id;
    if (!routineKey) return Router.push("/");
    this.props.getWorkoutRequest(routineKey);
  }

  inputHandler = key => e => {
    const { workout, editWorkout } = this.props;
    workout[key] = key === "title" ? e.target.value : Number(e.target.value);
    editWorkout(workout);
    this.forceUpdate();
  };

  submitHandler = e => {
    e.preventDefault();
    const { workout, updateWorkoutRequest, resetMessage } = this.props;
    const routineKey = Router.query.id;
    updateWorkoutRequest({ key: routineKey, data: workout });
    setTimeout(() => {
      resetMessage();
    }, 1500);
  };

  renderWorkout = () => {
    const { workout } = this.props;
    if (!workout) return Router.push("/");
    const exercises = Object.keys(workout).map(key => {
      return key === "title" ? null : (
        <React.Fragment key={key}>
          <label htmlFor={`input-${key}`}>{getExerciseName(key)}</label>
          <input
            required
            onChange={this.inputHandler(key)}
            id={`input-${key}`}
            type="number"
            value={workout[key]}
          />
        </React.Fragment>
      );
    });
    return (
      <div className="workout-container">
        <label htmlFor="workoutInput">Workout title</label>
        <input
          required
          onChange={this.inputHandler("title")}
          defaultValue={workout.title}
          id="workoutInput"
          type="text"
        />
        {exercises}
      </div>
    );
  };
  render() {
    const { message, loading } = this.props;
    if (loading) return <Loader />;
    return (
      <Layout>
        <section className="routine">
          <h1>Edit this routine</h1>
          <div className="routine-info">
            <form onSubmit={this.submitHandler} action="#">
              {this.renderWorkout()}
              <button className="green" type="submit">
                Save changes
              </button>
            </form>
            <h3>{message}</h3>
          </div>
        </section>
        <style global jsx>{`
          .workout-container {
            padding: 0.5rem;
          }
          .workout-container input {
            display: block;
            padding: 0.4rem;
          }
          .green {
            background: green;
            color: white;
            border: 0;
            padding: 0.5rem 1rem;
            margin-left: 0.5rem;
            cursor: pointer;
            margin-top: 0.5rem;
          }
          h3 {
            margin-top: 0.4rem;
          }
        `}</style>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { workout, message, loading } = state;
  return {
    workout,
    message,
    loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getWorkoutRequest: payload => dispatch(getWorkoutRequest(payload)),
    editWorkout: payload => dispatch(editWorkout(payload)),
    updateWorkoutRequest: payload => dispatch(updateWorkoutRequest(payload)),
    resetMessage: () => dispatch(resetMessage())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routine);
