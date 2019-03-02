import React from "react"
import bookImg from "../../assets/images/book.png"
import IconLink from "../UI/IconLink/IconLink"
import Toolbar from "../Navigation/Toolbar/Toolbar"

export default (props) => {
  return (

    <div className="Book col s4 m4">
      <div className="card">
        <Toolbar editBook={props.editBook} removeBook={props.removeBook} />
        <div className="card-image">
          <img className="bookImage" src={bookImg} alt="Book" />
          <span className="card-title">{props.title}</span>
        </div>
        <div className="card-content">
          <h5>Author: {props.author}</h5>
          <p>{props.info}</p>
          <hr />
          <h6>Wirrten in: {props.year}</h6>
          <h6>Number of pages: {props.pages}</h6>
          <IconLink pulse clicked={props.moreClicked}>explore</IconLink>
        </div>
      </div>
    </div>
  )
}

