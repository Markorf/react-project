import React from 'react'
import Icon from "../Icon/Icon"

export default (props) => {
    const pulse = props.pulse ? " pulse" : "";
    return (
        <div className="center-align" style={{ marginTop: "1.5rem" }}>
            <a title={props.title || "Show more info"} onClick={props.clicked} className={"btn-floating btn-large waves-effect waves-light red" + pulse} href={props.href}>
                <Icon size={props.size}>{props.children}</Icon>
            </a>
        </div>
    )
}
