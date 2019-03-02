import React from 'react'
import isReact from "is-react"
import Modal from "../../../components/UI/Modal/Modal"

export default class About extends React.Component {
    state = {
        toggler: false,
        random: 0.5
    }

    testHandler = (e) => {
        this.setState({
            toggler: !this.state.toggler
        })
    }

    testHandler2 = (e) => {
        console.log(isReact.functionComponent(Modal));

    }

    shouldComponentUpdate() {
        console.log("shouldUpdate");
        // mogu da ga zaustavim i ovde i u didUpdate
        return this.state.random > 0.1;
    }

    // UNSAFE: willMount, willUpdate i willRecieveProps!!!

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log("didUpdate", prevState, this.state, prevProps);
        // this.props.randProp = Math.floor(Math.random() * 1000);
        // this.props.foo++ // takodje ne moze
        this.setState({
            random: Math.random()
        });

    }

    // poziva se svaki put pre rendera (i kada kliknem i kad ucitam)
    // static getDerivedStateFromProps(props, state) {
    //     console.log(state);
    //     console.log(props);
    //     return null;
    // }


    render() {
        console.log("rendered");
        return (
            <div className="about">
                <h1>About this page</h1>
                <hr />
                <p style={{ fontSize: "1rem" }}>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).</p>
                <button onClick={this.testHandler}>CLICK</button>
                <button onClick={this.testHandler2}>CLICK me</button>
            </div>
        )
    }
    componentDidMount() {
        console.log("mounted");

    }
}
