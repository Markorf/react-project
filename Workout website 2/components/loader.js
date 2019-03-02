export default function Loader() {
  return (
    <div className="loader">
      <img src="../static/loader.gif" alt="loader" />
      <style jsx>
        {`
          .loader {
            height: 100vh;
            width: 100vw;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}
      </style>
    </div>
  );
}
