import Layout from "../components/Layout";

export default function Forum() {
  return (
    <Layout>
      <div className="box-container">
        <div className="box">1</div>
        <div className="box">2</div>
        <div className="box">3</div>
        <div className="box">4</div>
        <div className="box">5</div>
      </div>
      <style jsx>{`
        .box-container {
          display: flex;
          justify-content: space-evenly;
          margin-top: 2rem;
        }
        .box {
          background: orange;
          padding: 3rem;
          color: white;
          font-size: 1rem;
        }
      `}</style>
    </Layout>
  );
}
