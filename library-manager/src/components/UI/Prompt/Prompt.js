import React from 'react'
import Icon from "../Icon/Icon"
export default ({ title, show, submited, closed }) => {
    const PromptStyle = {
        opacity: show ? "1" : "0",
        transform: show ? "translateY(0)" : "translateY(100vh)"
    };
    const ContainerStyle = {
        transform: show ? "translateY(0)" : "translateY(100vh)"
    }
    return (
        <div className="Prompt" style={PromptStyle}>
            <section className="Prompt-container" style={ContainerStyle}>
                <h1>{title}</h1>
                <h5>If you press submit, changes can't be undone!</h5>
                <div className="buttonWrap">
                    <button onClick={submited} className="btn waves-effect waves-light">Submit
                         <Icon>send</Icon>
                    </button>
                    <button onClick={closed} className="btn waves-effect waves-light">Close
                          <Icon>close</Icon>
                    </button>
                </div>
            </section>
        </div>
    )
}
