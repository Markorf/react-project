import React, { Component } from 'react'
import Book from "../../components/Book/Book"
import Loader from "../../components/UI/Loader/Loader"
import Modal from "../../components/UI/Modal/Modal"
import Wrap from "../../hoc/Wrap"
import { withRouter } from "react-router-dom"
import Axios from "axios"
import withErrorHandler from "../../hoc/withErrorHandler"
import Prompt from "../../components/UI/Prompt/Prompt"

// info (put ubacuje normalno tri array-a, dok post ubaci id131523: tri niza)

class Books extends Component {
    state = {
        availableBooks: null,
        loading: false,
        modalOpened: false,
        textToShow: null,
        titleToShow: null,
        promptShow: false,
        promptMessage: null
    }

    modalClickHandler = () => {
        this.setState({
            modalOpened: false,
        })
    }

    editBookHandler = (e, book) => {
        let bookInfo = [];
        for (let key in book) {
            bookInfo.push(encodeURIComponent(key) + "=" + encodeURIComponent(book[key]));
        }
        bookInfo = "?" + bookInfo.join("&");
        this.props.history.replace("/edit" + bookInfo);

    }

    showMoreHandler = (e, textToShow, titleToShow) => {
        this.setState({
            modalOpened: true,
            textToShow,
            titleToShow
        });
    }

    promptSubmitHandler(e, book) {
        const filteredBooks = this.state.availableBooks.filter(availBook => availBook !== book);
        Axios.put("/availableBooks.json", filteredBooks)
            .then(data => {
                this.setState({
                    availableBooks: filteredBooks,
                    titleToShow: "Book removed",
                    textToShow: "You successfully removed " + book.name,
                    promptShow: false,
                    modalOpened: true
                });
            })
            .catch(error => console.log(error))
    }

    showPrompt = (e, book) => {
        this.setState({
            promptShow: true,
            promptMessage: "Delete " + book.name + "?"
        });
        this.promptSubmitHandler = this.promptSubmitHandler.bind(this, e, book);
    }

    render() {
        let books = null;
        if (!this.state.availableBooks || this.state.loading) {
            books = <Loader />
        } else {
            books = this.state.availableBooks.map(book => (
                <Book
                    key={book.name}
                    title={book.name}
                    author={book.author}
                    year={book.year}
                    info={book.info}
                    pages={book.pages}
                    moreClicked={e => this.showMoreHandler(e, book.info, book.name)}
                    editBook={e => this.editBookHandler(e, book)}
                    removeBook={e => this.showPrompt(e, book)}
                />
            )
            );

            if (this.state.availableBooks.length === 0) {
                books = <h3 style={{ textAlign: "center" }}>Currently there are not any books in our library</h3>
            }
        }


        return (
            <Wrap>
                <Modal clicked={this.modalClickHandler} show={this.state.modalOpened} title={this.state.titleToShow}>
                    {this.state.textToShow}
                </Modal>
                <Prompt show={this.state.promptShow} title={this.state.promptMessage} submited={this.promptSubmitHandler} closed={() => this.setState({ promptShow: false })} />
                <div className="Books">
                    <div className="row">
                        {books}
                    </div>
                </div>
            </Wrap>
        )
    }
    componentDidMount() {

        Axios.get("/availableBooks.json")
            .then(response => {
                // ako ne postoji ni jedna knjiga u bazi (instanca baze) onda rerenderuj sa praznim nizom
                if (!response.data) {
                    return this.setState({
                        availableBooks: []
                    })
                }
                this.setState({
                    availableBooks: response.data
                })
            }).catch(error => console.log(error))
    }
}

// pravi gresku ako stavim withErrorHandler(withRouter(Books, axios))
export default withErrorHandler(withRouter(Books), Axios);