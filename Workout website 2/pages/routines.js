import { connect } from "react-redux";
import Router from "next/router";
import _ from "lodash";
import Layout from "../components/layout";
import Loader from "../components/loader";
import {
  getWorkoutsRequest,
  removeWorkoutRequest,
  resetMessage
} from "../store";
import { isContained, getExerciseName } from "../helpers";

class Routines extends React.Component {
  state = {
    searchText: ""
  };
  componentDidMount() {
    this.props.getWorkoutsRequest();
  }

  inputHandler = e => this.setState({ searchText: e.target.value });

  removeWorkout = async workoutKey => {
    const {
      removeWorkoutRequest,
      getWorkoutsRequest,
      resetMessage
    } = this.props;
    await removeWorkoutRequest(workoutKey);
    await getWorkoutsRequest();
    await setTimeout(() => {
      resetMessage();
    }, 1500);
  };

  editWorkout = workoutKey => {
    Router.push("/routine?id=" + workoutKey);
  };

  renderWorkouts = () => {
    const { workouts } = this.props;
    const { searchText } = this.state;

    const msg = <h1 className="message">No workouts to show</h1>;
    if (!workouts || _.isEmpty(workouts)) return msg;
    const availWorkouts = Object.keys(workouts)
      .map(key =>
        isContained(searchText, workouts[key].title) ? (
          <div className="workout" key={key}>
            <h3 className="workoutName">{workouts[key].title}</h3>
            {Object.keys(workouts[key]).map(keyName => {
              return keyName === "title" ? null : (
                <p key={keyName}>
                  {getExerciseName(keyName)}{" "}
                  <strong>{workouts[key][keyName]}</strong>
                </p>
              );
            })}
            <div className="actions">
              <button
                onClick={() => this.removeWorkout(key)}
                className="delete"
              >
                DELETE
              </button>
              <button className="edit" onClick={() => this.editWorkout(key)}>
                EDIT
              </button>
            </div>
          </div>
        ) : null
      )
      .filter(Boolean);

    const content = availWorkouts.length > 0 ? availWorkouts : msg;

    return <section className="workout-container">{content}</section>;
  };
  render() {
    const { searchText } = this.state;
    const { message, loading } = this.props;
    if (loading) return <Loader />;
    return (
      <Layout>
        <section className="routines">
          <div className="title">
            <h1>View our routines</h1>
            <input
              value={searchText}
              onChange={this.inputHandler}
              type="text"
              placeholder="Search routine by name"
            />
          </div>
          <div className="wokrouts">{this.renderWorkouts()}</div>
          <h3>{message}</h3>
        </section>
        <style global jsx>{`
          .routines {
            background: url("../static/bg.jpg") no-repeat;
            background-size: cover;
            height: 100vh;
          }
          .title {
            color: white;
            text-align: center;
            padding-top: 1rem;
          }
          .workout-container {
            margin-top: 2rem;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            grid-gap: 10px;
          }

          .workout {
            border-radius: 10px;
            padding: 1rem;
            color: white;
            display: grid;
            font-size: 1.4rem;
            justify-content: center;
            font-weight: bold;
            border: 3px solid gold;
            min-height: 200px;
          }

          .workout .actions {
            align-self: end;
            display: flex;
          }
          .workout .actions .delete,
          .edit {
            padding: 0.5rem 1rem;
            border: 0;
            background: red;
            color: white;
            cursor: pointer;
          }

          .workout .actions .delete:hover,
          .edit:hover {
            text-decoration: underline;
          }
          .edit {
            background: orange;
            margin-left: 0.5rem;
          }
          .workout h3 {
            text-decoration: underline;
          }
          input {
            padding: 0.5rem;
          }
          .message {
            font-size: 3rem;
            color: gold;
            margin: 0 auto;
          }
          h3 {
            color: white;
          }
        `}</style>
      </Layout>
    );
  }
}

function mapStateToProps(state) {
  const { workouts, message, loading } = state;
  return { workouts, message, loading };
}
function mapDispatchToProps(dispatch) {
  return {
    getWorkoutsRequest: () => dispatch(getWorkoutsRequest()),
    removeWorkoutRequest: workoutKey =>
      dispatch(removeWorkoutRequest(workoutKey)),
    resetMessage: () => dispatch(resetMessage())
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Routines);
