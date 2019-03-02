import React from "react";
import { connect } from "react-redux";
import Layout from "../components/layout";

class Index extends React.Component {
  static getInitialProps() {
    return {};
  }

  render() {
    return (
      <Layout>
        <section className="title">
          <h1>Welcome to workout page</h1>
          <p>Watch out motivational video!</p>
        </section>
        <div className="vid-container">
          <video height={550} src="../static/WM.mp4" controls />
        </div>
        <style jsx>{`
          .title {
            margin-top: 1rem;
            text-align: center;
          }
          video {
            width: 100vw;
          }
        `}</style>
      </Layout>
    );
  }
}

export default connect()(Index);
