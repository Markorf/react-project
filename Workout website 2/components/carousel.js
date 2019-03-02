export default ({ goLeft, goRight, image }) => (
  <div className="carousel">
    <i onClick={goLeft} className="fa fa-angle-left" />
    <img src={`../static/${image}`} />
    <i onClick={goRight} className="fa fa-angle-right" />

    <style jsx>{`
      .carousel {
        margin: 3rem auto;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      img {
        height: 400px;
        width: 500px;
      }
      .fa {
        color: red;
        font-size: 48px;
        padding: 1rem;
        cursor: pointer;
      }
    `}</style>
  </div>
);
