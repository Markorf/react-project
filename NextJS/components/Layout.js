import Link from "next/link";
import Head from "next/head";

const Layout = ({ children }) => (
  <React.Fragment>
    <Head>
      <title>React next js app</title>
    </Head>
    <nav>
      <Link href="/">
        <a>Home</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
      <Link href="/forum">
        <a>Forum</a>
      </Link>
    </nav>
    <div className="app">{children}</div>
    <style global jsx>{`
      body {
        background: #eee;
      }
    `}</style>
    <style jsx>{`
      nav {
        background: grey;
        padding: 1rem;
      }
      a {
        margin-right: 0.3rem;
        color: lightgreen;
      }
    `}</style>
  </React.Fragment>
);

export default Layout;
