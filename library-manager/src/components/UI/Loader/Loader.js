import React from 'react'
import loaderImage from "../../../assets/images/loader.gif"
export default () => {
    return (
        <div className="loader">
            <img src={loaderImage} alt="loader" />
        </div>
    )
}
