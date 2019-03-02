import React from 'react'

export default (props) => {
    return (
        <i style={{ "fontSize": props.size }} className="material-icons">{props.children}</i>
    )
}
