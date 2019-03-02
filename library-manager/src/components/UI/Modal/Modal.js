import React from 'react'

export default (props) => {
    const modalStyle = {
        opacity: props.show ? "1" : "0",
        transform: props.show ? "translateY(0)" : "translateY(-100vh)"
    };
    return (
        <div className="custom-modal" onClick={props.clicked} style={modalStyle}>
            <div className="modal-content">
                <h3>{props.title}</h3>
                <p>{props.children}</p>
            </div>
            <div className="modal-footer">
                <a href="/" onClick={e => e.preventDefault()} className="modal-close waves-effect waves-green btn-flat">CANCEL</a>
            </div>
        </div>
    )
}
