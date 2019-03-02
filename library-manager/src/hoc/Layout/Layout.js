import React from 'react'
import Navbar from "../../components/Navigation/Navbar/Navbar"
import Wrap from "../../hoc/Wrap";

export default props => {
  return (
    <Wrap>
      <Navbar />
      <div className="container">
        {props.children}
      </div>
      <footer className="page-footer">
        <div className="footer-copyright">
          <div className="container">
            © 2018 Copyright Library manager
            </div>
        </div>
      </footer>
    </Wrap>
  )
}
