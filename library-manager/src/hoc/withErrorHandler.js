import React, { Component } from "react";
import Modal from "../components/UI/Modal/Modal"
import Wrap from "./Wrap"

const withErrorHandler = (WrappedComponent, axios) => class extends Component {
    state = {
        error: null,
        modalOpened: false,
    }

    reqInterceptor = null
    resInterceptor = null

    componentWillMount() {
        this.reqInterceptor = axios.interceptors.request.use(req => {
            this.setState({ error: null })
            return req
        }, err => {
            this.setState({ error: err, modalOpened: true })
            return Promise.reject(err);
        });
        this.resInterceptor = axios.interceptors.response.use(res => {
            this.setState({ error: null })
            return res
        }, err => {
            this.setState({ error: err, modalOpened: true })
            return Promise.reject(err);
        })
    }

    componentWillUnmount() {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }

    render() {

        return (
            <Wrap>
                <Modal
                    show={this.state.modalOpened}
                    title="Error occurred"
                    clicked={() => this.setState({ modalOpened: false })}
                >{this.state.error ? this.state.error.message : null}</Modal>
                <WrappedComponent {...this.props} />
            </Wrap>
        )
    }
}

export default withErrorHandler;