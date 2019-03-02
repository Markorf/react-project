import React from 'react'
import Logo from "../../Logo/Logo";
import NavItem from "./NavItem"
import Icon from "../../UI/Icon/Icon"

export default () => {
    return (
        <nav>
            <div className="nav-wrapper">
                <a href="/" className="brand-logo"><Logo /></a>
                <a href="/" data-target="mobile-demo" className="sidenav-trigger"><Icon>menu</Icon></a>
                <ul className="right hide-on-med-and-down">
                    <li><NavItem exact to="/">Home</NavItem></li>
                    <li><NavItem to="/about">About</NavItem></li>
                    <li><NavItem to="/new_book">Add new book</NavItem></li>
                </ul>
            </div>
        </nav>
    )
}
