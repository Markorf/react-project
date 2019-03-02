import React, { Component } from 'react'
import Person from "../components/Person"
import AddPerson from "./AddPerson"
import * as actionType from "../store/actions"
import { connect } from "react-redux"

class Persons extends Component {
    // kao da u props ima state = {lista osoba}
    // kao da u metodama u props ima onPerson i onPersonRemove
    // svaki put kad dodam novu osobu menja se state pa se ovo re renderuje
    render() {
        console.log("Person.js rendered")
        return (
            <div className="Persons">
                {this.props.persons.map(person => <Person key={person.id} id={person.id} clicked={this.props.onPersonRemove} name={person.name} age={person.age} />)}
                <AddPerson clicked={this.props.onPersonAdd} />
            </div>
        )
    }

}

const mapStateToProps = state => ({
    persons: state.persons
})

const mapDispatchToProps = dispatch => ({
    onPersonAdd: info => dispatch({ type: actionType.ADDPERSON, personInfo: info }),
    onPersonRemove: id => dispatch({ type: actionType.REMOVEPERSON, personID: id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Persons)