import React, { Component } from 'react'
import Icon from "../../../components/UI/Icon/Icon"
import Axios from "axios"
import Modal from "../../../components/UI/Modal/Modal"
import withErrorHandler from "../../../hoc/withErrorHandler"

class Edit extends Component {
    state = {
        bookToEdit: null,
        showModal: false,
        modalTitle: ""
    }

    componentWillMount() {
        const params = new URLSearchParams(this.props.location.search);
        const bookToEdit = {};
        for (const [key, value] of params.entries()) {
            bookToEdit[key] = value;
        }
        // relaoad ako je korisnik uneo samo /edit
        if (Object.keys(bookToEdit).length === 0) {
            this.props.history.push("/");
        }

        this.setState({ bookToEdit });
    }

    changeInputHandler = (e, inputKey) => {
        if (!this.state.bookToEdit) return;
        const bookCopy = { ...this.state.bookToEdit };
        bookCopy[inputKey] = e.target.value;
        this.setState({
            bookToEdit: bookCopy
        });
    }

    saveChanges = (e) => {
        if (!this.state.bookToEdit) return;
        e.preventDefault();
        Axios.get("/availableBooks.json")
            .then(response => {
                const fetchedBooks = response.data;
                const bookToUpdate = this.state.bookToEdit;
                // vrati sve knjige osim ove trenutne (koja se edituje) da bi mogao da je dodam izmenjenu posle
                const filteredBooks = fetchedBooks.filter(book => Number(book.id) !== Number(bookToUpdate.id));
                const booksToUpdate = [...filteredBooks, bookToUpdate];
                Axios.put("/availableBooks.json", booksToUpdate)
                    .then(response => {
                        this.setState({
                            showModal: true,
                            modalTitle: bookToUpdate.name + " was successfully edited"
                        })
                    }).catch(err => console.log(err))
            }).catch(err => console.log(err));
    }

    render() {
        let bookInputs = <p>Book is not selected</p>;
        const stateBook = this.state.bookToEdit;
        if (stateBook) {
            bookInputs = Object.keys(stateBook)
                .map(bookKey => {
                    // ne prikazuj id
                    if (bookKey === "id") return null;
                    return (
                        <div className="inputContainer" key={bookKey}>
                            <label>{"Edit " + bookKey}</label>
                            <input required onChange={e => this.changeInputHandler(e, bookKey)} type="text" value={stateBook[bookKey]} />
                        </div>
                    )
                });
        }

        return (
            <div className="EditPage">
                <Modal clicked={() => this.props.history.push("/")} show={this.state.showModal} title={this.state.modalTitle}>
                    Click here to go back to home page
                </Modal>
                <form>
                    <h3>Edit Book</h3>
                    {bookInputs}
                    <button onClick={this.saveChanges} title="Save changes" className="btn-floating btn-large waves-effect waves-light red pulse" type="submit"><Icon>save</Icon></button>
                </form>
            </div>
        )
    }

}

export default withErrorHandler(Edit, Axios);