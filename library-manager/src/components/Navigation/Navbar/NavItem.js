import React from 'react'
import { NavLink } from "react-router-dom"

export default props => {
    return (
        <div className="NavItem">
            <NavLink exact={props.exact} to={props.to}>{props.children}</NavLink>
        </div>
    )
}
