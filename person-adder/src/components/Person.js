import React from 'react'

export default props => {
    return (
        <div className="Person" onClick={() => props.clicked(props.id)}>
            <h4>Name: {props.name}</h4>
            <p>Age: {props.age}</p>
            <h6>Id {props.id}</h6>
        </div>
    )
}
