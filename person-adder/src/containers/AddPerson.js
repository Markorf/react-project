import React, { Component } from 'react'
export default class AddPerson extends Component {
    state = {
        name: "",
        age: "",
        id: Math.random()
    }
    changeNameHandler = e => {
        this.setState({ name: e.target.value, id: Math.random() })
    }
    changeAgeHandler = e => {
        this.setState({ age: e.target.value, id: Math.random() })
    }

    render() {
        return (
            <div className="addPerson">
                <input value={this.state.name} onChange={this.changeNameHandler} type="text" placeholder="Enter person name" /> <br />
                <input value={this.state.age} onChange={this.changeAgeHandler} type="number" placeholder="Enter person age" /> <br />
                <button onClick={() => this.props.clicked({ ...this.state })}>Add new person</button>
            </div>
        )
    }
}
