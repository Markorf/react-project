import React, { Component } from 'react'
import Icon from "../../../components/UI/Icon/Icon"
import Axios from "axios"
import Modal from "../../../components/UI/Modal/Modal"
import withErrorHandler from "../../../hoc/withErrorHandler"

class NewBook extends Component {
    state = {
        formData: {
            name: {
                configOptions: {
                    type: "text",
                    placeholder: "Enter book title",
                    required: "required",
                    minLength: 3
                },
            },
            author: {
                configOptions: {
                    type: "text",
                    placeholder: "Enter author name",
                    required: "required",
                    minLength: 6
                },
            },
            year: {
                configOptions: {
                    type: "number",
                    placeholder: "Enter year",
                    required: "required",
                },
            },
            info: {
                configOptions: {
                    type: "text",
                    placeholder: "Enter some book description",
                    required: "required",
                    minLength: 10,
                    maxLength: 60
                },
            },
            pages: {
                configOptions: {
                    type: "number",
                    placeholder: "Enter number of pages",
                    required: "required",
                },
            },
        },
        // mogao sam da stavim value: "" u svakom od objekata iznad configOptions-a takodje (ali ok je i ovako)
        bookToAdd: {
            pages: "",
            name: "",
            year: "",
            info: "",
            author: "",
        },
        showModal: false,
        modalTitle: null,
    }

    submitFormHandler = (e) => {
        e.preventDefault();
        const dbLink = "/availableBooks.json";
        // inace treba post ali posto sam krenuo sa put onda moram tako i da nastavim
        Axios.get(dbLink)
            .then(response => {
                const oldBooks = response.data;
                const bookToSend = this.state.bookToAdd;
                const bookId = Math.floor(Math.random() * 10000);
                bookToSend.id = bookId;
                const updatedBooks = [...oldBooks, bookToSend];
                Axios.put(dbLink, updatedBooks)
                    .then(res => {
                        this.setState({
                            showModal: true,
                            modalTitle: bookToSend.name + " added successfully"
                        })
                    })
                    .catch(err => console.log(err))

            }).catch(err => console.log(err))
    }

    changeInputHandler = (e, bookKey) => {
        const bookCopy = { ...this.state.bookToAdd };
        bookCopy[bookKey] = e.target.value;
        this.setState({
            bookToAdd: bookCopy
        });
    }

    goToHome = () => {
        this.props.history.replace("/");
    }

    render() {
        const inputs = Object.keys(this.state.formData)
            .map(key => {
                return <input
                    value={this.state.bookToAdd[key]}
                    onChange={e => this.changeInputHandler(e, key)}
                    key={key}
                    {...this.state.formData[key].configOptions}
                />
            });
        return (
            <div className="NewBook">
                <Modal show={this.state.showModal} clicked={this.goToHome} title={this.state.modalTitle}>
                    Click here to go back to home page
                </Modal>
                <h3>Add new book to our library</h3>
                <form onSubmit={this.submitFormHandler}>
                    {inputs}
                    <button title="Add new book" className="btn-floating btn-large waves-effect waves-light red pulse" type="submit"><Icon>add</Icon></button>
                </form>
            </div>
        )
    }
}

export default withErrorHandler(NewBook, Axios)