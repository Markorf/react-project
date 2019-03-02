import React, { PureComponent } from "react";
import "./Timer.css";

export default class Timer extends PureComponent {
  interval = null;
  stopTimer = () => clearInterval(this.interval);

  componentDidUpdate({ isGameOver }) {
    if (isGameOver) {
      this.stopTimer();
    }
  }

  componentWillUnmount() {
    this.stopTimer();
  }
  componentDidMount() {
    const { decrementTime } = this.props;
    this.interval = setInterval(() => {
      decrementTime();
    }, 1000);
  }
  render() {
    const { time } = this.props;
    return (
      <div className="timer">
        <p>
          Preostalo vreme: <strong>{time}</strong>
        </p>
      </div>
    );
  }
}
