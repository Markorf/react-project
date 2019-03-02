import * as actionType from "./actions"

const initialState = {
    persons: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case actionType.ADDPERSON:
            console.log("Addperson", action.personInfo);

            return {
                ...state,
                persons: state.persons.concat(action.personInfo)
            }
        case actionType.REMOVEPERSON:
            console.log("called", state.persons, action.personID);

            return {
                ...state,
                persons: state.persons.filter(person => person.id !== action.personID)
            }
        default:
            return state;
    }
}

