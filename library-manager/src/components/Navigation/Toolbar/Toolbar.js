import React from 'react'
import IconLink from "../../UI/IconLink/IconLink"
// samo za home page
export default props => {
    return (
        <div className="Toolbar">
            <IconLink clicked={props.editBook} title="Edit book">edit</IconLink>
            <IconLink clicked={props.removeBook} title="Remove book">remove</IconLink>
        </div>
    )
}
