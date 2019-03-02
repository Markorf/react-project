import Link from "next/link";
import Head from "next/head";

const Layout = ({ children }) => (
  <div className="App">
    <Head>
      <title>Workout website</title>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
    </Head>
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>About</a>
            </Link>
          </li>
          <li>
            <Link href="/routines">
              <a>Routines</a>
            </Link>
          </li>
          <li>
            <Link href="/addRoutine">
              <a>Add routine</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>{children}</main>
    <footer>
      <p>
        Site created by &copy; <strong>Marko Medic</strong>
      </p>
    </footer>

    <style global jsx>{`
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      }

      html,
      body {
        height: 100%;
        overflow-y: hidden;
      }

      header {
        background: black;
        color: white;
        display: flex;
      }

      nav ul {
        display: flex;
        list-style: none;
      }

      nav ul li {
        margin-right: 1rem;
        transition: all 0.5s;
      }

      nav ul li:hover {
        background: #eee;
      }
      nav ul li:hover a {
        color: black;
      }

      nav ul li a {
        display: block;
        color: white;
        text-decoration: none;
        padding: 1rem;
      }

      footer {
        background: black;
        color: white;
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 1rem;
        text-align: center;
      }
    `}</style>
  </div>
);

export default Layout;
